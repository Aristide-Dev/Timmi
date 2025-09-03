<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Afficher le profil du parent
     */
    public function index()
    {
        $user = Auth::user();
        
        // Calculer les statistiques
        $stats = [
            'total_bookings' => $user->bookings()->count(),
            'active_bookings' => $user->bookings()->whereIn('status', ['pending', 'confirmed'])->count(),
            'completed_sessions' => $user->bookings()->where('status', 'completed')->count(),
            'total_spent' => $user->bookings()->where('payment_status', 'paid')->sum('total_price'),
        ];

        return Inertia::render('Parent/Profile/Index', [
            'user' => $user,
            'stats' => $stats
        ]);
    }

    /**
     * Afficher le formulaire d'édition du profil
     */
    public function edit()
    {
        return Inertia::render('Parent/Profile/Edit', [
            'user' => Auth::user()
        ]);
    }

    /**
     * Mettre à jour le profil
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'required|string|max:20|unique:users,phone,' . $user->id,
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'current_password' => 'nullable|string',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $data = $request->only(['name', 'email', 'phone']);

        // Gérer l'upload de l'avatar
        if ($request->hasFile('avatar')) {
            // Supprimer l'ancien avatar s'il existe
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $data['avatar'] = $request->file('avatar')->store('users/avatars', 'public');
        }

        // Gérer le changement de mot de passe
        if ($request->filled('password')) {
            if (!$request->filled('current_password') || !Hash::check($request->current_password, $user->password)) {
                return back()->withErrors(['current_password' => 'Le mot de passe actuel est incorrect.']);
            }
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->route('parent.profile.index')
            ->with('success', 'Profil mis à jour avec succès.');
    }
}
