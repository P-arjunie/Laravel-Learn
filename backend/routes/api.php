<?php

//api.php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use App\Http\Controllers\EnrollmentController;

// Define your rate limiter for the API routes
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses', [CourseController::class, 'store'])->middleware('auth:sanctum');
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::put('/courses/{id}', [CourseController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->middleware('auth:sanctum');

// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/update-profile', [AuthController::class, 'updateProfile']);
// });

Route::middleware('auth:sanctum')->put('/update-profile', [AuthController::class, 'updateProfile']);

Route::middleware('auth:sanctum')->get('/user-details', [AuthController::class, 'getUserDetails']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/enroll', [EnrollmentController::class, 'enroll']);
    Route::get('/my-learning', [EnrollmentController::class, 'myLearning']);
});