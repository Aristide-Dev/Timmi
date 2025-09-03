<?php

declare(strict_types=1);

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ZoneController extends Controller
{
    /**
     * Afficher les zones du professeur
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        // Récupérer les villes du professeur
        $userCities = $user->cities;
        
        // Récupérer toutes les villes disponibles
        $availableCities = City::whereNotIn('id', $userCities->pluck('id'))->get();

        return Inertia::render('Professor/Zones/Index', [
            'user_cities' => $userCities,
            'available_cities' => $availableCities,
        ]);
    }

    /**
     * Ajouter une ville aux zones du professeur
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'city_id' => 'required|exists:cities,id',
        ]);

        $user = $request->user();
        $city = City::findOrFail($request->city_id);

        // Vérifier que la ville n'est pas déjà associée
        if (!$user->cities()->where('city_id', $city->id)->exists()) {
            $user->cities()->attach($city->id);
            
            return redirect()->route('professor.zones.index')
                ->with('success', "Zone '{$city->name}' ajoutée avec succès.");
        }

        return redirect()->route('professor.zones.index')
            ->with('error', 'Cette zone est déjà associée à votre profil.');
    }

    /**
     * Supprimer une ville des zones du professeur
     */
    public function destroy(Request $request, City $city): RedirectResponse
    {
        $user = $request->user();
        
        // Vérifier que la ville est bien associée au professeur
        if ($user->cities()->where('city_id', $city->id)->exists()) {
            $user->cities()->detach($city->id);
            
            return redirect()->route('professor.zones.index')
                ->with('success', "Zone '{$city->name}' supprimée avec succès.");
        }

        return redirect()->route('professor.zones.index')
            ->with('error', 'Cette zone n\'est pas associée à votre profil.');
    }
}
