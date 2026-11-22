@extends('admin.layout')

@section('title', 'Dashboard Overview')
@section('page-title', 'Dashboard Overview (ផ្ទាំងគ្រប់គ្រងទូទៅ)')

@section('content')
<div class="space-y-6">

    <!-- 4 Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Total Products -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Products</span>
                <div class="text-2xl font-black text-slate-900 mt-1">{{ $totalProducts }}</div>
                <span class="text-[11px] text-blue-600 font-semibold mt-1 inline-block">Active in Catalog</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-xs">
                <i class="fa-solid fa-box-open"></i>
            </div>
        </div>

        <!-- Total Categories -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Categories</span>
                <div class="text-2xl font-black text-slate-900 mt-1">{{ $totalCategories }}</div>
                <span class="text-[11px] text-indigo-600 font-semibold mt-1 inline-block">Product Groups</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shadow-xs">
                <i class="fa-solid fa-layer-group"></i>
            </div>
        </div>

        <!-- Total Stock -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Stock</span>
                <div class="text-2xl font-black text-slate-900 mt-1">{{ number_format($totalStock) }} <span class="text-xs text-slate-400 font-medium">units</span></div>
                <span class="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">In-stock Inventory</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shadow-xs">
                <i class="fa-solid fa-warehouse"></i>
            </div>
        </div>

        <!-- Inventory Value -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Inventory Value</span>
                <div class="text-2xl font-black text-slate-900 mt-1">${{ number_format($totalInventoryValue, 2) }}</div>
                <span class="text-[11px] text-amber-600 font-semibold mt-1 inline-block">Estimated Total Value</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shadow-xs">
                <i class="fa-solid fa-coins"></i>
            </div>
        </div>
    </div>

    <!-- Quick Action Bar -->
    <div class="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
            <h3 class="text-base font-bold text-white">Quick Administration Actions</h3>
            <p class="text-xs text-slate-300 mt-0.5">Manage your MySQL database models, products, categories, or test API responses live.</p>
        </div>
        <div class="flex items-center gap-2.5 flex-wrap">
            <a href="{{ route('admin.products') }}" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5">
                <i class="fa-solid fa-plus"></i> Add Product
            </a>
            <a href="{{ route('admin.categories') }}" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5">
                <i class="fa-solid fa-plus"></i> Add Category
            </a>
            <a href="{{ route('admin.api-tester') }}" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5">
                <i class="fa-solid fa-bolt"></i> Test API Live
            </a>
        </div>
    </div>

    <!-- 2 Column Layout: Recent Products & Categories Breakdown -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Left: Recent Products Table (8 cols) -->
        <div class="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                    <h3 class="text-base font-bold text-slate-900">Current Catalog Products</h3>
                    <p class="text-xs text-slate-500">Products saved in MySQL database (from Practical Exercise 1)</p>
                </div>
                <a href="{{ route('admin.products') }}" class="text-xs text-blue-600 hover:underline font-bold">View All &rarr;</a>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead class="text-slate-400 uppercase text-[10px] font-bold border-b border-slate-100 bg-slate-50/50">
                        <tr>
                            <th class="py-2.5 px-3">Product</th>
                            <th class="py-2.5 px-3">Category</th>
                            <th class="py-2.5 px-3 text-right">Price</th>
                            <th class="py-2.5 px-3 text-center">Stock</th>
                            <th class="py-2.5 px-3 text-center">Rating</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($recentProducts as $prod)
                        <tr class="hover:bg-slate-50/60 transition-colors">
                            <td class="py-3 px-3">
                                <div class="flex items-center gap-3">
                                    <img src="{{ $prod->image }}" alt="{{ $prod->name }}" class="w-9 h-9 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0">
                                    <div>
                                        <span class="font-bold text-slate-900 block">{{ $prod->name }}</span>
                                        <span class="text-[11px] text-blue-700 font-semibold">{{ $prod->khmer_name }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-3">
                                <span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">
                                    {{ $prod->category->name ?? 'Uncategorized' }}
                                </span>
                            </td>
                            <td class="py-3 px-3 text-right font-bold text-slate-900">
                                ${{ number_format($prod->price, 2) }}
                            </td>
                            <td class="py-3 px-3 text-center font-bold text-slate-700">
                                <span class="px-2 py-0.5 rounded-full text-[10px] {{ $prod->stock > 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700' }}">
                                    {{ $prod->stock }} units
                                </span>
                            </td>
                            <td class="py-3 px-3 text-center font-bold text-amber-500">
                                <i class="fa-solid fa-star text-[10px]"></i> {{ $prod->rating }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Right: Categories Breakdown (4 cols) -->
        <div class="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 class="text-base font-bold text-slate-900">Categories Distribution</h3>
                <a href="{{ route('admin.categories') }}" class="text-xs text-blue-600 hover:underline font-bold">Manage &rarr;</a>
            </div>

            <div class="space-y-3.5">
                @foreach($categories as $cat)
                <div>
                    <div class="flex justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>{{ $cat->name }}</span>
                        <span class="text-slate-500">{{ $cat->products_count }} {{ $cat->products_count === 1 ? 'item' : 'items' }}</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        @php
                            $percentage = $totalProducts > 0 ? ($cat->products_count / $totalProducts) * 100 : 0;
                        @endphp
                        <div class="bg-blue-600 h-2 rounded-full transition-all" style="width: {{ $percentage }}%"></div>
                    </div>
                    <p class="text-[11px] text-slate-400 mt-0.5 truncate">{{ $cat->description }}</p>
                </div>
                @endforeach
            </div>

            <div class="pt-4 border-t border-slate-100">
                <a href="{{ route('admin.api-tester') }}" class="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                    <i class="fa-solid fa-code text-indigo-600"></i>
                    <span>Open API Explorer (មើល API)</span>
                </a>
            </div>
        </div>
    </div>
</div>
@endsection
