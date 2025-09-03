<?php

declare(strict_types=1);

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Professor\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Afficher le profil du professeur
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        // Charger les relations nécessaires
        $user->load(['subjects', 'levels', 'cities', 'certificates']);
        
        // Statistiques du profil
        $stats = [
            'total_hours_taught' => $user->bookings()->where('status', 'completed')->sum('duration') / 60, // en heures
            'total_students' => $user->bookings()->distinct('child_id')->count(),
            'average_rating' => $user->reviews()->avg('rating') ?? 0,
            'total_reviews' => $user->reviews()->count(),
        ];

        return Inertia::render('Professor/Profile/Index', [
            'user' => $user,
            'stats' => $stats,
        ]);
    }

    /**
     * Afficher le formulaire d'édition du profil
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        
        // Charger les relations nécessaires
        $user->load(['subjects', 'levels', 'cities', 'certificates']);
        
        // Récupérer toutes les options disponibles
        $subjects = \App\Models\Subject::all();
        $levels = \App\Models\Level::all();
        $cities = \App\Models\City::all();

        return Inertia::render('Professor/Profile/Edit', [
            'user' => $user,
            'subjects' => $subjects,
            'levels' => $levels,
            'cities' => $cities,
        ]);
    }

    /**
     * Mettre à jour le profil du professeur
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        // Gestion de la photo de profil
        if ($request->hasFile('profile_photo')) {
            // Supprimer l'ancienne photo si elle existe
            if ($user->profile_photo && Storage::disk('public')->exists($user->profile_photo)) {
                Storage::disk('public')->delete($user->profile_photo);
            }
            
            // Stocker la nouvelle photo
            $validated['profile_photo'] = $request->file('profile_photo')->store('profiles', 'public');
        }

        // Mettre à jour les informations de base
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'bio' => $validated['bio'],
            'hourly_rate' => $validated['hourly_rate'],
            'profile_photo' => $validated['profile_photo'] ?? $user->profile_photo,
        ]);

        // Mettre à jour les matières
        if (isset($validated['subjects'])) {
            $user->subjects()->sync($validated['subjects']);
        }

        // Mettre à jour les niveaux
        if (isset($validated['levels'])) {
            $user->levels()->sync($validated['levels']);
        }

        // Mettre à jour les villes
        if (isset($validated['cities'])) {
            $user->cities()->sync($validated['cities']);
        }

        return redirect()->route('professor.profile.index')
            ->with('success', 'Profil mis à jour avec succès.');
    }
}
