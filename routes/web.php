<?php

use Illuminate\Support\Facades\Route;

/*Route::get('/{any}', function () {
    return view('welcome'); // app.blade.phpを表示する
})->where('any', '.*');*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/chatgpt', function () {
    return view('chatgpt');
});
