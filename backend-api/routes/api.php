<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes for RGB Store (Laravel Backend)
|--------------------------------------------------------------------------
| 2 Core Database APIs:
| 1. Categories API: /api/categories
| 2. Products API:   /api/products
*/

Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
