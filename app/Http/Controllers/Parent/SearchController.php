<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Subject;
use App\Models\Level;
use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function professors(Request $request)
    {
        // Debug: Vérifier d'abord s'il y a des utilisateurs avec le rôle professor
        $totalUsers = User::count();
        $professorUsers = User::whereHas('roles', function ($q) {
            $q->where('slug', 'professor');
        })->count();
        
        \Log::info("Debug SearchController: Total users: {$totalUsers}, Professor users: {$professorUsers}");
        
        $query = User::whereHas('roles', function ($q) {
            $q->where('slug', 'professor');
        })->with(['subjects', 'levels', 'cities']); // Temporairement retiré 'reviews'
        
        // Filtres
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('bio', 'like', "%{$search}%")
                  ->orWhereHas('subjects', function ($sq) use ($search) {
                      $sq->where('name', 'like', "%{$search}%");
                  });
            });
        }
        
        if ($request->filled('subjects')) {
            $subjects = explode(',', $request->get('subjects'));
            $query->whereHas('subjects', function ($q) use ($subjects) {
                $q->whereIn('id', $subjects);
            });
        }
        
        if ($request->filled('levels')) {
            $levels = explode(',', $request->get('levels'));
            $query->whereHas('levels', function ($q) use ($levels) {
                $q->whereIn('id', $levels);
            });
        }
        
        if ($request->filled('cities')) {
            $cities = explode(',', $request->get('cities'));
            $query->whereHas('cities', function ($q) use ($cities) {
                $q->whereIn('id', $cities);
            });
        }
        
        if ($request->filled('price_max')) {
            $query->where('hourly_rate', '<=', $request->get('price_max'));
        }
        
        if ($request->filled('rating_min')) {
            $query->where('rating', '>=', $request->get('rating_min'));
        }
        
        if ($request->filled('verified_only') && $request->get('verified_only')) {
            $query->where('is_verified', true);
        }
        
        // Tri
        $sortBy = $request->get('sort', 'relevance');
        switch ($sortBy) {
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'price_low':
                $query->orderBy('hourly_rate', 'asc');
                break;
            case 'price_high':
                $query->orderBy('hourly_rate', 'desc');
                break;
            case 'experience':
                $query->orderBy('experience_years', 'desc');
                break;
            default:
                $query->orderBy('rating', 'desc');
        }
        
        $professors = $query->paginate(12);
        
        // Données pour les filtres
        $subjects = Subject::where('is_active', true)->orderBy('name')->get();
        $levels = Level::where('is_active', true)->orderBy('sort_order')->get();
        $cities = City::where('is_active', true)->orderBy('name')->get();
        
        $searchResult = [
            'professors' => $professors->items(),
            'total' => $professors->total(),
            'current_page' => $professors->currentPage(),
            'last_page' => $professors->lastPage(),
            'filters' => $request->only(['subjects', 'levels', 'cities', 'price_max', 'rating_min', 'verified_only']),
        ];
        
        return Inertia::render('Parent/Search/Index', [
            'searchResult' => $searchResult,
            'subjects' => $subjects,
            'levels' => $levels,
            'cities' => $cities,
        ]);
    }
}
