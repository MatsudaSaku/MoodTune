<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/chat', [App\Http\Controllers\ChatController::class, 'sendMessage']);

Route::post('/journaling', [App\Http\Controllers\AnalysisController::class, 'analysisMessage']);