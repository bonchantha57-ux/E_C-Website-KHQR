<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Categories
        $computers = Category::create([
            'name' => 'Computers',
            'description' => 'High performance desktop and laptop computers'
        ]);

        $accessories = Category::create([
            'name' => 'Accessories',
            'description' => 'Essential computer peripherals and gaming accessories'
        ]);

        $displays = Category::create([
            'name' => 'Displays',
            'description' => 'Ultra-sharp FHD and 4K monitors and screens'
        ]);

        // 2. Create the 4 Products from Practical Exercise
        Product::create([
            'category_id' => $computers->id,
            'name' => 'Laptop',
            'khmer_name' => 'កុំព្យូទ័រយួរដៃ (Laptop)',
            'price' => 650.00,
            'image' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
            'description' => 'High-performance laptop with 15.6" FHD display, Intel Core i5, 16GB RAM, 512GB NVMe SSD.',
            'stock' => 15,
            'badge' => 'Popular',
            'rating' => 4.8
        ]);

        Product::create([
            'category_id' => $accessories->id,
            'name' => 'Mouse',
            'khmer_name' => 'កណ្ដុរឥតខ្សែ (Mouse)',
            'price' => 15.00,
            'image' => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
            'description' => 'Ergonomic wireless optical mouse with 2.4GHz USB receiver, silent clicks and long battery life.',
            'stock' => 45,
            'badge' => 'Best Seller',
            'rating' => 4.6
        ]);

        Product::create([
            'category_id' => $accessories->id,
            'name' => 'Keyboard',
            'khmer_name' => 'ក្ដារចុចមេកានិច (Keyboard)',
            'price' => 25.00,
            'image' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
            'description' => 'Custom mechanical keyboard with RGB backlighting, tactile blue switches, and durable keycaps.',
            'stock' => 30,
            'badge' => 'Gaming',
            'rating' => 4.7
        ]);

        Product::create([
            'category_id' => $displays->id,
            'name' => 'Monitor',
            'khmer_name' => 'អេក្រង់កុំព្យូទ័រ (Monitor)',
            'price' => 120.00,
            'image' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
            'description' => '27-inch Full HD (1920x1080) IPS ultra-slim frameless monitor, 75Hz refresh rate with HDMI & VGA.',
            'stock' => 12,
            'badge' => 'Featured',
            'rating' => 4.9
        ]);
    }
}
