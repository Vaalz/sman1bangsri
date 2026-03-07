<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\GaleriController;
use App\Http\Controllers\Api\GuruController;
use App\Http\Controllers\Api\PrestasiController;
use App\Http\Controllers\Api\EkstrakurikulerController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\SambutanController;
use App\Http\Controllers\Api\TentangController;
use App\Http\Controllers\Api\AuthController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API Laravel jalan'
    ]);
});

// Authentication Routes
Route::post('/login', [AuthController::class, 'login']);

// Protected Auth Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::post('/change-email', [AuthController::class, 'changeEmail']);
});

// Superadmin Routes (protected)
Route::middleware(['auth:sanctum', 'superadmin'])->prefix('superadmin')->group(function () {
    Route::get('/admins', [AuthController::class, 'getAdmins']);
    Route::post('/admins', [AuthController::class, 'createAdmin']);
    Route::patch('/admins/{id}/status', [AuthController::class, 'updateAdminStatus']);
    Route::post('/admins/{id}/reset-password', [AuthController::class, 'resetAdminPassword']);
    Route::delete('/admins/{id}', [AuthController::class, 'deleteAdmin']);
    Route::delete('/admins/{id}', [AuthController::class, 'deleteAdmin']);
});

// API Routes for Admin Dashboard (Protected)
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    // Berita Routes
    Route::apiResource('berita', BeritaController::class);
    
    // Galeri Routes
    Route::apiResource('galeri', GaleriController::class);
    
    // Guru Routes
    Route::apiResource('guru', GuruController::class);
    
    // Prestasi Routes
    Route::apiResource('prestasi', PrestasiController::class);
    
    // Ekstrakurikuler Routes
    Route::apiResource('ekstrakurikuler', EkstrakurikulerController::class);
    
    // Course Routes
    Route::apiResource('courses', CourseController::class);
    
    // Sambutan Routes
    Route::apiResource('sambutan', SambutanController::class);
    
    // Tentang Routes
    Route::get('tentang', [TentangController::class, 'getCurrent']);
    Route::put('tentang', [TentangController::class, 'update']);
});

// Public API Routes (for frontend public pages)
Route::prefix('public')->group(function () {
    Route::get('berita', [BeritaController::class, 'index']);
    Route::get('berita/{id}', [BeritaController::class, 'show']);
    
    Route::get('galeri', [GaleriController::class, 'index']);
    Route::get('galeri/{id}', [GaleriController::class, 'show']);
    
    Route::get('guru', [GuruController::class, 'index']);
    Route::get('guru/{id}', [GuruController::class, 'show']);
    
    Route::get('prestasi', [PrestasiController::class, 'index']);
    Route::get('prestasi/{id}', [PrestasiController::class, 'show']);
    
    Route::get('ekstrakurikuler', [EkstrakurikulerController::class, 'index']);
    Route::get('ekstrakurikuler/{id}', [EkstrakurikulerController::class, 'show']);
    
    Route::get('courses', [CourseController::class, 'index']);
    Route::get('courses/{id}', [CourseController::class, 'show']);
    
    Route::get('sambutan', [SambutanController::class, 'getCurrent']);
    
    Route::get('tentang', [TentangController::class, 'show']);
});
