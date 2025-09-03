<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ErrorTestController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PagesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


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
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
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

// Routes pour les Parents
Route::middleware(['auth', 'role:parent'])->prefix('parent')->name('parent.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [App\Http\Controllers\Parent\DashboardController::class, 'index'])->name('dashboard');
    
    // Recherche de professeurs
    Route::get('/search/professors', [App\Http\Controllers\Parent\SearchController::class, 'professors'])->name('search.professors');
    
    // Profils des professeurs
    Route::get('/professors/{professor}', [App\Http\Controllers\Parent\ProfessorController::class, 'show'])->name('professors.show');
    
    // Réservations
    Route::get('/bookings', [App\Http\Controllers\Parent\BookingController::class, 'index'])->name('bookings.index');
    Route::get('/booking/create', [App\Http\Controllers\Parent\BookingController::class, 'create'])->name('booking.create');
    Route::post('/booking', [App\Http\Controllers\Parent\BookingController::class, 'store'])->name('booking.store');
    Route::get('/bookings/{booking}', [App\Http\Controllers\Parent\BookingController::class, 'show'])->name('bookings.show');
    Route::get('/bookings/{booking}/edit', [App\Http\Controllers\Parent\BookingController::class, 'edit'])->name('bookings.edit');
    Route::put('/bookings/{booking}', [App\Http\Controllers\Parent\BookingController::class, 'update'])->name('bookings.update');
    Route::post('/bookings/{booking}/cancel', [App\Http\Controllers\Parent\BookingController::class, 'cancel'])->name('bookings.cancel');
    
    // Gestion des enfants
    Route::get('/children', [App\Http\Controllers\Parent\ChildController::class, 'index'])->name('children.index');
    Route::get('/children/create', [App\Http\Controllers\Parent\ChildController::class, 'create'])->name('children.create');
    Route::post('/children', [App\Http\Controllers\Parent\ChildController::class, 'store'])->name('children.store');
    Route::get('/children/{child}/edit', [App\Http\Controllers\Parent\ChildController::class, 'edit'])->name('children.edit');
    Route::put('/children/{child}', [App\Http\Controllers\Parent\ChildController::class, 'update'])->name('children.update');
    Route::delete('/children/{child}', [App\Http\Controllers\Parent\ChildController::class, 'destroy'])->name('children.destroy');
    
    // Profil parent
    Route::get('/profile', [App\Http\Controllers\Parent\ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/edit', [App\Http\Controllers\Parent\ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [App\Http\Controllers\Parent\ProfileController::class, 'update'])->name('profile.update');
    
    // Sessions
    Route::get('/sessions/{session}/join', [App\Http\Controllers\Parent\SessionController::class, 'join'])->name('sessions.join');
    Route::post('/sessions/{session}/cancel', [App\Http\Controllers\Parent\SessionController::class, 'cancel'])->name('sessions.cancel');
    
    // Feedback
    Route::get('/feedback', [App\Http\Controllers\Parent\FeedbackController::class, 'index'])->name('feedback.index');
    Route::post('/feedback', [App\Http\Controllers\Parent\FeedbackController::class, 'store'])->name('feedback.store');
});

// Routes pour les Professeurs
Route::middleware(['auth', 'role:professor'])->prefix('professor')->name('professor.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [App\Http\Controllers\Professor\DashboardController::class, 'index'])->name('dashboard');
    
    // Profil professeur
    Route::get('/profile', [App\Http\Controllers\Professor\ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/edit', [App\Http\Controllers\Professor\ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [App\Http\Controllers\Professor\ProfileController::class, 'update'])->name('profile.update');
    
    // Gestion des matières et niveaux
    Route::get('/subjects', [App\Http\Controllers\Professor\SubjectController::class, 'index'])->name('subjects.index');
    Route::post('/subjects', [App\Http\Controllers\Professor\SubjectController::class, 'store'])->name('subjects.store');
    Route::delete('/subjects/{subject}', [App\Http\Controllers\Professor\SubjectController::class, 'destroy'])->name('subjects.destroy');
    
    Route::get('/levels', [App\Http\Controllers\Professor\LevelController::class, 'index'])->name('levels.index');
    Route::post('/levels', [App\Http\Controllers\Professor\LevelController::class, 'store'])->name('levels.store');
    Route::delete('/levels/{level}', [App\Http\Controllers\Professor\LevelController::class, 'destroy'])->name('levels.destroy');
    
    // Gestion des zones géographiques
    Route::get('/zones', [App\Http\Controllers\Professor\ZoneController::class, 'index'])->name('zones.index');
    Route::post('/zones', [App\Http\Controllers\Professor\ZoneController::class, 'store'])->name('zones.store');
    Route::delete('/zones/{city}', [App\Http\Controllers\Professor\ZoneController::class, 'destroy'])->name('zones.destroy');
    
    // Gestion de l'agenda et disponibilités
    Route::get('/schedule', [App\Http\Controllers\Professor\ScheduleController::class, 'index'])->name('schedule.index');
    Route::post('/schedule', [App\Http\Controllers\Professor\ScheduleController::class, 'store'])->name('schedule.store');
    Route::put('/schedule/{availability}', [App\Http\Controllers\Professor\ScheduleController::class, 'update'])->name('schedule.update');
    Route::delete('/schedule/{availability}', [App\Http\Controllers\Professor\ScheduleController::class, 'destroy'])->name('schedule.destroy');
    
    // Gestion des réservations
    Route::get('/bookings', [App\Http\Controllers\Professor\BookingController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{booking}', [App\Http\Controllers\Professor\BookingController::class, 'show'])->name('bookings.show');
    Route::post('/bookings/{booking}/confirm', [App\Http\Controllers\Professor\BookingController::class, 'confirm'])->name('bookings.confirm');
    Route::post('/bookings/{booking}/mark-completed', [App\Http\Controllers\Professor\BookingController::class, 'markCompleted'])->name('bookings.mark-completed');
    Route::post('/bookings/{booking}/cancel', [App\Http\Controllers\Professor\BookingController::class, 'cancel'])->name('bookings.cancel');
    
    // Gestion des revenus
    Route::get('/earnings', [App\Http\Controllers\Professor\EarningController::class, 'index'])->name('earnings.index');
    Route::get('/earnings/statistics', [App\Http\Controllers\Professor\EarningController::class, 'statistics'])->name('earnings.statistics');
    
    // Gestion des certificats
    Route::get('/certificates', [App\Http\Controllers\Professor\CertificateController::class, 'index'])->name('certificates.index');
    Route::post('/certificates', [App\Http\Controllers\Professor\CertificateController::class, 'store'])->name('certificates.store');
    Route::delete('/certificates/{certificate}', [App\Http\Controllers\Professor\CertificateController::class, 'destroy'])->name('certificates.destroy');
    
    // Sessions
    Route::get('/sessions/{session}/join', [App\Http\Controllers\Professor\SessionController::class, 'join'])->name('sessions.join');
    Route::post('/sessions/{session}/cancel', [App\Http\Controllers\Professor\SessionController::class, 'cancel'])->name('sessions.cancel');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
