<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Subject;
use App\Models\User;

Route::get('/', function () {
    $subjects = Subject::active()->ordered()->limit(8)->get();
    $featuredTeachers = User::where('role', 'teacher')
        ->where('status', 'active')
        ->whereHas('teacherProfile', function($q) {
            $q->where('is_verified', true)
              ->where('rating', '>=', 4);
        })
        ->with(['teacherProfile', 'subjects'])
        ->inRandomOrder()
        ->limit(6)
        ->get();
    
    return Inertia::render('welcome', [
        'subjects' => $subjects,
        'featuredTeachers' => $featuredTeachers,
    ]);
})->name('home');

// Redirection du dashboard principal selon le rôle
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        switch ($user->role) {
            case 'admin':
                return redirect()->route('admin.dashboard');
            case 'parent':
                return redirect()->route('parent.dashboard');
            case 'teacher':
                if ($user->status === 'pending') {
                    return redirect()->route('teacher.pending');
                }
                return redirect()->route('teacher.dashboard');
            default:
                abort(403, 'Rôle non reconnu');
        }
    })->name('dashboard');
});

// Routes spécifiques par rôle
require __DIR__.'/parent.php';
require __DIR__.'/teacher.php';
require __DIR__.'/admin.php';

// Routes de paramètres et d'authentification
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
