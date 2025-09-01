<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Neighborhood;
use App\Services\LocationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    public function __construct(
        private LocationService $locationService
    ) {}

    /**
     * Afficher la liste des villes
     */
    public function cities(): Response
    {
        $cities = $this->locationService->getCitiesPaginated();

        return Inertia::render('Admin/Location/Cities/Index', [
            'cities' => $cities,
        ]);
    }

    /**
     * Afficher le formulaire de création d'une ville
     */
    public function createCity(): Response
    {
        return Inertia::render('Admin/Location/Cities/Create');
    }

    /**
     * Stocker une nouvelle ville
     */
    public function storeCity(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $this->locationService->createCity($validated);

        return redirect()->route('admin.locations.cities.index')
            ->with('success', 'Ville créée avec succès.');
    }

    /**
     * Afficher le formulaire d'édition d'une ville
     */
    public function editCity(City $city): Response
    {
        return Inertia::render('Admin/Location/Cities/Edit', [
            'city' => $city,
        ]);
    }

    /**
     * Mettre à jour une ville
     */
    public function updateCity(Request $request, City $city)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $this->locationService->updateCity($city, $validated);

        return redirect()->route('admin.locations.cities.index')
            ->with('success', 'Ville mise à jour avec succès.');
    }

    /**
     * Supprimer une ville
     */
    public function destroyCity(City $city)
    {
        $this->locationService->deleteCity($city);

        return redirect()->route('admin.locations.cities.index')
            ->with('success', 'Ville supprimée avec succès.');
    }

    /**
     * Afficher la liste des quartiers
     */
    public function neighborhoods(): Response
    {
        $neighborhoods = $this->locationService->getNeighborhoodsPaginated();
        $cities = $this->locationService->getActiveCities();

        return Inertia::render('Admin/Location/Neighborhoods/Index', [
            'neighborhoods' => $neighborhoods,
            'cities' => $cities,
        ]);
    }

    /**
     * Afficher le formulaire de création d'un quartier
     */
    public function createNeighborhood(): Response
    {
        $cities = $this->locationService->getActiveCities();

        return Inertia::render('Admin/Location/Neighborhoods/Create', [
            'cities' => $cities,
        ]);
    }

    /**
     * Stocker un nouveau quartier
     */
    public function storeNeighborhood(Request $request)
    {
        $validated = $request->validate([
            'city_id' => 'required|exists:cities,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $this->locationService->createNeighborhood($validated);

        return redirect()->route('admin.locations.neighborhoods.index')
            ->with('success', 'Quartier créé avec succès.');
    }

    /**
     * Afficher le formulaire d'édition d'un quartier
     */
    public function editNeighborhood(Neighborhood $neighborhood): Response
    {
        $cities = $this->locationService->getActiveCities();

        return Inertia::render('Admin/Location/Neighborhoods/Edit', [
            'neighborhood' => $neighborhood->load('city'),
            'cities' => $cities,
        ]);
    }

    /**
     * Mettre à jour un quartier
     */
    public function updateNeighborhood(Request $request, Neighborhood $neighborhood)
    {
        $validated = $request->validate([
            'city_id' => 'required|exists:cities,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $this->locationService->updateNeighborhood($neighborhood, $validated);

        return redirect()->route('admin.locations.neighborhoods.index')
            ->with('success', 'Quartier mis à jour avec succès.');
    }

    /**
     * Supprimer un quartier
     */
    public function destroyNeighborhood(Neighborhood $neighborhood)
    {
        $this->locationService->deleteNeighborhood($neighborhood);

        return redirect()->route('admin.locations.neighborhoods.index')
            ->with('success', 'Quartier supprimé avec succès.');
    }

    /**
     * API: Récupérer les quartiers d'une ville
     */
    public function getNeighborhoodsByCity(Request $request)
    {
        $validated = $request->validate([
            'city_id' => 'required|exists:cities,id',
        ]);

        $neighborhoods = $this->locationService->getNeighborhoodsByCity($validated['city_id']);

        return response()->json($neighborhoods);
    }
}
