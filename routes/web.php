<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::get('/auth/spotify/redirect', [AuthController::class, 'redirectToSpotify'])->name('spotify.redirect');

//Route::get('/api/callback', [AuthController::class, 'handleSpotifyCallback'])->name('spotify.callback');

Route::get('/auth/spotify/callback', [AuthController::class, 'handleSpotifyCallback'])->name('spotify.callback');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/Top', function () {
    return view('welcome');
});

Route::get('/chatgpt', function () {
    return view('chatgpt');
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
/*
Route::middleware('auth')->group(function () {
    Route::post('/api/refresh-token', [AuthController::class, 'refreshToken']);
});*/
