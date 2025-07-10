<?php

use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:teacher'])->prefix('teacher')->name('teacher.')->group(function () {
    Route::get('/pending', [TeacherController::class, 'pending'])->name('pending');
    
    Route::middleware(['teacher.status'])->group(function () {
        Route::get('/dashboard', [TeacherController::class, 'dashboard'])->name('dashboard');
        Route::get('/profile', [TeacherController::class, 'profile'])->name('profile');
        Route::post('/profile', [TeacherController::class, 'updateProfile'])->name('profile.update');
        Route::get('/profile/complete', [TeacherController::class, 'profile'])->name('profile.complete');
        Route::get('/availabilities', [TeacherController::class, 'availabilities'])->name('availabilities');
        Route::post('/availabilities', [TeacherController::class, 'storeAvailability'])->name('availabilities.store');
        Route::get('/calendar', [TeacherController::class, 'calendar'])->name('calendar');
        Route::get('/bookings', [TeacherController::class, 'bookings'])->name('bookings');
        Route::post('/bookings/{booking}/confirm', [TeacherController::class, 'confirmClass'])->name('bookings.confirm');
        Route::get('/earnings', [TeacherController::class, 'earnings'])->name('earnings');
    });
}); 