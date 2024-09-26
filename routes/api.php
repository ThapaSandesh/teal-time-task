<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication Api

Route::controller(AuthController::class)->group(function(){
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::controller(ProjectController::class)->group(function(){
    Route::post('/projects','store');
    Route::put('/projects', 'update');
    Route::get('/projects','index');
    Route::post('/projects/pinned', 'pinnedProject');
});

Route::controller(MemberController::class)->group(function(){
    Route::post('/members','store');
    Route::put('/members', 'update');
    Route::get('/members','index');
});

Route::controller(TaskController::class)->group(function(){
    Route::post('/tasks','createTask');
    // Route::put('/members', 'update');
    // Route::get('/members','index');
});



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
