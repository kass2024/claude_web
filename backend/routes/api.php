<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\ConsultationRequestAdminController;
use App\Http\Controllers\Admin\ContactMessageAdminController;
use App\Http\Controllers\Admin\PostAdminController;
use App\Http\Controllers\Admin\ProjectAdminController;
use App\Http\Controllers\Admin\ServiceAdminController;
use App\Http\Controllers\Public\BlogPostController;
use App\Http\Controllers\Public\ConsultationRequestController;
use App\Http\Controllers\Public\ContactMessageController;
use App\Http\Controllers\Public\FaqController;
use App\Http\Controllers\Public\ProjectController;
use App\Http\Controllers\Public\ServiceController;
use App\Http\Controllers\Public\SettingController;
use App\Http\Controllers\Public\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service:slug}', [ServiceController::class, 'show']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project:slug}', [ProjectController::class, 'show']);

Route::get('/posts', [BlogPostController::class, 'index']);
Route::get('/posts/{post:slug}', [BlogPostController::class, 'show']);

Route::post('/contact', [ContactMessageController::class, 'store']);
Route::post('/consultation', [ConsultationRequestController::class, 'store']);
// POST /api/career-application will be added with file upload when career module is implemented.

Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/faqs', [FaqController::class, 'index']);
Route::get('/settings', [SettingController::class, 'index']);

Route::prefix('/admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AdminAuthController::class, 'me']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        Route::apiResource('services', ServiceAdminController::class);
        Route::apiResource('projects', ProjectAdminController::class);
        Route::apiResource('posts', PostAdminController::class);

        Route::get('/contact-messages', [ContactMessageAdminController::class, 'index']);
        Route::get('/contact-messages/{contactMessage}', [ContactMessageAdminController::class, 'show']);

        Route::get('/consultation-requests', [ConsultationRequestAdminController::class, 'index']);
        Route::get('/consultation-requests/{consultationRequest}', [ConsultationRequestAdminController::class, 'show']);
    });
});

