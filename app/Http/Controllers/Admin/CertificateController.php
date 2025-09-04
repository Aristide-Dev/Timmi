<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    /**
     * Afficher la liste des certificats
     */
    public function index(Request $request): Response
    {
        $query = Certificate::with(['user.roles']);

        // Filtres
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('issuing_organization', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('verification_status')) {
            $query->where('verification_status', $request->verification_status);
        }

        if ($request->filled('user')) {
            $query->where('user_id', $request->user);
        }

        if ($request->filled('expired')) {
            if ($request->boolean('expired')) {
                $query->where('expiry_date', '<', now());
            } else {
                $query->where(function ($q) {
                    $q->whereNull('expiry_date')
                      ->orWhere('expiry_date', '>=', now());
                });
            }
        }

        if ($request->filled('expiring_soon')) {
            $query->whereBetween('expiry_date', [now(), now()->addDays(30)]);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('issued_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('issued_date', '<=', $request->date_to);
        }

        $certificates = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => $certificates,
            'filters' => $request->only([
                'search', 'verification_status', 'user', 'expired', 'expiring_soon', 'date_from', 'date_to'
            ]),
        ]);
    }

    /**
     * Afficher les détails d'un certificat
     */
    public function show(Certificate $certificate): Response
    {
        $certificate->load(['user.roles']);

        return Inertia::render('Admin/Certificates/Show', [
            'certificate' => $certificate,
        ]);
    }

    /**
     * Vérifier un certificat
     */
    public function verify(Request $request, Certificate $certificate): RedirectResponse
    {
        $validated = $request->validate([
            'verification_status' => 'required|in:pending,verified,rejected',
            'admin_notes' => 'nullable|string|max:500',
        ]);

        $certificate->update([
            'verification_status' => $validated['verification_status'],
            'verified_by' => auth()->user()->name,
            'verified_at' => now(),
            'admin_notes' => $validated['admin_notes'] ?? $certificate->admin_notes,
        ]);

        return back()->with('success', 'Certificat vérifié avec succès.');
    }

    /**
     * Télécharger un certificat
     */
    public function download(Certificate $certificate)
    {
        if (!$certificate->file_path || !file_exists(storage_path('app/public/' . $certificate->file_path))) {
            return back()->with('error', 'Fichier du certificat non trouvé.');
        }

        return response()->download(storage_path('app/public/' . $certificate->file_path));
    }

    /**
     * Supprimer un certificat
     */
    public function destroy(Certificate $certificate): RedirectResponse
    {
        // Supprimer le fichier associé
        if ($certificate->file_path && file_exists(storage_path('app/public/' . $certificate->file_path))) {
            unlink(storage_path('app/public/' . $certificate->file_path));
        }

        $certificate->delete();

        return redirect()->route('admin.certificates.index')
            ->with('success', 'Certificat supprimé avec succès.');
    }

    /**
     * Statistiques des certificats
     */
    public function stats(): Response
    {
        $stats = [
            'total_certificates' => Certificate::count(),
            'pending_certificates' => Certificate::where('verification_status', 'pending')->count(),
            'verified_certificates' => Certificate::where('verification_status', 'verified')->count(),
            'rejected_certificates' => Certificate::where('verification_status', 'rejected')->count(),
            'expired_certificates' => Certificate::where('expiry_date', '<', now())->count(),
            'expiring_soon' => Certificate::whereBetween('expiry_date', [now(), now()->addDays(30)])->count(),
            'certificates_with_files' => Certificate::whereNotNull('file_path')->count(),
            'certificates_without_files' => Certificate::whereNull('file_path')->count(),
        ];

        return Inertia::render('Admin/Certificates/Stats', [
            'stats' => $stats,
        ]);
    }
}
