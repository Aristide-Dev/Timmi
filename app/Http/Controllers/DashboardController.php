<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        if($user->hasRole('parent')){
            return redirect()->route('parent.dashboard');
        }

        if($user->hasRole('professor')){
            return redirect()->route('professor.dashboard');
        }

        if($user->hasRole('admin') || $user->hasRole('super-admin')){
            return Inertia::render('dashboard', [
                'user' => $user,
            ]);
        }

        
    }
}
