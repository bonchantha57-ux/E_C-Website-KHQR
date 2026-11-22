@extends('admin.layout')

@section('title', 'API Explorer & Live Tester')
@section('page-title', 'API Explorer & Live Tester (មើល និងតេស្ត API ផ្ទាល់)')

@section('content')
<div class="space-y-6">

    <!-- Header Explanation -->
    <div class="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md">
        <div class="flex items-center gap-3 mb-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">Live API Server: http://127.0.0.1:8000</span>
        </div>
        <h3 class="text-2xl font-black text-white">របៀបមើល និងតេស្ត Database APIs ទាំង ២ (How to View & Test APIs)</h3>
        <p class="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            លោកអ្នកអាចចុចប៊ូតុង <strong class="text-emerald-400 font-bold">"Send Request"</strong> ខាងក្រោមដើម្បីតេស្ត API ផ្ទាល់ ឬចុចលើតំណភ្ជាប់ <strong class="text-blue-400 font-bold">"Open in Browser Tab"</strong> ដើម្បីបើកមើលទម្រង់ JSON នៅលើ Browser បានភ្លាមៗ!
        </p>
    </div>

    <!-- 2 Main APIs Quick Links Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- 1. Categories API Card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div class="flex items-center justify-between">
                <span class="bg-blue-100 text-blue-800 text-[10px] font-mono font-black px-2.5 py-0.5 rounded">GET /api/categories</span>
                <a href="/api/categories" target="_blank" class="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1">
                    <span>Open in Tab</span> <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
            </div>
            <h4 class="font-extrabold text-slate-900 text-sm">Categories API (បញ្ជីប្រភេទទាំងអស់)</h4>
            <p class="text-xs text-slate-500">ទាញយកទិន្នន័យ Category ទាំងអស់ពី MySQL Database រួមទាំងចំនួន Product ក្នុង Category នីមួយៗ។</p>
            <div class="pt-2 flex items-center gap-2">
                <button onclick="testApi('/api/categories', 'GET')" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer">
                    <i class="fa-solid fa-play text-[10px]"></i> Send Request
                </button>
                <button onclick="testApi('/api/categories/1', 'GET')" class="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center gap-1.5 cursor-pointer">
                    <i class="fa-solid fa-play text-[10px]"></i> Get Category #1
                </button>
            </div>
        </div>

        <!-- 2. Products API Card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div class="flex items-center justify-between">
                <span class="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-black px-2.5 py-0.5 rounded">GET /api/products</span>
                <a href="/api/products" target="_blank" class="text-xs text-emerald-600 hover:underline font-bold flex items-center gap-1">
                    <span>Open in Tab</span> <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
            </div>
            <h4 class="font-extrabold text-slate-900 text-sm">Products API (បញ្ជីទំនិញទាំង ៤ មុខ)</h4>
            <p class="text-xs text-slate-500">ទាញយកបញ្ជីទំនិញទាំងអស់ពី MySQL Database (Laptop $650, Mouse $15, Keyboard $25, Monitor $120)។</p>
            <div class="pt-2 flex items-center gap-2">
                <button onclick="testApi('/api/products', 'GET')" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer">
                    <i class="fa-solid fa-play text-[10px]"></i> Send Request
                </button>
                <button onclick="testApi('/api/products/1', 'GET')" class="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center gap-1.5 cursor-pointer">
                    <i class="fa-solid fa-play text-[10px]"></i> Get Product #1
                </button>
            </div>
        </div>
    </div>

    <!-- Live Console & JSON Response Viewer -->
    <div class="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <!-- Console Header -->
        <div class="bg-slate-950 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <div class="flex gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span class="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <span class="text-xs font-mono font-bold text-slate-300" id="requestMethodUrl">GET /api/products</span>
            </div>

            <div class="flex items-center gap-3">
                <span id="responseStatus" class="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    200 OK
                </span>
                <span id="responseTime" class="text-xs font-mono text-slate-400">0ms</span>
                <button onclick="copyResponse()" class="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono transition-colors">
                    <i class="fa-solid fa-copy mr-1"></i> <span id="copyBtnText">Copy JSON</span>
                </button>
            </div>
        </div>

        <!-- JSON Code Viewer -->
        <div class="p-4 max-h-[500px] overflow-auto">
            <pre id="jsonViewer" class="font-mono text-xs text-emerald-400 leading-relaxed">Loading API data...</pre>
        </div>
    </div>

    <!-- Integration Code Snippet (How to use with React) -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <h4 class="font-extrabold text-slate-900 text-sm mb-2 flex items-center gap-2">
            <i class="fa-brands fa-react text-blue-500 text-base"></i>
            <span>របៀបទាញយកទិន្នន័យពី API នេះទៅប្រើក្នុង React.js (Frontend Code Example)</span>
        </h4>
        <pre class="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
<code>// React Component Example
useEffect(() => {
  fetch('http://127.0.0.1:8000/api/products')
    .then(res => res.json())
    .then(data => {
      console.log('Products from MySQL:', data.data);
      // setProducts(data.data);
    })
    .catch(err => console.error(err));
}, []);</code></pre>
    </div>

</div>

<script>
// Auto test on load
window.addEventListener('DOMContentLoaded', () => {
    testApi('/api/products', 'GET');
});

async function testApi(endpoint, method = 'GET') {
    const viewer = document.getElementById('jsonViewer');
    const methodUrl = document.getElementById('requestMethodUrl');
    const statusSpan = document.getElementById('responseStatus');
    const timeSpan = document.getElementById('responseTime');

    methodUrl.textContent = method + ' ' + endpoint;
    viewer.textContent = '// Sending request to ' + endpoint + ' ...';
    statusSpan.textContent = 'Loading...';
    statusSpan.className = 'text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30';

    const startTime = performance.now();

    try {
        const response = await fetch(endpoint, { method: method });
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);

        const data = await response.json();

        statusSpan.textContent = response.status + ' ' + response.statusText;
        statusSpan.className = response.ok 
            ? 'text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30';

        timeSpan.textContent = duration + 'ms';
        viewer.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        statusSpan.textContent = 'ERROR';
        statusSpan.className = 'text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30';
        viewer.textContent = '// Failed to fetch: ' + err.message;
    }
}

function copyResponse() {
    const text = document.getElementById('jsonViewer').textContent;
    navigator.clipboard.writeText(text);
    const btnText = document.getElementById('copyBtnText');
    btnText.textContent = 'Copied!';
    setTimeout(() => { btnText.textContent = 'Copy JSON'; }, 2000);
}
</script>
@endsection
