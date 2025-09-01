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

Route::middleware('auth')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Routes pour l'administration
Route::middleware(['auth', 'verified', 'admin', 'verified.phone'])->prefix('admin')->name('admin.')->group(function () {
    // Routes pour les rôles
    Route::resource('roles', \App\Http\Controllers\Admin\RoleController::class);
    
    // Routes pour la gestion des rôles utilisateur
    Route::get('user-roles', [\App\Http\Controllers\Admin\UserRoleController::class, 'index'])->name('user-roles.index');
    Route::get('user-roles/{user}/edit', [\App\Http\Controllers\Admin\UserRoleController::class, 'edit'])->name('user-roles.edit');
    Route::put('user-roles/{user}', [\App\Http\Controllers\Admin\UserRoleController::class, 'update'])->name('user-roles.update');
    Route::post('user-roles/{user}/add-role', [\App\Http\Controllers\Admin\UserRoleController::class, 'addRole'])->name('user-roles.add-role');
    Route::delete('user-roles/{user}/remove-role', [\App\Http\Controllers\Admin\UserRoleController::class, 'removeRole'])->name('user-roles.remove-role');

    // Routes pour la localisation
    Route::prefix('locations')->name('locations.')->group(function () {
        // Routes pour les villes
        Route::get('cities', [\App\Http\Controllers\Admin\LocationController::class, 'cities'])->name('cities.index');
        Route::get('cities/create', [\App\Http\Controllers\Admin\LocationController::class, 'createCity'])->name('cities.create');
        Route::post('cities', [\App\Http\Controllers\Admin\LocationController::class, 'storeCity'])->name('cities.store');
        Route::get('cities/{city}/edit', [\App\Http\Controllers\Admin\LocationController::class, 'editCity'])->name('cities.edit');
        Route::put('cities/{city}', [\App\Http\Controllers\Admin\LocationController::class, 'updateCity'])->name('cities.update');
        Route::delete('cities/{city}', [\App\Http\Controllers\Admin\LocationController::class, 'destroyCity'])->name('cities.destroy');

        // Routes pour les quartiers
        Route::get('neighborhoods', [\App\Http\Controllers\Admin\LocationController::class, 'neighborhoods'])->name('neighborhoods.index');
        Route::get('neighborhoods/create', [\App\Http\Controllers\Admin\LocationController::class, 'createNeighborhood'])->name('neighborhoods.create');
        Route::post('neighborhoods', [\App\Http\Controllers\Admin\LocationController::class, 'storeNeighborhood'])->name('neighborhoods.store');
        Route::get('neighborhoods/{neighborhood}/edit', [\App\Http\Controllers\Admin\LocationController::class, 'editNeighborhood'])->name('neighborhoods.edit');
        Route::put('neighborhoods/{neighborhood}', [\App\Http\Controllers\Admin\LocationController::class, 'updateNeighborhood'])->name('neighborhoods.update');
        Route::delete('neighborhoods/{neighborhood}', [\App\Http\Controllers\Admin\LocationController::class, 'destroyNeighborhood'])->name('neighborhoods.destroy');

        // API routes
        Route::get('neighborhoods-by-city', [\App\Http\Controllers\Admin\LocationController::class, 'getNeighborhoodsByCity'])->name('neighborhoods.by-city');
    });

    // Routes pour l'éducation
    Route::prefix('education')->name('education.')->group(function () {
        // Routes pour les cycles
        Route::get('cycles', [\App\Http\Controllers\Admin\EducationController::class, 'cycles'])->name('cycles.index');
        Route::get('cycles/create', [\App\Http\Controllers\Admin\EducationController::class, 'createCycle'])->name('cycles.create');
        Route::post('cycles', [\App\Http\Controllers\Admin\EducationController::class, 'storeCycle'])->name('cycles.store');
        Route::get('cycles/{cycle}/edit', [\App\Http\Controllers\Admin\EducationController::class, 'editCycle'])->name('cycles.edit');
        Route::put('cycles/{cycle}', [\App\Http\Controllers\Admin\EducationController::class, 'updateCycle'])->name('cycles.update');
        Route::delete('cycles/{cycle}', [\App\Http\Controllers\Admin\EducationController::class, 'destroyCycle'])->name('cycles.destroy');

        // Routes pour les niveaux
        Route::get('levels', [\App\Http\Controllers\Admin\EducationController::class, 'levels'])->name('levels.index');
        Route::get('levels/create', [\App\Http\Controllers\Admin\EducationController::class, 'createLevel'])->name('levels.create');
        Route::post('levels', [\App\Http\Controllers\Admin\EducationController::class, 'storeLevel'])->name('levels.store');
        Route::get('levels/{level}/edit', [\App\Http\Controllers\Admin\EducationController::class, 'editLevel'])->name('levels.edit');
        Route::put('levels/{level}', [\App\Http\Controllers\Admin\EducationController::class, 'updateLevel'])->name('levels.update');
        Route::delete('levels/{level}', [\App\Http\Controllers\Admin\EducationController::class, 'destroyLevel'])->name('levels.destroy');

        // Routes pour les matières
        Route::get('subjects', [\App\Http\Controllers\Admin\EducationController::class, 'subjects'])->name('subjects.index');
        Route::get('subjects/create', [\App\Http\Controllers\Admin\EducationController::class, 'createSubject'])->name('subjects.create');
        Route::post('subjects', [\App\Http\Controllers\Admin\EducationController::class, 'storeSubject'])->name('subjects.store');
        Route::get('subjects/{subject}/edit', [\App\Http\Controllers\Admin\EducationController::class, 'editSubject'])->name('subjects.edit');
        Route::put('subjects/{subject}', [\App\Http\Controllers\Admin\EducationController::class, 'updateSubject'])->name('subjects.update');
        Route::delete('subjects/{subject}', [\App\Http\Controllers\Admin\EducationController::class, 'destroySubject'])->name('subjects.destroy');

        // API routes
        Route::get('levels-by-cycle', [\App\Http\Controllers\Admin\EducationController::class, 'getLevelsByCycle'])->name('levels.by-cycle');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
