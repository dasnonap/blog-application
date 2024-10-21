<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts/create', [PostController::class, 'create']);

    Route::post('/posts/{post}/update', [PostController::class, 'update']);

    Route::post('/posts/{post}/delete', [PostController::class, 'delete']);
});
