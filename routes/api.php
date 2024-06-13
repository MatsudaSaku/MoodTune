<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

//Route::get('/auth/spotify/redirect', [AuthController::class, 'redirectToSpotify'])->name('spotify.redirect');
//Route::get('/api/callback', [AuthController::class, 'handleSpotifyCallback'])->name('spotify.callback');
//Route::get('/callback', [AuthController::class, 'handleSpotifyCallback'])->name('spotify.callback');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/chat', [App\Http\Controllers\ChatController::class, 'sendMessage']);

Route::post('/journaling', [App\Http\Controllers\AnalysisController::class, 'analysisMessage']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/refresh-token', [AuthController::class, 'refreshToken']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout']);