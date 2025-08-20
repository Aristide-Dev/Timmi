<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Commune;
use App\Models\Neighborhood;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Afficher la page de gestion des localités
     */
    public function index()
    {
        $cities = City::withCount('communes')
            ->with(['communes' => function($query) {
                $query->withCount('neighborhoods');
            }])
            ->get();
        
        return Inertia::render('admin/locations/index', [
            'cities' => $cities,
        ]);
    }

    /**
     * Afficher la page de gestion des villes
     */
    public function cities()
    {
        $cities = City::withCount('communes')
            ->with(['communes' => function($query) {
                $query->withCount('neighborhoods');
            }])
            ->orderBy('name')
            ->get();
        
        return Inertia::render('admin/locations/cities', [
            'cities' => $cities,
        ]);
    }

    /**
     * Afficher la page de gestion des communes
     */
    public function communes()
    {
        $communes = Commune::with(['city', 'neighborhoods'])
            ->withCount('neighborhoods')
            ->orderBy('name')
            ->get();
        
        $cities = City::orderBy('name')->get();
        
        return Inertia::render('admin/locations/communes', [
            'communes' => $communes,
            'cities' => $cities,
        ]);
    }

    /**
     * Afficher la page de gestion des quartiers
     */
    public function neighborhoods()
    {
        $neighborhoods = Neighborhood::with(['commune.city'])
            ->orderBy('name')
            ->get();
        
        $communes = Commune::with('city')->orderBy('name')->get();
        
        return Inertia::render('admin/locations/neighborhoods', [
            'neighborhoods' => $neighborhoods,
            'communes' => $communes,
        ]);
    }

    // ===== GESTION DES VILLES =====

    /**
     * Créer une nouvelle ville
     */
    public function storeCity(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:cities,name',
            'code' => 'required|string|max:10|unique:cities,code',
        ]);

        City::create([
            'name' => $request->name,
            'code' => strtoupper($request->code),
            'is_active' => true,
        ]);

        return redirect()->back()->with('success', 'Ville créée avec succès.');
    }

    /**
     * Mettre à jour une ville
     */
    public function updateCity(Request $request, City $city)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('cities')->ignore($city->id)],
            'code' => ['required', 'string', 'max:10', Rule::unique('cities')->ignore($city->id)],
            'is_active' => 'boolean',
        ]);

        $city->update([
            'name' => $request->name,
            'code' => strtoupper($request->code),
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->back()->with('success', 'Ville mise à jour avec succès.');
    }

    /**
     * Supprimer une ville
     */
    public function destroyCity(City $city)
    {
        if ($city->communes()->count() > 0) {
            return redirect()->back()->with('error', 'Impossible de supprimer une ville qui contient des communes.');
        }

        $city->delete();
        return redirect()->back()->with('success', 'Ville supprimée avec succès.');
    }

    // ===== GESTION DES COMMUNES =====

    /**
     * Créer une nouvelle commune
     */
    public function storeCommune(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:communes,code',
            'city_id' => 'required|exists:cities,id',
        ]);

        Commune::create([
            'name' => $request->name,
            'code' => strtoupper($request->code),
            'city_id' => $request->city_id,
            'is_active' => true,
        ]);

        return redirect()->back()->with('success', 'Commune créée avec succès.');
    }

    /**
     * Mettre à jour une commune
     */
    public function updateCommune(Request $request, Commune $commune)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => ['required', 'string', 'max:10', Rule::unique('communes')->ignore($commune->id)],
            'city_id' => 'required|exists:cities,id',
            'is_active' => 'boolean',
        ]);

        $commune->update([
            'name' => $request->name,
            'code' => strtoupper($request->code),
            'city_id' => $request->city_id,
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->back()->with('success', 'Commune mise à jour avec succès.');
    }

    /**
     * Supprimer une commune
     */
    public function destroyCommune(Commune $commune)
    {
        if ($commune->neighborhoods()->count() > 0) {
            return redirect()->back()->with('error', 'Impossible de supprimer une commune qui contient des quartiers.');
        }

        $commune->delete();
        return redirect()->back()->with('success', 'Commune supprimée avec succès.');
    }

    // ===== GESTION DES QUARTIERS =====

    /**
     * Créer un nouveau quartier
     */
    public function storeNeighborhood(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:neighborhoods,code',
            'commune_id' => 'required|exists:communes,id',
        ]);

        Neighborhood::create([
            'name' => $request->name,
            'code' => strtoupper($request->code),
            'commune_id' => $request->commune_id,
            'is_active' => true,
        ]);

        return redirect()->back()->with('success', 'Quartier créé avec succès.');
    }

    /**
     * Mettre à jour un quartier
     */
    public function updateNeighborhood(Request $request, Neighborhood $neighborhood)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => ['required', 'string', 'max:10', Rule::unique('neighborhoods')->ignore($neighborhood->id)],
            'commune_id' => 'required|exists:communes,id',
            'is_active' => 'boolean',
        ]);

        $neighborhood->update([
            'name' => $request->name,
            'code' => strtoupper($request->code),
            'commune_id' => $request->commune_id,
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->back()->with('success', 'Quartier mis à jour avec succès.');
    }

    /**
     * Supprimer un quartier
     */
    public function destroyNeighborhood(Neighborhood $neighborhood)
    {
        $neighborhood->delete();
        return redirect()->back()->with('success', 'Quartier supprimé avec succès.');
    }
}
