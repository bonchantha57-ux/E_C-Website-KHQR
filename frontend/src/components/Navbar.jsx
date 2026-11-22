import React from 'react';
import { ShoppingCart, Search, Heart, User, ChevronDown } from 'lucide-react';

export default function Navbar({ currentStep, setStep, cartItemsCount, apiConnected = false }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Category Links (Matching screenshot in PDF Page 2) */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setStep(1)}
              className="flex items-center gap-2 focus:outline-none cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 via-green-500 to-blue-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <span className="text-white text-xs font-black">RGB</span>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                RGB Store
              </span>
            </button>

            {/* Nav Categories matching PDF screenshot */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-700">
              <button 
                onClick={() => setStep(1)} 
                className={`transition-colors cursor-pointer ${currentStep === 1 ? 'text-black font-bold' : 'hover:text-black'}`}
              >
                Men
              </button>
              <button 
                onClick={() => setStep(1)} 
                className="hover:text-black transition-colors cursor-pointer"
              >
                Women
              </button>
              <button 
                onClick={() => setStep(1)} 
                className="hover:text-black transition-colors cursor-pointer"
              >
                Kids
              </button>
              <button 
                onClick={() => setStep(1)} 
                className="hover:text-black transition-colors cursor-pointer"
              >
                New In
              </button>
              <button 
                onClick={() => setStep(1)} 
                className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer text-slate-500"
              >
                Company <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </nav>
          </div>

          {/* Search bar (matching PDF screenshot) */}
          <div className="flex-1 max-w-sm hidden sm:block relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-9 py-2 text-xs bg-slate-100/80 border border-transparent rounded-lg focus:bg-white focus:border-slate-300 focus:outline-none transition-all placeholder:text-slate-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Right Action Icons: Admin Link, Wishlist, Profile, Cart */}
          <div className="flex items-center gap-3">
            {/* Quick Admin Portal Button */}
            <a
              href="http://127.0.0.1:8000/admin"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs"
              title="Open Laravel Admin Dashboard (ផ្ទាំងគ្រប់គ្រងទំនិញ)"
            >
              <span className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span className="hidden sm:inline">{apiConnected ? 'API Live' : 'Demo'} • </span>Admin
            </a>

            {/* Wishlist Icon */}
            <button 
              className="text-slate-700 hover:text-black transition-colors"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>

            {/* Profile Icon */}
            <button 
              className="text-slate-700 hover:text-black transition-colors"
              title="Profile"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Shopping Cart Icon Button - Clicking this enters the cart */}
            <button
              onClick={() => setStep(2)}
              className="relative p-1.5 text-slate-700 hover:text-black transition-colors cursor-pointer flex items-center justify-center"
              title="Shopping Cart (ចុចដើម្បីចូលកន្ត្រក)"
            >
              <ShoppingCart className="w-5 h-5 text-slate-800" />
              {cartItemsCount > 0 ? (
                <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartItemsCount}
                </span>
              ) : (
                <span className="absolute -top-1.5 -right-2 bg-slate-300 text-slate-700 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
