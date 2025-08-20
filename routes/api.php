<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\City;
use App\Models\Commune;
use App\Models\Neighborhood;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes pour les localités
Route::get('/cities', function () {
    return City::active()->get();
});

Route::get('/cities/{city}/communes', function (City $city) {
    return $city->communes()->active()->get();
});

Route::get('/communes/{commune}/neighborhoods', function (Commune $commune) {
    return $commune->neighborhoods()->active()->get();
});
