<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/chatgpt', function () {
    return view('chatgpt');
});

//Route::post('/api/chat', [App\Http\Controllers\ChatController::class, 'sendMessage']);