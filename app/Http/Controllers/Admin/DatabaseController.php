<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DatabaseController extends Controller
{
    /**
     * Afficher les statistiques de la base de données
     */
    public function index(): Response
    {
        $stats = $this->getDatabaseStats();

        return Inertia::render('Admin/Database/Index', [
            'stats' => $stats,
        ]);
    }

    /**
     * Obtenir les statistiques de la base de données
     */
    private function getDatabaseStats(): array
    {
        $tables = [
            'users' => 'Utilisateurs',
            'roles' => 'Rôles',
            'user_role' => 'Rôles utilisateurs',
            'bookings' => 'Réservations',
            'sessions' => 'Sessions',
            'payments' => 'Paiements',
            'reviews' => 'Avis',
            'feedback' => 'Feedback',
            'certificates' => 'Certificats',
            'subjects' => 'Matières',
            'levels' => 'Niveaux',
            'cycles' => 'Cycles',
            'cities' => 'Villes',
            'neighborhoods' => 'Quartiers',
            'children' => 'Enfants',
            'availabilities' => 'Disponibilités',
        ];

        $tableStats = [];
        $totalRows = 0;
        $totalSize = 0;

        foreach ($tables as $table => $name) {
            try {
                $rows = DB::table($table)->count();
                $size = $this->getTableSize($table);
                
                $tableStats[] = [
                    'name' => $name,
                    'table' => $table,
                    'rows' => $rows,
                    'size' => $this->formatBytes($size),
                    'last_updated' => $this->getLastUpdated($table),
                ];

                $totalRows += $rows;
                $totalSize += $size;
            } catch (\Exception $e) {
                // Table n'existe pas ou erreur
                $tableStats[] = [
                    'name' => $name,
                    'table' => $table,
                    'rows' => 0,
                    'size' => '0 B',
                    'last_updated' => 'N/A',
                ];
            }
        }

        return [
            'tables' => $tableStats,
            'total_size' => $this->formatBytes($totalSize),
            'total_rows' => $totalRows,
            'backup_status' => $this->getBackupStatus(),
            'last_backup' => $this->getLastBackup(),
            'next_backup' => $this->getNextBackup(),
        ];
    }

    /**
     * Obtenir la taille d'une table
     */
    private function getTableSize(string $table): int
    {
        try {
            $result = DB::select("
                SELECT 
                    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
                FROM information_schema.TABLES 
                WHERE table_schema = DATABASE() 
                AND table_name = ?
            ", [$table]);

            return isset($result[0]) ? (int)($result[0]->size_mb * 1024 * 1024) : 0;
        } catch (\Exception $e) {
            return 0;
        }
    }

    /**
     * Formater les bytes en unités lisibles
     */
    private function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);

        return round($bytes, 2) . ' ' . $units[$pow];
    }

    /**
     * Obtenir la dernière mise à jour d'une table
     */
    private function getLastUpdated(string $table): string
    {
        try {
            $result = DB::select("
                SELECT UPDATE_TIME 
                FROM information_schema.TABLES 
                WHERE table_schema = DATABASE() 
                AND table_name = ?
            ", [$table]);

            return isset($result[0]) && $result[0]->UPDATE_TIME 
                ? $result[0]->UPDATE_TIME 
                : 'N/A';
        } catch (\Exception $e) {
            return 'N/A';
        }
    }

    /**
     * Obtenir le statut des sauvegardes
     */
    private function getBackupStatus(): string
    {
        // Vérifier si une sauvegarde récente existe
        $backupPath = storage_path('app/backups');
        if (!is_dir($backupPath)) {
            return 'no_backups';
        }

        $files = glob($backupPath . '/*.sql');
        if (empty($files)) {
            return 'no_backups';
        }

        $latestFile = max($files);
        $fileAge = time() - filemtime($latestFile);

        if ($fileAge < 86400) { // Moins de 24h
            return 'success';
        } elseif ($fileAge < 604800) { // Moins de 7 jours
            return 'warning';
        } else {
            return 'failed';
        }
    }

    /**
     * Obtenir la date de la dernière sauvegarde
     */
    private function getLastBackup(): string
    {
        $backupPath = storage_path('app/backups');
        if (!is_dir($backupPath)) {
            return 'Jamais';
        }

        $files = glob($backupPath . '/*.sql');
        if (empty($files)) {
            return 'Jamais';
        }

        $latestFile = max($files);
        return date('Y-m-d H:i:s', filemtime($latestFile));
    }

    /**
     * Obtenir la date de la prochaine sauvegarde
     */
    private function getNextBackup(): string
    {
        // Simuler la prochaine sauvegarde (tous les jours à 2h du matin)
        $nextBackup = now()->addDay()->setHour(2)->setMinute(0)->setSecond(0);
        return $nextBackup->format('Y-m-d H:i:s');
    }

    /**
     * Créer une sauvegarde de la base de données
     */
    public function createBackup(): RedirectResponse
    {
        try {
            $backupPath = storage_path('app/backups');
            if (!is_dir($backupPath)) {
                mkdir($backupPath, 0755, true);
            }

            $filename = 'backup_' . now()->format('Y_m_d_H_i_s') . '.sql';
            $filepath = $backupPath . '/' . $filename;

            // Commande mysqldump
            $command = sprintf(
                'mysqldump --user=%s --password=%s --host=%s %s > %s',
                config('database.connections.mysql.username'),
                config('database.connections.mysql.password'),
                config('database.connections.mysql.host'),
                config('database.connections.mysql.database'),
                $filepath
            );

            exec($command, $output, $returnCode);

            if ($returnCode === 0) {
                return back()->with('success', 'Sauvegarde créée avec succès: ' . $filename);
            } else {
                return back()->with('error', 'Erreur lors de la création de la sauvegarde.');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors de la création de la sauvegarde: ' . $e->getMessage());
        }
    }

    /**
     * Restaurer une sauvegarde
     */
    public function restoreBackup(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'backup_file' => 'required|string',
        ]);

        try {
            $backupPath = storage_path('app/backups/' . $validated['backup_file']);
            
            if (!file_exists($backupPath)) {
                return back()->with('error', 'Fichier de sauvegarde non trouvé.');
            }

            // Commande mysql pour restaurer
            $command = sprintf(
                'mysql --user=%s --password=%s --host=%s %s < %s',
                config('database.connections.mysql.username'),
                config('database.connections.mysql.password'),
                config('database.connections.mysql.host'),
                config('database.connections.mysql.database'),
                $backupPath
            );

            exec($command, $output, $returnCode);

            if ($returnCode === 0) {
                return back()->with('success', 'Sauvegarde restaurée avec succès.');
            } else {
                return back()->with('error', 'Erreur lors de la restauration de la sauvegarde.');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors de la restauration: ' . $e->getMessage());
        }
    }

    /**
     * Optimiser la base de données
     */
    public function optimize(): RedirectResponse
    {
        try {
            $tables = [
                'users', 'roles', 'user_role', 'bookings', 'sessions', 
                'payments', 'reviews', 'feedback', 'certificates',
                'subjects', 'levels', 'cycles', 'cities', 'neighborhoods',
                'children', 'availabilities'
            ];

            foreach ($tables as $table) {
                try {
                    DB::statement("OPTIMIZE TABLE {$table}");
                } catch (\Exception $e) {
                    // Table n'existe pas, ignorer
                }
            }

            return back()->with('success', 'Base de données optimisée avec succès.');
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors de l\'optimisation: ' . $e->getMessage());
        }
    }

    /**
     * Nettoyer les données anciennes
     */
    public function cleanup(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'cleanup_type' => 'required|in:logs,sessions,backups,all',
            'days_old' => 'required|integer|min:1|max:365',
        ]);

        try {
            $daysOld = $validated['days_old'];
            $cutoffDate = now()->subDays($daysOld);

            switch ($validated['cleanup_type']) {
                case 'logs':
                    $this->cleanupLogs($cutoffDate);
                    break;
                case 'sessions':
                    $this->cleanupSessions($cutoffDate);
                    break;
                case 'backups':
                    $this->cleanupBackups($cutoffDate);
                    break;
                case 'all':
                    $this->cleanupLogs($cutoffDate);
                    $this->cleanupSessions($cutoffDate);
                    $this->cleanupBackups($cutoffDate);
                    break;
            }

            return back()->with('success', 'Nettoyage effectué avec succès.');
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors du nettoyage: ' . $e->getMessage());
        }
    }

    /**
     * Nettoyer les logs
     */
    private function cleanupLogs(\DateTime $cutoffDate): void
    {
        // Nettoyer les logs Laravel
        $logPath = storage_path('logs');
        $files = glob($logPath . '/*.log');
        
        foreach ($files as $file) {
            if (filemtime($file) < $cutoffDate->getTimestamp()) {
                unlink($file);
            }
        }
    }

    /**
     * Nettoyer les sessions
     */
    private function cleanupSessions(\DateTime $cutoffDate): void
    {
        // Nettoyer les sessions expirées
        DB::table('sessions')->where('last_activity', '<', $cutoffDate->getTimestamp())->delete();
    }

    /**
     * Nettoyer les sauvegardes
     */
    private function cleanupBackups(\DateTime $cutoffDate): void
    {
        $backupPath = storage_path('app/backups');
        if (!is_dir($backupPath)) {
            return;
        }

        $files = glob($backupPath . '/*.sql');
        foreach ($files as $file) {
            if (filemtime($file) < $cutoffDate->getTimestamp()) {
                unlink($file);
            }
        }
    }
}
