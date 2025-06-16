<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ErrorTestController;
use App\Http\Controllers\PagesController;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Routes pour les pages principales
Route::get('/favorites', [PagesController::class, 'favorites'])->name('favorites');
Route::get('/about', [PagesController::class, 'about'])->name('about');
Route::get('/contact', [PagesController::class, 'contact'])->name('contact');
Route::get('/articles', [PagesController::class, 'articles'])->name('articles');
Route::get('/services', [PagesController::class, 'services'])->name('services');

// Routes de test pour les pages d'erreur (uniquement en développement)
if (app()->environment(['local', 'testing'])) {
    Route::prefix('test-errors')->group(function () {
        Route::get('/', [ErrorTestController::class, 'index'])->name('errors.test.index');
        Route::get('/{code}', [ErrorTestController::class, 'show'])->name('errors.test.show')
            ->where('code', '[0-9]+');
    });
    
    // Route rapide pour accéder aux tests d'erreur
    Route::get('/dev-errors', function () {
        return redirect()->route('errors.test.index');
    })->name('dev.errors');
    
    // Route pour la démonstration du thème
    Route::get('/theme-demo', function () {
        return Inertia::render('theme-demo');
    })->name('theme.demo');
}

// Route temporaire pour la page de connexion (en attendant l'auth complète)
Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
