<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ErrorTestController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\TeacherSearchController;
use App\Http\Controllers\Parent\DashboardController as ParentDashboardController;
use App\Http\Controllers\Professor\DashboardController as ProfessorDashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProfessorController;
use App\Http\Controllers\Admin\ParentController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\SessionController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\EarningController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\DatabaseController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserRoleController;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Admin\EducationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [HomeController::class, 'index'])->name('home');

// Routes pour les pages principales
Route::get('/about', [PagesController::class, 'about'])->name('about');
Route::get('/contact', [PagesController::class, 'contact'])->name('contact');
Route::get('/faq', [PagesController::class, 'faq'])->name('faq');
Route::get('/terms', [PagesController::class, 'terms'])->name('terms');
Route::get('/privacy', [PagesController::class, 'privacy'])->name('privacy');

// Route pour la recherche de professeurs
Route::get('/search/teachers', [TeacherSearchController::class, 'index'])->name('search.teachers');

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
    // Routes pour les utilisateurs
    Route::resource('users', UserController::class);
    Route::post('users/{user}/toggle-verification', [UserController::class, 'toggleVerification'])->name('users.toggle-verification');
    Route::post('users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');
    Route::post('users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');

    // Routes pour les professeurs
    Route::get('professors', [ProfessorController::class, 'index'])->name('professors.index');
    Route::get('professors/{professor}', [ProfessorController::class, 'show'])->name('professors.show');
    Route::post('professors/{professor}/approve', [ProfessorController::class, 'approve'])->name('professors.approve');
    Route::post('professors/{professor}/reject', [ProfessorController::class, 'reject'])->name('professors.reject');
    Route::post('professors/{professor}/toggle-status', [ProfessorController::class, 'toggleStatus'])->name('professors.toggle-status');
    Route::post('professors/{professor}/update-subjects', [ProfessorController::class, 'updateSubjects'])->name('professors.update-subjects');
    Route::post('professors/{professor}/update-levels', [ProfessorController::class, 'updateLevels'])->name('professors.update-levels');
    Route::post('professors/{professor}/update-cities', [ProfessorController::class, 'updateCities'])->name('professors.update-cities');
    Route::post('professors/{professor}/update-hourly-rate', [ProfessorController::class, 'updateHourlyRate'])->name('professors.update-hourly-rate');

    // Routes pour les parents
    Route::get('parents', [ParentController::class, 'index'])->name('parents.index');
    Route::get('parents/{parent}', [ParentController::class, 'show'])->name('parents.show');
    Route::get('parents/{parent}/children', [ParentController::class, 'children'])->name('parents.children');
    Route::get('parents/{parent}/bookings', [ParentController::class, 'bookings'])->name('parents.bookings');
    Route::post('parents/{parent}/toggle-status', [ParentController::class, 'toggleStatus'])->name('parents.toggle-status');
    Route::delete('parents/{parent}', [ParentController::class, 'destroy'])->name('parents.destroy');

    // Routes pour les réservations
    Route::get('bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::get('bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
    Route::post('bookings/{booking}/update-status', [BookingController::class, 'updateStatus'])->name('bookings.update-status');
    Route::post('bookings/{booking}/update-payment-status', [BookingController::class, 'updatePaymentStatus'])->name('bookings.update-payment-status');
    Route::delete('bookings/{booking}', [BookingController::class, 'destroy'])->name('bookings.destroy');
    Route::get('bookings-stats', [BookingController::class, 'stats'])->name('bookings.stats');
    Route::get('bookings-export', [BookingController::class, 'export'])->name('bookings.export');

    // Routes pour les sessions
    Route::get('sessions', [SessionController::class, 'index'])->name('sessions.index');
    Route::get('sessions/{session}', [SessionController::class, 'show'])->name('sessions.show');
    Route::post('sessions/{session}/update-status', [SessionController::class, 'updateStatus'])->name('sessions.update-status');
    Route::post('sessions/{session}/add-notes', [SessionController::class, 'addNotes'])->name('sessions.add-notes');
    Route::delete('sessions/{session}', [SessionController::class, 'destroy'])->name('sessions.destroy');
    Route::get('sessions-stats', [SessionController::class, 'stats'])->name('sessions.stats');

    // Routes pour les paiements
    Route::get('payments', [PaymentController::class, 'index'])->name('payments.index');
    Route::get('payments/{payment}', [PaymentController::class, 'show'])->name('payments.show');
    Route::post('payments/{payment}/update-status', [PaymentController::class, 'updateStatus'])->name('payments.update-status');
    Route::post('payments/{payment}/refund', [PaymentController::class, 'refund'])->name('payments.refund');
    Route::post('payments/{payment}/cancel', [PaymentController::class, 'cancel'])->name('payments.cancel');
    Route::delete('payments/{payment}', [PaymentController::class, 'destroy'])->name('payments.destroy');
    Route::get('payments-stats', [PaymentController::class, 'stats'])->name('payments.stats');
    Route::get('payments-export', [PaymentController::class, 'export'])->name('payments.export');

    // Routes pour les revenus
    Route::get('earnings', [EarningController::class, 'index'])->name('earnings.index');
    Route::get('earnings/professor/{professor}', [EarningController::class, 'professor'])->name('earnings.professor');
    Route::get('earnings/period', [EarningController::class, 'period'])->name('earnings.period');
    Route::get('earnings-export', [EarningController::class, 'export'])->name('earnings.export');

    // Routes pour les avis
    Route::get('reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::get('reviews/{review}', [ReviewController::class, 'show'])->name('reviews.show');
    Route::post('reviews/{review}/moderate', [ReviewController::class, 'moderate'])->name('reviews.moderate');
    Route::post('reviews/{review}/toggle-verification', [ReviewController::class, 'toggleVerification'])->name('reviews.toggle-verification');
    Route::post('reviews/{review}/toggle-featured', [ReviewController::class, 'toggleFeatured'])->name('reviews.toggle-featured');
    Route::delete('reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
    Route::get('reviews-stats', [ReviewController::class, 'stats'])->name('reviews.stats');

    // Routes pour les feedbacks
    Route::get('feedback', [FeedbackController::class, 'index'])->name('feedback.index');
    Route::get('feedback/{feedback}', [FeedbackController::class, 'show'])->name('feedback.show');
    Route::post('feedback/{feedback}/respond', [FeedbackController::class, 'respond'])->name('feedback.respond');
    Route::post('feedback/{feedback}/resolve', [FeedbackController::class, 'resolve'])->name('feedback.resolve');
    Route::post('feedback/{feedback}/unresolve', [FeedbackController::class, 'unresolve'])->name('feedback.unresolve');
    Route::delete('feedback/{feedback}', [FeedbackController::class, 'destroy'])->name('feedback.destroy');
    Route::get('feedback-stats', [FeedbackController::class, 'stats'])->name('feedback.stats');

    // Routes pour les certificats
    Route::get('certificates', [CertificateController::class, 'index'])->name('certificates.index');
    Route::get('certificates/{certificate}', [CertificateController::class, 'show'])->name('certificates.show');
    Route::post('certificates/{certificate}/verify', [CertificateController::class, 'verify'])->name('certificates.verify');
    Route::get('certificates/{certificate}/download', [CertificateController::class, 'download'])->name('certificates.download');
    Route::delete('certificates/{certificate}', [CertificateController::class, 'destroy'])->name('certificates.destroy');
    Route::get('certificates-stats', [CertificateController::class, 'stats'])->name('certificates.stats');

    // Routes pour les analytics
    Route::get('analytics', [AnalyticsController::class, 'index'])->name('analytics.index');
    Route::get('analytics/detailed', [AnalyticsController::class, 'detailed'])->name('analytics.detailed');

    // Routes pour les rapports
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::post('reports/generate', [ReportController::class, 'generate'])->name('reports.generate');

    // Routes pour les paramètres
    Route::get('settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('settings/general', [SettingsController::class, 'updateGeneral'])->name('settings.update-general');
    Route::post('settings/email', [SettingsController::class, 'updateEmail'])->name('settings.update-email');
    Route::post('settings/sms', [SettingsController::class, 'updateSms'])->name('settings.update-sms');
    Route::post('settings/payment', [SettingsController::class, 'updatePayment'])->name('settings.update-payment');
    Route::post('settings/features', [SettingsController::class, 'updateFeatures'])->name('settings.update-features');
    Route::post('settings/limits', [SettingsController::class, 'updateLimits'])->name('settings.update-limits');
    Route::post('settings/test-email', [SettingsController::class, 'testEmail'])->name('settings.test-email');
    Route::post('settings/test-sms', [SettingsController::class, 'testSms'])->name('settings.test-sms');
    Route::post('settings/clear-cache', [SettingsController::class, 'clearCache'])->name('settings.clear-cache');

    // Routes pour la base de données
    Route::get('database', [DatabaseController::class, 'index'])->name('database.index');
    Route::post('database/backup', [DatabaseController::class, 'createBackup'])->name('database.backup');
    Route::post('database/restore', [DatabaseController::class, 'restoreBackup'])->name('database.restore');
    Route::post('database/optimize', [DatabaseController::class, 'optimize'])->name('database.optimize');
    Route::post('database/cleanup', [DatabaseController::class, 'cleanup'])->name('database.cleanup');

    // Routes pour les rôles
    Route::resource('roles', RoleController::class);
    
    // Routes pour la gestion des rôles utilisateur
    Route::get('user-roles', [UserRoleController::class, 'index'])->name('user-roles.index');
    Route::get('user-roles/{user}/edit', [UserRoleController::class, 'edit'])->name('user-roles.edit');
    Route::put('user-roles/{user}', [UserRoleController::class, 'update'])->name('user-roles.update');
    Route::post('user-roles/{user}/add-role', [UserRoleController::class, 'addRole'])->name('user-roles.add-role');
    Route::delete('user-roles/{user}/remove-role', [UserRoleController::class, 'removeRole'])->name('user-roles.remove-role');

    // Routes pour la localisation
    Route::prefix('locations')->name('locations.')->group(function () {
        // Routes pour les villes
        Route::get('cities', [LocationController::class, 'cities'])->name('cities.index');
        Route::get('cities/create', [LocationController::class, 'createCity'])->name('cities.create');
        Route::post('cities', [LocationController::class, 'storeCity'])->name('cities.store');
        Route::get('cities/{city}/edit', [LocationController::class, 'editCity'])->name('cities.edit');
        Route::put('cities/{city}', [LocationController::class, 'updateCity'])->name('cities.update');
        Route::delete('cities/{city}', [LocationController::class, 'destroyCity'])->name('cities.destroy');

        // Routes pour les quartiers
        Route::get('neighborhoods', [LocationController::class, 'neighborhoods'])->name('neighborhoods.index');
        Route::get('neighborhoods/create', [LocationController::class, 'createNeighborhood'])->name('neighborhoods.create');
        Route::post('neighborhoods', [LocationController::class, 'storeNeighborhood'])->name('neighborhoods.store');
        Route::get('neighborhoods/{neighborhood}/edit', [LocationController::class, 'editNeighborhood'])->name('neighborhoods.edit');
        Route::put('neighborhoods/{neighborhood}', [LocationController::class, 'updateNeighborhood'])->name('neighborhoods.update');
        Route::delete('neighborhoods/{neighborhood}', [LocationController::class, 'destroyNeighborhood'])->name('neighborhoods.destroy');

        // API routes
        Route::get('neighborhoods-by-city', [LocationController::class, 'getNeighborhoodsByCity'])->name('neighborhoods.by-city');
    });

    // Routes pour l'éducation
    Route::prefix('education')->name('education.')->group(function () {
        // Routes pour les cycles
        Route::get('cycles', [EducationController::class, 'cycles'])->name('cycles.index');
        Route::get('cycles/create', [EducationController::class, 'createCycle'])->name('cycles.create');
        Route::post('cycles', [EducationController::class, 'storeCycle'])->name('cycles.store');
        Route::get('cycles/{cycle}/edit', [EducationController::class, 'editCycle'])->name('cycles.edit');
        Route::put('cycles/{cycle}', [EducationController::class, 'updateCycle'])->name('cycles.update');
        Route::delete('cycles/{cycle}', [EducationController::class, 'destroyCycle'])->name('cycles.destroy');

        // Routes pour les niveaux
        Route::get('levels', [EducationController::class, 'levels'])->name('levels.index');
        Route::get('levels/create', [EducationController::class, 'createLevel'])->name('levels.create');
        Route::post('levels', [EducationController::class, 'storeLevel'])->name('levels.store');
        Route::get('levels/{level}/edit', [EducationController::class, 'editLevel'])->name('levels.edit');
        Route::put('levels/{level}', [EducationController::class, 'updateLevel'])->name('levels.update');
        Route::delete('levels/{level}', [EducationController::class, 'destroyLevel'])->name('levels.destroy');

        // Routes pour les matières
        Route::get('subjects', [EducationController::class, 'subjects'])->name('subjects.index');
        Route::get('subjects/create', [EducationController::class, 'createSubject'])->name('subjects.create');
        Route::post('subjects', [EducationController::class, 'storeSubject'])->name('subjects.store');
        Route::get('subjects/{subject}/edit', [EducationController::class, 'editSubject'])->name('subjects.edit');
        Route::put('subjects/{subject}', [EducationController::class, 'updateSubject'])->name('subjects.update');
        Route::delete('subjects/{subject}', [EducationController::class, 'destroySubject'])->name('subjects.destroy');

        // API routes
        Route::get('levels-by-cycle', [EducationController::class, 'getLevelsByCycle'])->name('levels.by-cycle');
    });
});

// Routes pour les Parents
Route::middleware(['auth', 'role:parent'])->prefix('parent')->name('parent.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [ParentDashboardController::class, 'index'])->name('dashboard');
    
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
    Route::get('/dashboard', [ProfessorDashboardController::class, 'index'])->name('dashboard');
    
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

// Routes pour les Étudiants
Route::middleware(['auth', 'role:student'])->prefix('student')->name('student.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [App\Http\Controllers\Student\DashboardController::class, 'index'])->name('dashboard');
    
    // Recherche de professeurs
    Route::get('/search/professors', [App\Http\Controllers\Student\SearchController::class, 'professors'])->name('search.professors');
    
    // Profils des professeurs
    Route::get('/professors/{professor}', [App\Http\Controllers\Student\ProfessorController::class, 'show'])->name('professors.show');
    
    // Réservations
    Route::get('/bookings', [App\Http\Controllers\Student\BookingController::class, 'index'])->name('bookings.index');
    Route::get('/booking/create', [App\Http\Controllers\Student\BookingController::class, 'create'])->name('booking.create');
    Route::post('/booking', [App\Http\Controllers\Student\BookingController::class, 'store'])->name('booking.store');
    Route::get('/bookings/{booking}', [App\Http\Controllers\Student\BookingController::class, 'show'])->name('bookings.show');
    Route::get('/bookings/{booking}/edit', [App\Http\Controllers\Student\BookingController::class, 'edit'])->name('bookings.edit');
    Route::put('/bookings/{booking}', [App\Http\Controllers\Student\BookingController::class, 'update'])->name('bookings.update');
    Route::post('/bookings/{booking}/cancel', [App\Http\Controllers\Student\BookingController::class, 'cancel'])->name('bookings.cancel');
    
    // Profil étudiant
    Route::get('/profile', [App\Http\Controllers\Student\ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/edit', [App\Http\Controllers\Student\ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [App\Http\Controllers\Student\ProfileController::class, 'update'])->name('profile.update');
    
    // Gestion des matières et niveaux préférés
    Route::get('/subjects', [App\Http\Controllers\Student\SubjectController::class, 'index'])->name('subjects.index');
    Route::post('/subjects', [App\Http\Controllers\Student\SubjectController::class, 'store'])->name('subjects.store');
    Route::delete('/subjects/{subject}', [App\Http\Controllers\Student\SubjectController::class, 'destroy'])->name('subjects.destroy');
    
    Route::get('/levels', [App\Http\Controllers\Student\LevelController::class, 'index'])->name('levels.index');
    Route::post('/levels', [App\Http\Controllers\Student\LevelController::class, 'store'])->name('levels.store');
    Route::delete('/levels/{level}', [App\Http\Controllers\Student\LevelController::class, 'destroy'])->name('levels.destroy');
    
    // Gestion des villes préférées
    Route::get('/cities', [App\Http\Controllers\Student\CityController::class, 'index'])->name('cities.index');
    Route::post('/cities', [App\Http\Controllers\Student\CityController::class, 'store'])->name('cities.store');
    Route::delete('/cities/{city}', [App\Http\Controllers\Student\CityController::class, 'destroy'])->name('cities.destroy');
    
    // Sessions
    Route::get('/sessions/{session}/join', [App\Http\Controllers\Student\SessionController::class, 'join'])->name('sessions.join');
    Route::post('/sessions/{session}/cancel', [App\Http\Controllers\Student\SessionController::class, 'cancel'])->name('sessions.cancel');
    
    // Feedback et avis
    Route::get('/feedback', [App\Http\Controllers\Student\FeedbackController::class, 'index'])->name('feedback.index');
    Route::post('/feedback', [App\Http\Controllers\Student\FeedbackController::class, 'store'])->name('feedback.store');
    
    // Avis sur les professeurs
    Route::get('/reviews', [App\Http\Controllers\Student\ReviewController::class, 'index'])->name('reviews.index');
    Route::post('/reviews', [App\Http\Controllers\Student\ReviewController::class, 'store'])->name('reviews.store');
    Route::get('/reviews/{review}/edit', [App\Http\Controllers\Student\ReviewController::class, 'edit'])->name('reviews.edit');
    Route::put('/reviews/{review}', [App\Http\Controllers\Student\ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{review}', [App\Http\Controllers\Student\ReviewController::class, 'destroy'])->name('reviews.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
