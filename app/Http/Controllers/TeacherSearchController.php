<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Subject;
use App\Models\Level;
use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherSearchController extends Controller
{
    public function index(Request $request)
    {
        // Récupérer les professeurs avec leurs relations
        $teachersQuery = User::whereHas('roles', function ($query) {
            $query->where('slug', 'professor');
        })
        ->where('is_available', true) // Seulement les professeurs disponibles
        ->with([
            'subjects',
            'levels', 
            'cities',
            'reviews' => function ($query) {
                $query->with('student:id,name')
                      ->orderBy('created_at', 'desc');
            },
            'professorBookings' => function ($query) {
                $query->whereIn('status', ['confirmed', 'pending'])
                      ->where('start_time', '>=', now());
            }
        ]);

        // Appliquer les filtres de recherche textuelle
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $teachersQuery->where(function ($query) use ($searchTerm) {
                $query->where('name', 'like', "%{$searchTerm}%")
                      ->orWhere('bio', 'like', "%{$searchTerm}%")
                      ->orWhereHas('subjects', function ($q) use ($searchTerm) {
                          $q->where('name', 'like', "%{$searchTerm}%");
                      })
                      ->orWhereHas('cities', function ($q) use ($searchTerm) {
                          $q->where('name', 'like', "%{$searchTerm}%");
                      });
            });
        }

        // Appliquer les filtres par matière
        if ($request->filled('subject')) {
            $teachersQuery->whereHas('subjects', function ($query) use ($request) {
                $query->where('name', $request->subject);
            });
        }

        // Appliquer les filtres par niveau
        if ($request->filled('level')) {
            $teachersQuery->whereHas('levels', function ($query) use ($request) {
                $query->where('name', $request->level);
            });
        }

        // Appliquer les filtres par ville
        if ($request->filled('city')) {
            $teachersQuery->whereHas('cities', function ($query) use ($request) {
                $query->where('name', $request->city);
            });
        }

        // Appliquer les filtres par prix
        if ($request->filled('min_price')) {
            $teachersQuery->where('hourly_rate', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $teachersQuery->where('hourly_rate', '<=', $request->max_price);
        }

        // Appliquer les filtres par note minimum
        if ($request->filled('min_rating')) {
            $teachersQuery->whereHas('reviews', function ($query) use ($request) {
                $query->selectRaw('professor_id, AVG(rating) as avg_rating')
                      ->groupBy('professor_id')
                      ->having('avg_rating', '>=', $request->min_rating);
            });
        }

        // Trier par note moyenne et nombre d'avis
        $teachersQuery->withAvg('reviews', 'rating')
                     ->withCount('reviews')
                     ->orderBy('reviews_avg_rating', 'desc')
                     ->orderBy('reviews_count', 'desc')
                     ->orderBy('created_at', 'desc');

        // Pagination
        $perPage = $request->get('per_page', 12);
        $teachers = $teachersQuery->paginate($perPage);

        // Récupérer les options pour les filtres
        $subjects = Subject::orderBy('name')->get(['id', 'name']);
        $levels = Level::orderBy('name')->get(['id', 'name']);
        $cities = City::orderBy('name')->get(['id', 'name']);

        // Préparer les filtres actuels
        $filters = [
            'search' => $request->search,
            'subject' => $request->subject,
            'level' => $request->level,
            'city' => $request->city,
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
            'min_rating' => $request->min_rating,
        ];

        return Inertia::render('TeacherSearch', [
            'teachers' => $teachers,
            'subjects' => $subjects,
            'levels' => $levels,
            'cities' => $cities,
            'filters' => $filters,
        ]);
    }
}
