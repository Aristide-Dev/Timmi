<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // Gestion des utilisateurs
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::post('/users/{user}/approve', [AdminController::class, 'approveTeacher'])->name('users.approve');
    Route::post('/users/{user}/suspend', [AdminController::class, 'suspendUser'])->name('users.suspend');
    Route::post('/users/{user}/activate', [AdminController::class, 'activateUser'])->name('users.activate');
    
    // Gestion des réservations
    Route::get('/bookings', [AdminController::class, 'bookings'])->name('bookings');
    
    // Gestion des paiements
    Route::get('/payments', [AdminController::class, 'payments'])->name('payments');
    
    // Gestion des paiements aux professeurs
    Route::get('/payouts', [AdminController::class, 'payouts'])->name('payouts');
    Route::post('/payouts', [AdminController::class, 'createPayout'])->name('payouts.create');
    Route::post('/payouts/{payout}/complete', [AdminController::class, 'markPayoutCompleted'])->name('payouts.complete');
    
    // Paramètres
    Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
    Route::post('/settings', [AdminController::class, 'updateSettings'])->name('settings.update');
    
    // Publicités
    Route::get('/advertisements', [AdminController::class, 'advertisements'])->name('advertisements');
    
    // Rapports
    Route::get('/reports', [AdminController::class, 'reports'])->name('reports');
}); 