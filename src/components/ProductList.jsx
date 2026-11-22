import React, { useState } from 'react';
import { ShoppingCart, Star, Check, RefreshCw, Database } from 'lucide-react';

export default function ProductList({
  products = [],
  categories = [],
  apiConnected = false,
  loading = false,
  onRefresh,
  onAddToCart,
}) {
  // Temporary state for button animation feedback
  const [justAddedId, setJustAddedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAdd = (product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => {
        if (p.categoryId && String(p.categoryId) === String(selectedCategory)) return true;
        if (p.category && String(p.category).toLowerCase() === String(selectedCategory).toLowerCase()) return true;
        return false;
      });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section with Category tabs and API Connection Status */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                apiConnected
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              {apiConnected ? '🟢 Live API: Connected (MySQL)' : '🟡 Offline / Fallback Demo Data'}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl leading-relaxed">
            Featured Products
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ទំនិញអេឡិចត្រូនិចទំនើបៗ និងមានការធានាគុណភាពពី RGB Store
          </p>
        </div>

        {/* Category Filters & Refresh button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  String(selectedCategory) === String(cat.id)
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 cursor-pointer disabled:opacity-50"
              title="Refresh products from Laravel API"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Loading state skeleton */}
      {loading && products.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse">
              <div className="aspect-4/3 bg-slate-200 rounded-xl mb-4" />
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-100 rounded w-1/2 mb-4" />
              <div className="h-8 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      ) : (
        /* Grid of products */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isJustAdded = justAddedId === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col overflow-hidden group"
              >
                {/* Product Image Box */}
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Category & Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-500 mb-1.5">
                      <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                      <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                      <span className="text-xs text-slate-400">({product.reviews})</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-blue-700 font-semibold mb-2 leading-relaxed">
                      {product.khmerName}
                    </p>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Add to Cart Section */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Price</span>
                      <span className="text-2xl font-black text-slate-900">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      </span>
                    </div>

                    {/* Standard Add to Cart Button */}
                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className={`w-full py-3 px-4 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer leading-relaxed ${
                        isJustAdded
                          ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/20'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4 shrink-0" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 shrink-0" />
                          <span>Add to Cart (បញ្ចូលកន្ត្រក)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
