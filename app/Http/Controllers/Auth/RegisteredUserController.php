<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\TeacherProfile;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(Request $request): Response
    {
        $type = $request->route('type', '');
        
        return Inertia::render('auth/register', [
            'defaultRole' => $type,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validationRules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:parent,teacher,student',
            'phone' => 'required|string|max:20',
        ];

        // Ajouter les validations spécifiques pour les professeurs
        if ($request->role === 'teacher') {
            $validationRules['city_id'] = 'required|exists:cities,id';
            $validationRules['commune_id'] = 'required|exists:communes,id';
            $validationRules['neighborhood_id'] = 'required|exists:neighborhoods,id';
        }

        $request->validate($validationRules);

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone' => $request->phone,
            'status' => $request->role === 'teacher' ? 'pending' : 'active',
        ];

        $user = User::create($userData);

        // Si c'est un professeur, créer un profil avec les informations de localisation
        if ($user->role === 'teacher') {
            TeacherProfile::create([
                'user_id' => $user->id,
                'hourly_rate' => 0,
                'teaching_mode' => 'both',
                'city_id' => $request->city_id,
                'commune_id' => $request->commune_id,
                'neighborhood_id' => $request->neighborhood_id,
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        // Rediriger selon le rôle
        switch ($user->role) {
            case 'parent':
                return redirect()->route('parent.dashboard');
            case 'teacher':
                if ($user->status === 'pending') {
                    return redirect()->route('teacher.pending');
                }
                return redirect()->route('teacher.dashboard');
            case 'student':
                return redirect()->route('dashboard');
            default:
                return redirect()->route('dashboard');
        }
    }
}
