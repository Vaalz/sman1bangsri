<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\GaleriController;
use App\Http\Controllers\Api\GuruController;
use App\Http\Controllers\Api\PrestasiController;
use App\Http\Controllers\Api\EkstrakurikulerController;
use App\Http\Controllers\Api\CourseController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API Laravel jalan'
    ]);
});

// API Routes for Admin Dashboard
Route::prefix('admin')->group(function () {
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
});
