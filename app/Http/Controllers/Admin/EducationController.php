<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cycle;
use App\Models\Level;
use App\Models\Subject;
use App\Services\EducationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EducationController extends Controller
{
    public function __construct(
        private EducationService $educationService
    ) {}

    /**
     * Afficher la liste des cycles
     */
    public function cycles(): Response
    {
        $cycles = $this->educationService->getCyclesPaginated();

        return Inertia::render('Admin/Education/Cycles/Index', [
            'cycles' => $cycles,
        ]);
    }

    /**
     * Afficher le formulaire de création d'un cycle
     */
    public function createCycle(): Response
    {
        return Inertia::render('Admin/Education/Cycles/Create');
    }

    /**
     * Stocker un nouveau cycle
     */
    public function storeCycle(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'min_age' => 'nullable|integer|min:0',
            'max_age' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $this->educationService->createCycle($validated);

        return redirect()->route('admin.education.cycles.index')
            ->with('success', 'Cycle créé avec succès.');
    }

    /**
     * Afficher le formulaire d'édition d'un cycle
     */
    public function editCycle(Cycle $cycle): Response
    {
        return Inertia::render('Admin/Education/Cycles/Edit', [
            'cycle' => $cycle,
        ]);
    }

    /**
     * Mettre à jour un cycle
     */
    public function updateCycle(Request $request, Cycle $cycle)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'min_age' => 'nullable|integer|min:0',
            'max_age' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $this->educationService->updateCycle($cycle, $validated);

        return redirect()->route('admin.education.cycles.index')
            ->with('success', 'Cycle mis à jour avec succès.');
    }

    /**
     * Supprimer un cycle
     */
    public function destroyCycle(Cycle $cycle)
    {
        $this->educationService->deleteCycle($cycle);

        return redirect()->route('admin.education.cycles.index')
            ->with('success', 'Cycle supprimé avec succès.');
    }

    /**
     * Afficher la liste des niveaux
     */
    public function levels(): Response
    {
        $levels = $this->educationService->getLevelsPaginated();
        $cycles = $this->educationService->getActiveCycles();

        return Inertia::render('Admin/Education/Levels/Index', [
            'levels' => $levels,
            'cycles' => $cycles,
        ]);
    }

    /**
     * Afficher le formulaire de création d'un niveau
     */
    public function createLevel(): Response
    {
        $cycles = $this->educationService->getActiveCycles();

        return Inertia::render('Admin/Education/Levels/Create', [
            'cycles' => $cycles,
        ]);
    }

    /**
     * Stocker un nouveau niveau
     */
    public function storeLevel(Request $request)
    {
        $validated = $request->validate([
            'cycle_id' => 'required|exists:cycles,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'grade_level' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $this->educationService->createLevel($validated);

        return redirect()->route('admin.education.levels.index')
            ->with('success', 'Niveau créé avec succès.');
    }

    /**
     * Afficher le formulaire d'édition d'un niveau
     */
    public function editLevel(Level $level): Response
    {
        $cycles = $this->educationService->getActiveCycles();

        return Inertia::render('Admin/Education/Levels/Edit', [
            'level' => $level->load('cycle'),
            'cycles' => $cycles,
        ]);
    }

    /**
     * Mettre à jour un niveau
     */
    public function updateLevel(Request $request, Level $level)
    {
        $validated = $request->validate([
            'cycle_id' => 'required|exists:cycles,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'grade_level' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $this->educationService->updateLevel($level, $validated);

        return redirect()->route('admin.education.levels.index')
            ->with('success', 'Niveau mis à jour avec succès.');
    }

    /**
     * Supprimer un niveau
     */
    public function destroyLevel(Level $level)
    {
        $this->educationService->deleteLevel($level);

        return redirect()->route('admin.education.levels.index')
            ->with('success', 'Niveau supprimé avec succès.');
    }

    /**
     * Afficher la liste des matières
     */
    public function subjects(): Response
    {
        $subjects = $this->educationService->getSubjectsPaginated();

        return Inertia::render('Admin/Education/Subjects/Index', [
            'subjects' => $subjects,
        ]);
    }

    /**
     * Afficher le formulaire de création d'une matière
     */
    public function createSubject(): Response
    {
        return Inertia::render('Admin/Education/Subjects/Create');
    }

    /**
     * Stocker une nouvelle matière
     */
    public function storeSubject(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $this->educationService->createSubject($validated);

        return redirect()->route('admin.education.subjects.index')
            ->with('success', 'Matière créée avec succès.');
    }

    /**
     * Afficher le formulaire d'édition d'une matière
     */
    public function editSubject(Subject $subject): Response
    {
        return Inertia::render('Admin/Education/Subjects/Edit', [
            'subject' => $subject,
        ]);
    }

    /**
     * Mettre à jour une matière
     */
    public function updateSubject(Request $request, Subject $subject)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $this->educationService->updateSubject($subject, $validated);

        return redirect()->route('admin.education.subjects.index')
            ->with('success', 'Matière mise à jour avec succès.');
    }

    /**
     * Supprimer une matière
     */
    public function destroySubject(Subject $subject)
    {
        $this->educationService->deleteSubject($subject);

        return redirect()->route('admin.education.subjects.index')
            ->with('success', 'Matière supprimée avec succès.');
    }

    /**
     * API: Récupérer les niveaux d'un cycle
     */
    public function getLevelsByCycle(Request $request)
    {
        $validated = $request->validate([
            'cycle_id' => 'required|exists:cycles,id',
        ]);

        $levels = $this->educationService->getLevelsByCycle($validated['cycle_id']);

        return response()->json($levels);
    }
}
