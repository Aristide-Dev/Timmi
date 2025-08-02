<?php

use App\Http\Controllers\ParentController;
use App\Http\Controllers\BookingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:parent'])->prefix('parent')->name('parent.')->group(function () {
    Route::get('/dashboard', [ParentController::class, 'dashboard'])->name('dashboard');
    Route::get('/search', [ParentController::class, 'searchTeachers'])->name('search');
    Route::get('/search-teachers', [ParentController::class, 'searchTeachers'])->name('search-teachers'); // Alias pour la sidebar
    Route::get('/teacher/{teacher}', [ParentController::class, 'viewTeacher'])->name('teacher.view');
    Route::get('/children', [ParentController::class, 'children'])->name('children');
    Route::get('/bookings', [ParentController::class, 'bookings'])->name('bookings');
    Route::get('/payments', [ParentController::class, 'payments'])->name('payments');
    
    // Routes pour les réservations
    Route::get('/booking/create/{teacher}', [BookingController::class, 'create'])->name('booking.create');
    Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/booking/{booking}', [BookingController::class, 'show'])->name('booking.show');
    Route::post('/booking/{booking}/cancel', [BookingController::class, 'cancel'])->name('booking.cancel');
}); 