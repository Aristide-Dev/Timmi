<?php

namespace App\Services;

use App\Models\Cycle;
use App\Models\Level;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class EducationService
{
    /**
     * Récupérer tous les cycles actifs
     */
    public function getActiveCycles(): Collection
    {
        return Cycle::active()->ordered()->get();
    }

    /**
     * Récupérer tous les cycles avec pagination
     */
    public function getCyclesPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Cycle::ordered()->paginate($perPage);
    }

    /**
     * Créer un nouveau cycle
     */
    public function createCycle(array $data): Cycle
    {
        return Cycle::create($data);
    }

    /**
     * Mettre à jour un cycle
     */
    public function updateCycle(Cycle $cycle, array $data): bool
    {
        return $cycle->update($data);
    }

    /**
     * Supprimer un cycle
     */
    public function deleteCycle(Cycle $cycle): bool
    {
        return $cycle->delete();
    }

    /**
     * Récupérer les niveaux d'un cycle
     */
    public function getLevelsByCycle(int $cycleId): Collection
    {
        return Level::byCycle($cycleId)->active()->ordered()->get();
    }

    /**
     * Récupérer tous les niveaux avec pagination
     */
    public function getLevelsPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Level::with('cycle')->ordered()->paginate($perPage);
    }

    /**
     * Créer un nouveau niveau
     */
    public function createLevel(array $data): Level
    {
        return Level::create($data);
    }

    /**
     * Mettre à jour un niveau
     */
    public function updateLevel(Level $level, array $data): bool
    {
        return $level->update($data);
    }

    /**
     * Supprimer un niveau
     */
    public function deleteLevel(Level $level): bool
    {
        return $level->delete();
    }

    /**
     * Récupérer toutes les matières actives
     */
    public function getActiveSubjects(): Collection
    {
        return Subject::active()->ordered()->get();
    }

    /**
     * Récupérer toutes les matières avec pagination
     */
    public function getSubjectsPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Subject::ordered()->paginate($perPage);
    }

    /**
     * Créer une nouvelle matière
     */
    public function createSubject(array $data): Subject
    {
        return Subject::create($data);
    }

    /**
     * Mettre à jour une matière
     */
    public function updateSubject(Subject $subject, array $data): bool
    {
        return $subject->update($data);
    }

    /**
     * Supprimer une matière
     */
    public function deleteSubject(Subject $subject): bool
    {
        return $subject->delete();
    }

    /**
     * Récupérer les données pour les formulaires de sélection
     */
    public function getEducationData(): array
    {
        return [
            'cycles' => $this->getActiveCycles(),
            'levels' => Level::with('cycle')->active()->ordered()->get(),
            'subjects' => $this->getActiveSubjects(),
        ];
    }
}
