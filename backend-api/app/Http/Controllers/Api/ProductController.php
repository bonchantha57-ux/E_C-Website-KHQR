<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of products with their category.
     * GET /api/products
     */
    public function index(Request $request)
    {
        $query = Product::with('category');

        // Optional filter by category_id
        if ($request->has('category_id')) {
            $query->where('category_id', $request->query('category_id'));
        }

        $products = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Products retrieved successfully',
            'count' => $products->count(),
            'data' => $products
        ], 200);
    }

    /**
     * Store a newly created product.
     * POST /api/products
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'required|string|max:150',
            'khmer_name' => 'nullable|string|max:150',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|string|url',
            'description' => 'nullable|string',
            'stock' => 'nullable|integer|min:0',
            'badge' => 'nullable|string|max:50',
            'rating' => 'nullable|numeric|between:0,5',
        ]);

        $product = Product::create($validated);
        $product->load('category');

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    /**
     * Display the specified product.
     * GET /api/products/{id}
     */
    public function show($id)
    {
        $product = Product::with('category')->find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product retrieved successfully',
            'data' => $product
        ], 200);
    }

    /**
     * Update the specified product.
     * PUT/PATCH /api/products/{id}
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'sometimes|required|string|max:150',
            'khmer_name' => 'nullable|string|max:150',
            'price' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'stock' => 'nullable|integer|min:0',
            'badge' => 'nullable|string|max:50',
            'rating' => 'nullable|numeric|between:0,5',
        ]);

        $product->update($validated);
        $product->load('category');

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $product
        ], 200);
    }

    /**
     * Remove the specified product.
     * DELETE /api/products/{id}
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ], 200);
    }
}
