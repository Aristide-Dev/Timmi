<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicController;

Route::get('/', [PublicController::class, 'home'])->name('home');

// Routes publiques
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/how-it-works', [PublicController::class, 'howItWorks'])->name('how-it-works');
Route::get('/faq', [PublicController::class, 'faq'])->name('faq');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::post('/contact', [PublicController::class, 'contactSubmit'])->name('contact.submit');
Route::get('/become-teacher', [PublicController::class, 'becomeTeacher'])->name('become-teacher');
Route::get('/pricing', [PublicController::class, 'pricing'])->name('pricing');
Route::get('/safety', [PublicController::class, 'safety'])->name('safety');
Route::get('/terms', [PublicController::class, 'terms'])->name('terms');
Route::get('/privacy', [PublicController::class, 'privacy'])->name('privacy');
Route::get('/cookies', [PublicController::class, 'cookies'])->name('cookies');
Route::get('/disclaimer', [PublicController::class, 'disclaimer'])->name('disclaimer');

// Pages de professeurs et matières
Route::get('/teachers', [PublicController::class, 'teachers'])->name('teachers');
Route::get('/teachers/{teacher}', [PublicController::class, 'teacherShow'])->name('teacher.show');
Route::get('/subjects', [PublicController::class, 'subjects'])->name('subjects');

// Documentation
Route::get('/docs', [PublicController::class, 'docs'])->name('docs');

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

    // Notifications (accessible à tous les utilisateurs authentifiés)
    Route::get('/notifications', function () {
        return Inertia::render('notifications');
    })->name('notifications');
});

// Routes spécifiques par rôle
require __DIR__.'/parent.php';
require __DIR__.'/teacher.php';
require __DIR__.'/admin.php';

// Routes de paramètres et d'authentification
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
