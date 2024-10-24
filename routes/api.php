<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// Posts Open Controller
Route::get('/posts/{post}/comments', [PostController::class, 'comments'])->name('posts.comments');

Route::get('/posts', [PostController::class, 'index'])->name('posts.index');

Route::middleware('auth:sanctum')->group(function () {
    // Posts Controller
    Route::controller(PostController::class)->group(function () {
        Route::post('/posts/create', 'create')->name('posts.create');

        Route::post('/posts/{post}/update', 'update')->name('posts.update');

        Route::post('/posts/{post}/delete', 'delete')->name('posts.delete');
    });

    // Comments Controller
    Route::controller(CommentController::class)->group(function () {
        Route::post('/posts/{post}/comments', 'create')->name('posts.comment.create');

        Route::post('/comments/{comment}/approve', 'approve')->name('comments.approve');

        Route::post('/comments/{comment}/delete', 'delete')->name('comments.delete');
    });

    // Author Controller
    Route::controller(AuthorController::class)->group(function () {
        Route::get('/user/comments', 'index')->name('user.comments');
    });
});
