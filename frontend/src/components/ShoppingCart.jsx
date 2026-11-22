import React, { useState } from 'react';
import { Trash2, Heart, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export default function ShoppingCart({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onBackToProducts
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // Calculate Subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Delivery fee (standard $0 for cart preview, or default free)
  const delivery = subtotal > 0 ? 0 : 0;

  // Discount calculation
  let discount = 0;
  if (appliedPromo === 'DISCOUNT10') {
    discount = 10;
  } else if (appliedPromo === 'SAVE20') {
    discount = subtotal * 0.2;
  }

  // Grand Total
  const grandTotal = Math.max(0, subtotal + delivery - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'DISCOUNT10' || code === 'SAVE20') {
      setAppliedPromo(code);
      setPromoError('');
    } else if (code === '') {
      setPromoError('Please enter a coupon code.');
    } else {
      setPromoError('Invalid coupon code. Try: DISCOUNT10 or SAVE20');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-16 px-4 max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Your Cart is Empty (កន្ត្រកទទេ)</h2>
        <p className="mt-2 text-slate-500 max-w-md mx-auto text-sm">
          អ្នកមិនទាន់បានជ្រើសរើសទំនិញចូលក្នុងកន្ត្រកនៅឡើយទេ។ សូមត្រឡប់ទៅជ្រើសរើសផលិតផលដែលអ្នកចង់ទិញ។
        </p>
        <button
          onClick={onBackToProducts}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products (ត្រឡប់ទៅជ្រើសរើសផលិតផល)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Exercise badge & breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onBackToProducts}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products (ត្រឡប់ក្រោយ)</span>
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Cart <span className="text-slate-400 text-xl font-normal">({cart.length} unique items)</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Cart Items (8 columns on lg) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {cart.map((item) => {
              const itemTotal = item.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Thumbnail & Basic Info */}
                  <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200/80">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate mt-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                        {item.description}
                      </p>

                      {/* Action buttons (Wishlist & Remove) */}
                      <div className="flex items-center gap-3 text-slate-400">
                        <button
                          type="button"
                          className="hover:text-rose-500 transition-colors p-1 -m-1"
                          title="Save to Wishlist"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="hover:text-red-600 transition-colors p-1 -m-1 flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-600 cursor-pointer"
                          title="Remove item from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-[11px]">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Unit & Subtotal Price */}
                    <div className="text-right">
                      <div className="text-lg sm:text-xl font-extrabold text-slate-900">
                        ${itemTotal.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>

                    {/* Quantity Selector: - [QTY] + (Cannot reduce below 1, must click Remove to delete) */}
                    <div className="flex items-center border border-slate-300 rounded-full bg-white shadow-2xs overflow-hidden">
                      <button
                        type="button"
                        disabled={item.quantity <= 1}
                        onClick={() => {
                          if (item.quantity > 1) {
                            onUpdateQuantity(item.id, item.quantity - 1);
                          }
                        }}
                        className={`w-8 h-8 flex items-center justify-center transition-colors ${
                          item.quantity <= 1
                            ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                        }`}
                        title={item.quantity <= 1 ? "Minimum quantity is 1. Click Remove to delete." : "Reduce quantity"}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-10 text-center font-bold text-sm text-slate-800 select-none">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 px-2">
            <span>Free standard return within 30 days</span>
            <button
              onClick={onBackToProducts}
              className="text-blue-600 font-bold hover:underline cursor-pointer"
            >
              + Add more products
            </button>
          </div>
        </div>

        {/* Right column: Order Summary Card (4 columns on lg) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-5 pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            {/* Calculations */}
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="font-semibold text-emerald-600">
                  {delivery === 0 ? 'Free ($0.00)' : `$${delivery.toFixed(2)}`}
                </span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                  <span className="flex items-center gap-1 text-xs">
                    <Tag className="w-3.5 h-3.5" /> Promo ({appliedPromo})
                  </span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="block text-[11px] text-slate-400">Including all estimated taxes</span>
                </div>
                <span className="text-2xl font-black text-slate-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-black active:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Checkout (Proceed to Checkout)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Coupon Code section */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600">
                  Have a promo code? (Try: <span className="text-blue-600 font-mono">DISCOUNT10</span>)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-red-500 font-medium">{promoError}</p>
                )}
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-600 font-medium">Coupon applied successfully!</p>
                )}
              </form>
            </div>

            {/* Trust badge */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Safe & Secure Checkout Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
