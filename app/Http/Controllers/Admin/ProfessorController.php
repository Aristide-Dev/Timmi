<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Subject;
use App\Models\Level;
use App\Models\City;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfessorController extends Controller
{
    /**
     * Afficher la liste des professeurs
     */
    public function index(Request $request): Response
    {
        $query = User::whereHas('roles', function ($q) {
            $q->where('slug', 'professor');
        })->with(['roles', 'subjects', 'levels', 'cities', 'certificates']);

        // Filtres
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('verification_status')) {
            $query->where('is_verified', $request->boolean('verification_status'));
        }

        if ($request->filled('availability')) {
            $query->where('is_available', $request->boolean('availability'));
        }

        if ($request->filled('subject')) {
            $query->whereHas('subjects', function ($q) use ($request) {
                $q->where('id', $request->subject);
            });
        }

        if ($request->filled('level')) {
            $query->whereHas('levels', function ($q) use ($request) {
                $q->where('id', $request->level);
            });
        }

        if ($request->filled('city')) {
            $query->whereHas('cities', function ($q) use ($request) {
                $q->where('id', $request->city);
            });
        }

        if ($request->filled('rating_min')) {
            $query->where('rating', '>=', $request->rating_min);
        }

        if ($request->filled('hourly_rate_min')) {
            $query->where('hourly_rate', '>=', $request->hourly_rate_min);
        }

        if ($request->filled('hourly_rate_max')) {
            $query->where('hourly_rate', '<=', $request->hourly_rate_max);
        }

        $professors = $query->orderBy('created_at', 'desc')->paginate(15);

        // Données pour les filtres
        $subjects = Subject::where('is_active', true)->get();
        $levels = Level::where('is_active', true)->get();
        $cities = City::where('is_active', true)->get();

        return Inertia::render('Admin/Professors/Index', [
            'professors' => $professors,
            'subjects' => $subjects,
            'levels' => $levels,
            'cities' => $cities,
            'filters' => $request->only([
                'search', 'verification_status', 'availability', 
                'subject', 'level', 'city', 'rating_min', 
                'hourly_rate_min', 'hourly_rate_max'
            ]),
        ]);
    }

    /**
     * Afficher les détails d'un professeur
     */
    public function show(User $professor): Response
    {
        $professor->load([
            'roles', 'subjects', 'levels', 'cities', 'certificates', 
            'availabilities', 'reviews', 'bookings'
        ]);

        // Statistiques du professeur
        $stats = [
            'total_sessions' => $professor->bookings()->where('status', 'completed')->count(),
            'total_earnings' => $professor->bookings()->where('status', 'completed')->sum('total_price'),
            'average_rating' => $professor->reviews()->avg('rating') ?? 0,
            'total_reviews' => $professor->reviews()->count(),
            'verification_status' => $professor->is_verified ? 'verified' : 'pending',
            'documents_uploaded' => $professor->certificates()->count(),
            'last_activity' => $professor->updated_at->format('Y-m-d H:i:s'),
        ];

        return Inertia::render('Admin/Professors/Show', [
            'professor' => $professor,
            'stats' => $stats,
        ]);
    }

    /**
     * Approuver un professeur
     */
    public function approve(User $professor): RedirectResponse
    {
        $professor->update(['is_verified' => true]);

        return back()->with('success', 'Professeur approuvé avec succès.');
    }

    /**
     * Rejeter un professeur
     */
    public function reject(Request $request, User $professor): RedirectResponse
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $professor->update([
            'is_verified' => false,
            'rejection_reason' => $validated['reason'],
        ]);

        return back()->with('success', 'Professeur rejeté avec succès.');
    }

    /**
     * Suspendre/Activer un professeur
     */
    public function toggleStatus(User $professor): RedirectResponse
    {
        $professor->update(['is_available' => !$professor->is_available]);

        $status = $professor->is_available ? 'activé' : 'suspendu';

        return back()->with('success', "Professeur {$status} avec succès.");
    }

    /**
     * Mettre à jour les matières d'un professeur
     */
    public function updateSubjects(Request $request, User $professor): RedirectResponse
    {
        $validated = $request->validate([
            'subjects' => 'array',
            'subjects.*' => 'exists:subjects,id',
        ]);

        $professor->subjects()->sync($validated['subjects'] ?? []);

        return back()->with('success', 'Matières mises à jour avec succès.');
    }

    /**
     * Mettre à jour les niveaux d'un professeur
     */
    public function updateLevels(Request $request, User $professor): RedirectResponse
    {
        $validated = $request->validate([
            'levels' => 'array',
            'levels.*' => 'exists:levels,id',
        ]);

        $professor->levels()->sync($validated['levels'] ?? []);

        return back()->with('success', 'Niveaux mis à jour avec succès.');
    }

    /**
     * Mettre à jour les villes d'un professeur
     */
    public function updateCities(Request $request, User $professor): RedirectResponse
    {
        $validated = $request->validate([
            'cities' => 'array',
            'cities.*' => 'exists:cities,id',
        ]);

        $professor->cities()->sync($validated['cities'] ?? []);

        return back()->with('success', 'Villes mises à jour avec succès.');
    }

    /**
     * Mettre à jour le tarif horaire d'un professeur
     */
    public function updateHourlyRate(Request $request, User $professor): RedirectResponse
    {
        $validated = $request->validate([
            'hourly_rate' => 'required|numeric|min:0',
        ]);

        $professor->update(['hourly_rate' => $validated['hourly_rate']]);

        return back()->with('success', 'Tarif horaire mis à jour avec succès.');
    }
}
