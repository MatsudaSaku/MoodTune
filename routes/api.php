<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\JournalingController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\AnalysisController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/chat', [ChatController::class, 'sendMessage']);

Route::post('/journaling', [AnalysisController::class, 'analysisMessage']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:api')->group(function () {
    Route::post('/saveJournaling', [JournalingController::class, 'store']);
    Route::get('/showJournaling/{id}', [JournalingController::class, 'show']);
    Route::get('/showJournaling', [JournalingController::class, 'index']);
    Route::delete('/deleteJournaling/{id}',[JournalingController::class, 'destroy']);
});
