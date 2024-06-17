<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\JournalingController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\AnalysisController;
//Route::get('/auth/spotify/redirect', [AuthController::class, 'redirectToSpotify'])->name('spotify.redirect');
//Route::get('/api/callback', [AuthController::class, 'handleSpotifyCallback'])->name('spotify.callback');
//Route::get('/callback', [AuthController::class, 'handleSpotifyCallback'])->name('spotify.callback');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/chat', [ChatController::class, 'sendMessage']);

Route::post('/journaling', [AnalysisController::class, 'analysisMessage']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/refresh-token', [AuthController::class, 'refreshToken']);

/*Route::middleware('auth')->group(function () {
    Route::post('/refresh-token', [AuthController::class, 'refreshToken']);
});*/

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout']);

//Route::post('/saveJournaling',[JournalingController::class, 'store']);

Route::middleware('auth:api')->group(function () {
    Route::post('/saveJournaling', [JournalingController::class, 'store']);
});