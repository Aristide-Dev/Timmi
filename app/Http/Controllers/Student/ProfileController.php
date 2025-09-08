<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Models\Level;
use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $user->load(['studentSubjects', 'studentLevels', 'studentCities', 'parent']);
        
        return Inertia::render('Student/Profile/Index', [
            'user' => $user,
            'subjects' => Subject::all(),
            'levels' => Level::all(),
            'cities' => City::all(),
        ]);
    }

    public function edit(Request $request)
    {
        $user = $request->user();
        
        $user->load(['studentSubjects', 'studentLevels', 'studentCities', 'parent']);
        
        return Inertia::render('Student/Profile/Edit', [
            'user' => $user,
            'subjects' => Subject::all(),
            'levels' => Level::all(),
            'cities' => City::all(),
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'phone' => 'nullable|string|max:20',
            'age' => 'nullable|integer|min:13|max:25',
            'grade_level' => 'nullable|string|max:50',
            'school' => 'nullable|string|max:255',
            'learning_goals' => 'nullable|string|max:1000',
            'preferred_subjects' => 'nullable|array',
            'preferred_subjects.*' => 'exists:subjects,id',
            'preferred_levels' => 'nullable|array',
            'preferred_levels.*' => 'exists:levels,id',
            'preferred_cities' => 'nullable|array',
            'preferred_cities.*' => 'exists:cities,id',
            'parent_id' => 'nullable|exists:users,id',
        ]);

        $user->update($request->only([
            'name', 'email', 'phone', 'age', 'grade_level', 
            'school', 'learning_goals', 'preferred_subjects', 
            'preferred_levels', 'preferred_cities', 'parent_id'
        ]));

        // Synchroniser les relations many-to-many
        if ($request->has('preferred_subjects')) {
            $user->studentSubjects()->sync($request->preferred_subjects);
        }
        
        if ($request->has('preferred_levels')) {
            $user->studentLevels()->sync($request->preferred_levels);
        }
        
        if ($request->has('preferred_cities')) {
            $user->studentCities()->sync($request->preferred_cities);
        }

        return redirect()->route('student.profile.index')
            ->with('success', 'Profil mis à jour avec succès.');
    }
}
