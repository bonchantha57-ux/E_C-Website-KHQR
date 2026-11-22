@extends('admin.layout')

@section('title', 'Categories Management')
@section('page-title', 'Categories Management (ការគ្រប់គ្រងប្រភេទ)')

@section('content')
<div class="space-y-6">

    <!-- Top Action Bar -->
    <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h3 class="text-xl font-extrabold text-slate-900 tracking-tight">Categories (បញ្ជីប្រភេទផលិតផល)</h3>
            <p class="text-xs text-slate-500">Manage all category groupings stored in MySQL Database.</p>
        </div>

        <button onclick="document.getElementById('addCategoryModal').classList.remove('hidden')" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer">
            <i class="fa-solid fa-plus"></i>
            <span>Add New Category (បង្កើតប្រភេទថ្មី)</span>
        </button>
    </div>

    <!-- Categories Table -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                        <th class="py-3 px-4"># ID</th>
                        <th class="py-3 px-4">Category Name</th>
                        <th class="py-3 px-4">Description</th>
                        <th class="py-3 px-4 text-center">Products Count</th>
                        <th class="py-3 px-4">Created Date</th>
                        <th class="py-3 px-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse($categories as $category)
                    <tr class="hover:bg-slate-50/60 transition-colors">
                        <td class="py-3.5 px-4 font-mono font-bold text-slate-400">
                            #{{ $category->id }}
                        </td>
                        <td class="py-3.5 px-4">
                            <span class="font-extrabold text-slate-900 text-sm block">{{ $category->name }}</span>
                        </td>
                        <td class="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                            {{ $category->description ?? 'No description' }}
                        </td>
                        <td class="py-3.5 px-4 text-center">
                            <span class="px-2.5 py-1 rounded-full text-xs font-bold {{ $category->products_count > 0 ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-400' }}">
                                {{ $category->products_count }} products
                            </span>
                        </td>
                        <td class="py-3.5 px-4 text-slate-400 text-[11px]">
                            {{ $category->created_at ? $category->created_at->format('M d, Y') : 'N/A' }}
                        </td>
                        <td class="py-3.5 px-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <!-- Edit Button -->
                                <button onclick="openEditCategory({{ $category->id }}, '{{ addslashes($category->name) }}', '{{ addslashes($category->description ?? '') }}')" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Category">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <!-- Delete Button -->
                                <form action="{{ route('admin.categories.delete', $category->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete category {{ $category->name }}?')">
                                    @csrf
                                    <button type="submit" class="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Category">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="py-8 text-center text-slate-400">
                            No categories found in database. Click "Add New Category" above.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Add Category Modal -->
<div id="addCategoryModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 class="font-extrabold text-base text-slate-900">Add New Category (បង្កើតប្រភេទ)</h3>
            <button onclick="document.getElementById('addCategoryModal').classList.add('hidden')" class="text-slate-400 hover:text-slate-700 text-lg">&times;</button>
        </div>

        <form action="{{ route('admin.categories.store') }}" method="POST" class="space-y-4 text-xs">
            @csrf
            <div>
                <label class="block font-bold text-slate-700 mb-1">Category Name <span class="text-red-500">*</span></label>
                <input type="text" name="name" required placeholder="e.g. Smart Devices" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>

            <div>
                <label class="block font-bold text-slate-700 mb-1">Description</label>
                <textarea name="description" rows="3" placeholder="Brief details about products in this category..." class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-sm"></textarea>
            </div>

            <div class="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onclick="document.getElementById('addCategoryModal').classList.add('hidden')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">Save Category</button>
            </div>
        </form>
    </div>
</div>

<!-- Edit Category Modal -->
<div id="editCategoryModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 class="font-extrabold text-base text-slate-900">Edit Category (កែប្រែប្រភេទ)</h3>
            <button onclick="document.getElementById('editCategoryModal').classList.add('hidden')" class="text-slate-400 hover:text-slate-700 text-lg">&times;</button>
        </div>

        <form id="editCategoryForm" action="" method="POST" class="space-y-4 text-xs">
            @csrf
            <div>
                <label class="block font-bold text-slate-700 mb-1">Category Name <span class="text-red-500">*</span></label>
                <input type="text" id="editCategoryName" name="name" required class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-sm">
            </div>

            <div>
                <label class="block font-bold text-slate-700 mb-1">Description</label>
                <textarea id="editCategoryDesc" name="description" rows="3" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-sm"></textarea>
            </div>

            <div class="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onclick="document.getElementById('editCategoryModal').classList.add('hidden')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">Update Category</button>
            </div>
        </form>
    </div>
</div>

<script>
function openEditCategory(id, name, desc) {
    document.getElementById('editCategoryForm').action = '/admin/categories/' + id + '/update';
    document.getElementById('editCategoryName').value = name;
    document.getElementById('editCategoryDesc').value = desc;
    document.getElementById('editCategoryModal').classList.remove('hidden');
}
</script>
@endsection
