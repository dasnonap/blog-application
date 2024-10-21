<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {

    // Posts Controller
    Route::controller(PostController::class)->group(function () {
        Route::post('/posts/create', 'create')->name('posts.create');

        Route::post('/posts/{post}/update', 'update')->name('posts.update');

        Route::post('/posts/{post}/delete', 'delete')->name('posts.delete');
    });

    // Comments Controller
    Route::controller(CommentController::class)->group(function () {
        Route::post('/posts/{post}/comment', 'create')->name('posts.comment.create');
    });
});
