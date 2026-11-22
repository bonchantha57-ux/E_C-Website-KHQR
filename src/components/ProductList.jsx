import React, { useState } from 'react';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function ProductList({ cart, onAddToCart }) {
  // Temporary state for button animation feedback
  const [justAddedId, setJustAddedId] = useState(null);

  const handleAdd = (product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl leading-relaxed">
          Featured Products
        </h1>
      </div>

      {/* Grid of the 4 required products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => {
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
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Standard Add to Cart Button (Always Clean Button on Home) */}
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
    </div>
  );
}
