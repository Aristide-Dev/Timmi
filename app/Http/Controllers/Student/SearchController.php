<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Subject;
use App\Models\Level;
use App\Models\City;
use App\Traits\HandlesPagination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    use HandlesPagination;
    public function professors(Request $request)
    {
        $query = User::whereHas('roles', function ($q) {
            $q->where('slug', 'professor');
        })->with(['subjects', 'levels', 'cities', 'reviews']);

        // Filtres
        if ($request->filled('subject_id')) {
            $query->whereHas('subjects', function ($q) use ($request) {
                $q->where('subjects.id', $request->subject_id);
            });
        }

        if ($request->filled('level_id')) {
            $query->whereHas('levels', function ($q) use ($request) {
                $q->where('levels.id', $request->level_id);
            });
        }

        if ($request->filled('city_id')) {
            $query->whereHas('cities', function ($q) use ($request) {
                $q->where('cities.id', $request->city_id);
            });
        }

        if ($request->filled('min_rating')) {
            $query->where('rating', '>=', $request->min_rating);
        }

        if ($request->filled('max_hourly_rate')) {
            $query->where('hourly_rate', '<=', $request->max_hourly_rate);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('bio', 'like', "%{$search}%")
                  ->orWhere('specializations', 'like', "%{$search}%");
            });
        }

        // Tri
        $sortBy = $request->get('sort_by', 'rating');
        $sortOrder = $request->get('sort_order', 'desc');
        
        if ($sortBy === 'rating') {
            $query->orderBy('rating', $sortOrder);
        } elseif ($sortBy === 'price') {
            $query->orderBy('hourly_rate', $sortOrder);
        } elseif ($sortBy === 'name') {
            $query->orderBy('name', $sortOrder);
        }

        $professors = $query->paginate(12);

        return Inertia::render('Student/Search/Professors', [
            'professors' => $this->formatPaginatedData($professors),
            'filters' => $request->only(['subject_id', 'level_id', 'city_id', 'min_rating', 'max_hourly_rate', 'search', 'sort_by', 'sort_order']),
            'subjects' => Subject::all(),
            'levels' => Level::all(),
            'cities' => City::all(),
        ]);
    }
}
