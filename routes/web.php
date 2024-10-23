<?php

use App\Http\Controllers\CreatePostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ViewPostController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Profile Controller
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

    // Create Post Controller
    Route::controller(CreatePostController::class)->group(function () {
        Route::get('/posts/create', 'create')->name('posts.create.page');
    });
});

// View Post Controller
Route::controller(ViewPostController::class)->group(function () {
    Route::get('/posts/{post}', 'view')->name('posts.view');
});

require __DIR__ . '/auth.php';
