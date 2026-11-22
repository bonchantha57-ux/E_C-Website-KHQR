<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Dashboard') | RGB Store Backend</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Kantumruy Pro & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        body, * {
            font-family: 'Kantumruy Pro', 'Plus Jakarta Sans', system-ui, sans-serif;
        }
    </style>
</head>
<body class="bg-slate-100 text-slate-800 antialiased min-h-screen flex flex-col md:flex-row">

    <!-- Sidebar Navigation -->
    <aside class="w-full md:w-64 bg-slate-900 text-white shrink-0 flex flex-col justify-between shadow-xl z-20">
        <div>
            <!-- Store Logo -->
            <div class="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 via-green-500 to-blue-600 flex items-center justify-center font-black text-xs text-white shadow-md">
                    RGB
                </div>
                <div>
                    <span class="font-extrabold text-base tracking-tight text-white block leading-tight">RGB Store</span>
                    <span class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Admin Panel</span>
                </div>
            </div>

            <!-- Navigation Links -->
            <nav class="p-4 space-y-1.5 text-sm font-semibold">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all {{ request()->routeIs('admin.dashboard') ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800' }}">
                    <i class="fa-solid fa-chart-pie w-4 text-center"></i>
                    <span>Dashboard (ផ្ទាំងគ្រប់គ្រង)</span>
                </a>

                <a href="{{ route('admin.categories') }}" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all {{ request()->routeIs('admin.categories*') ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800' }}">
                    <i class="fa-solid fa-layer-group w-4 text-center"></i>
                    <span>Categories (ប្រភេទ)</span>
                </a>

                <a href="{{ route('admin.products') }}" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all {{ request()->routeIs('admin.products*') ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800' }}">
                    <i class="fa-solid fa-box-open w-4 text-center"></i>
                    <span>Products (ផលិតផល)</span>
                </a>

                <div class="pt-4 pb-2 px-3">
                    <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">APIs & Integrations</span>
                </div>

                <a href="{{ route('admin.api-tester') }}" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all {{ request()->routeIs('admin.api-tester') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold' : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800' }}">
                    <i class="fa-solid fa-terminal w-4 text-center"></i>
                    <span>API Explorer & Tester</span>
                </a>
            </nav>
        </div>

        <!-- Sidebar Footer -->
        <div class="p-4 border-t border-slate-800 space-y-3">
            <a href="http://localhost:5173" target="_blank" class="flex items-center justify-between px-3 py-2 bg-slate-800/80 hover:bg-slate-800 rounded-xl text-xs text-slate-300 hover:text-white transition-colors">
                <span class="flex items-center gap-2">
                    <i class="fa-solid fa-shop text-blue-400"></i> View React Store
                </span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-500"></i>
            </a>

            <div class="flex items-center gap-3 px-2 pt-1">
                <div class="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs">
                    <i class="fa-solid fa-user-shield"></i>
                </div>
                <div class="text-xs">
                    <span class="block text-white font-bold leading-tight">Admin User</span>
                    <span class="block text-emerald-400 text-[10px] font-medium">&bull; MySQL Connected</span>
                </div>
            </div>
        </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <!-- Top Navbar -->
        <header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
            <div class="flex items-center gap-3">
                <h2 class="text-lg font-bold text-slate-900">@yield('page-title', 'Dashboard')</h2>
            </div>

            <div class="flex items-center gap-4 text-xs font-semibold">
                <div class="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-slate-600">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Backend Server: <strong>127.0.0.1:8000</strong></span>
                </div>
                <div class="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-slate-600">
                    <span>Database: <strong class="text-blue-600">rgb_store_db</strong></span>
                </div>
            </div>
        </header>

        <!-- Flash Messages -->
        <div class="px-6 pt-4">
            @if(session('success'))
                <div class="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-between mb-2 shadow-2xs">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-emerald-600"></i>
                        <span>{{ session('success') }}</span>
                    </div>
                    <button onclick="this.parentElement.remove()" class="text-emerald-500 hover:text-emerald-800">&times;</button>
                </div>
            @endif

            @if($errors->any())
                <div class="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-bold mb-2">
                    <ul class="list-disc pl-5 space-y-1">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>

        <!-- Page Body Content -->
        <main class="p-6 flex-1">
            @yield('content')
        </main>
    </div>

</body>
</html>
