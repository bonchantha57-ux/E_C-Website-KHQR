@extends('admin.layout')

@section('title', 'Products Management')
@section('page-title', 'Products Management (ការគ្រប់គ្រងផលិតផល)')

@section('content')
<div class="space-y-6">

    <!-- Top Action Bar & Filter -->
    <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h3 class="text-xl font-extrabold text-slate-900 tracking-tight">Products (បញ្ជីមុខទំនិញ)</h3>
            <p class="text-xs text-slate-500">Manage catalog products, stock quantity, pricing, and category mapping.</p>
        </div>

        <button onclick="document.getElementById('addProductModal').classList.remove('hidden')" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer">
            <i class="fa-solid fa-plus"></i>
            <span>Add New Product (បន្ថែមផលិតផលថ្មី)</span>
        </button>
    </div>

    <!-- Filter Bar -->
    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <form action="{{ route('admin.products') }}" method="GET" class="flex flex-wrap items-center gap-3 flex-1">
            <div class="relative flex-1 min-w-[200px] max-w-sm">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search products..." class="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            </div>

            <select name="category_id" onchange="this.form.submit()" class="px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 font-semibold text-slate-700">
                <option value="">All Categories</option>
                @foreach($categories as $cat)
                    <option value="{{ $cat->id }}" {{ request('category_id') == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                @endforeach
            </select>

            <button type="submit" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors">
                Filter
            </button>

            @if(request()->hasAny(['search', 'category_id']))
                <a href="{{ route('admin.products') }}" class="text-xs text-red-500 hover:underline font-bold">Clear Filters</a>
            @endif
        </form>

        <span class="text-xs text-slate-400 font-semibold">{{ $products->count() }} items found</span>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                        <th class="py-3 px-4"># ID</th>
                        <th class="py-3 px-4">Product Details</th>
                        <th class="py-3 px-4">Category</th>
                        <th class="py-3 px-4 text-right">Price ($)</th>
                        <th class="py-3 px-4 text-center">Stock Quantity</th>
                        <th class="py-3 px-4 text-center">Badge</th>
                        <th class="py-3 px-4 text-center">Rating</th>
                        <th class="py-3 px-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse($products as $product)
                    <tr class="hover:bg-slate-50/60 transition-colors">
                        <td class="py-3.5 px-4 font-mono font-bold text-slate-400">
                            #{{ $product->id }}
                        </td>
                        <td class="py-3.5 px-4">
                            <div class="flex items-center gap-3">
                                <img src="{{ $product->image }}" alt="{{ $product->name }}" class="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0">
                                <div class="min-w-0">
                                    <span class="font-extrabold text-slate-900 text-sm block truncate">{{ $product->name }}</span>
                                    <span class="text-[11px] text-blue-700 font-semibold block">{{ $product->khmer_name }}</span>
                                    <p class="text-[11px] text-slate-400 truncate max-w-xs">{{ $product->description }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="py-3.5 px-4">
                            <span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
                                {{ $product->category->name ?? 'Unassigned' }}
                            </span>
                        </td>
                        <td class="py-3.5 px-4 text-right font-black text-slate-900 text-sm">
                            ${{ number_format($product->price, 2) }}
                        </td>
                        <td class="py-3.5 px-4 text-center">
                            <span class="px-2.5 py-1 rounded-full text-xs font-bold {{ $product->stock > 10 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200' }}">
                                {{ $product->stock }} in stock
                            </span>
                        </td>
                        <td class="py-3.5 px-4 text-center">
                            @if($product->badge)
                                <span class="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-indigo-200">
                                    {{ $product->badge }}
                                </span>
                            @else
                                <span class="text-slate-300">-</span>
                            @endif
                        </td>
                        <td class="py-3.5 px-4 text-center font-bold text-amber-500">
                            <i class="fa-solid fa-star text-[10px]"></i> {{ $product->rating }}
                        </td>
                        <td class="py-3.5 px-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <!-- Edit Button -->
                                <button onclick="openEditProduct({{ json_encode($product) }})" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Product">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <!-- Delete Button -->
                                <form action="{{ route('admin.products.delete', $product->id) }}" method="POST" onsubmit="return confirm('Delete product {{ $product->name }}?')">
                                    @csrf
                                    <button type="submit" class="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Product">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8" class="py-8 text-center text-slate-400">
                            No products found in database.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Add Product Modal -->
<div id="addProductModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 class="font-extrabold text-base text-slate-900">Add New Product (បន្ថែមផលិតផល)</h3>
            <button onclick="document.getElementById('addProductModal').classList.add('hidden')" class="text-slate-400 hover:text-slate-700 text-lg">&times;</button>
        </div>

        <form action="{{ route('admin.products.store') }}" method="POST" class="space-y-3.5 text-xs">
            @csrf
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Product Name <span class="text-red-500">*</span></label>
                    <input type="text" name="name" required placeholder="e.g. Mechanical Keyboard" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">Khmer Name (ឈ្មោះខ្មែរ)</label>
                    <input type="text" name="khmer_name" placeholder="e.g. ក្ដារចុចមេកានិច" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Category</label>
                    <select name="category_id" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                        <option value="">Select Category</option>
                        @foreach($categories as $cat)
                            <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">Price ($) <span class="text-red-500">*</span></label>
                    <input type="number" step="0.01" name="price" required placeholder="25.00" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">Stock Quantity</label>
                    <input type="number" name="stock" value="10" min="0" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Badge (e.g. Best Seller)</label>
                    <input type="text" name="badge" placeholder="Popular / Best Seller" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">Rating (0 - 5)</label>
                    <input type="number" step="0.1" name="rating" value="4.8" min="0" max="5" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>
            </div>

            <div>
                <label class="block font-bold text-slate-700 mb-1">Image URL</label>
                <input type="url" name="image" placeholder="https://images.unsplash.com/..." class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
            </div>

            <div>
                <label class="block font-bold text-slate-700 mb-1">Description</label>
                <textarea name="description" rows="2" placeholder="Product specifications & details..." class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs"></textarea>
            </div>

            <div class="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onclick="document.getElementById('addProductModal').classList.add('hidden')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">Save Product</button>
            </div>
        </form>
    </div>
</div>

<!-- Edit Product Modal -->
<div id="editProductModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 class="font-extrabold text-base text-slate-900">Edit Product (កែប្រែផលិតផល)</h3>
            <button onclick="document.getElementById('editProductModal').classList.add('hidden')" class="text-slate-400 hover:text-slate-700 text-lg">&times;</button>
        </div>

        <form id="editProductForm" action="" method="POST" class="space-y-3.5 text-xs">
            @csrf
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Product Name <span class="text-red-500">*</span></label>
                    <input type="text" id="editProdName" name="name" required class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">Khmer Name</label>
                    <input type="text" id="editProdKhmerName" name="khmer_name" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Category</label>
                    <select id="editProdCategory" name="category_id" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                        <option value="">None</option>
                        @foreach($categories as $cat)
                            <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">Price ($) <span class="text-red-500">*</span></label>
                    <input type="number" step="0.01" id="editProdPrice" name="price" required class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">Stock</label>
                    <input type="number" id="editProdStock" name="stock" min="0" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Badge</label>
                    <input type="text" id="editProdBadge" name="badge" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">Rating</label>
                    <input type="number" step="0.1" id="editProdRating" name="rating" min="0" max="5" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
                </div>
            </div>

            <div>
                <label class="block font-bold text-slate-700 mb-1">Image URL</label>
                <input type="text" id="editProdImage" name="image" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs">
            </div>

            <div>
                <label class="block font-bold text-slate-700 mb-1">Description</label>
                <textarea id="editProdDesc" name="description" rows="2" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-xs"></textarea>
            </div>

            <div class="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onclick="document.getElementById('editProductModal').classList.add('hidden')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">Update Product</button>
            </div>
        </form>
    </div>
</div>

<script>
function openEditProduct(prod) {
    document.getElementById('editProductForm').action = '/admin/products/' + prod.id + '/update';
    document.getElementById('editProdName').value = prod.name;
    document.getElementById('editProdKhmerName').value = prod.khmer_name || '';
    document.getElementById('editProdCategory').value = prod.category_id || '';
    document.getElementById('editProdPrice').value = prod.price;
    document.getElementById('editProdStock').value = prod.stock;
    document.getElementById('editProdBadge').value = prod.badge || '';
    document.getElementById('editProdRating').value = prod.rating || 5.0;
    document.getElementById('editProdImage').value = prod.image || '';
    document.getElementById('editProdDesc').value = prod.description || '';
    document.getElementById('editProductModal').classList.remove('hidden');
}
</script>
@endsection
