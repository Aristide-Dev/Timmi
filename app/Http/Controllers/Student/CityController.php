<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CityController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $user->load('studentCities');
        
        $allCities = City::all();
        
        return Inertia::render('Student/Cities/Index', [
            'user' => $user,
            'cities' => $allCities,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'city_id' => 'required|exists:cities,id',
        ]);

        $user->studentCities()->syncWithoutDetaching([$request->city_id]);

        return back()->with('success', 'Ville ajoutée avec succès.');
    }

    public function destroy(Request $request, City $city)
    {
        $user = $request->user();
        
        $user->studentCities()->detach($city->id);

        return back()->with('success', 'Ville supprimée avec succès.');
    }
}
