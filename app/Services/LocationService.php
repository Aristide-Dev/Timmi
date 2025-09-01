<?php

namespace App\Services;

use App\Models\City;
use App\Models\Neighborhood;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class LocationService
{
    /**
     * Récupérer toutes les villes actives
     */
    public function getActiveCities(): Collection
    {
        return City::active()->ordered()->get();
    }

    /**
     * Récupérer toutes les villes avec pagination
     */
    public function getCitiesPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return City::ordered()->paginate($perPage);
    }

    /**
     * Créer une nouvelle ville
     */
    public function createCity(array $data): City
    {
        return City::create($data);
    }

    /**
     * Mettre à jour une ville
     */
    public function updateCity(City $city, array $data): bool
    {
        return $city->update($data);
    }

    /**
     * Supprimer une ville
     */
    public function deleteCity(City $city): bool
    {
        return $city->delete();
    }

    /**
     * Récupérer les quartiers d'une ville
     */
    public function getNeighborhoodsByCity(int $cityId): Collection
    {
        return Neighborhood::byCity($cityId)->active()->ordered()->get();
    }

    /**
     * Récupérer tous les quartiers avec pagination
     */
    public function getNeighborhoodsPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Neighborhood::with('city')->ordered()->paginate($perPage);
    }

    /**
     * Créer un nouveau quartier
     */
    public function createNeighborhood(array $data): Neighborhood
    {
        return Neighborhood::create($data);
    }

    /**
     * Mettre à jour un quartier
     */
    public function updateNeighborhood(Neighborhood $neighborhood, array $data): bool
    {
        return $neighborhood->update($data);
    }

    /**
     * Supprimer un quartier
     */
    public function deleteNeighborhood(Neighborhood $neighborhood): bool
    {
        return $neighborhood->delete();
    }

    /**
     * Récupérer les données pour les formulaires de sélection
     */
    public function getLocationData(): array
    {
        return [
            'cities' => $this->getActiveCities(),
            'neighborhoods' => Neighborhood::with('city')->active()->ordered()->get(),
        ];
    }
}
