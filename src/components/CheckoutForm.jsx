import React, { useState } from 'react';
import { ArrowLeft, Check, Shield, Truck, AlertCircle, Tag, ChevronRight } from 'lucide-react';
import { SHIPPING_OPTIONS } from '../data/products';

export default function CheckoutForm({
  cart,
  customerData,
  setCustomerData,
  selectedShipping,
  setSelectedShipping,
  onPlaceOrder,
  onBackToCart
}) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currentShippingOption = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping) || SHIPPING_OPTIONS[0];
  const shippingFee = currentShippingOption.price;
  const estimatedTax = 0; // Tax or standard calculation
  const grandTotal = subtotal + shippingFee + estimatedTax;

  // Validation function for required fields
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required.';
        if (value.trim().length < 2) return 'First name must be at least 2 characters.';
        return '';
      case 'lastName':
        if (!value.trim()) return 'Last name is required.';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email (e.g. name@domain.com).';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required.';
        if (!/^[0-9+\s-]{8,15}$/.test(value.trim())) return 'Please enter a valid phone number (8-15 digits).';
        return '';
      case 'city':
        if (!value.trim()) return 'City is required.';
        return '';
      case 'state':
        if (!value.trim()) return 'State / Province is required.';
        return '';
      case 'zipCode':
        if (!value.trim()) return 'Zip code is required.';
        return '';
      case 'address':
        if (!value.trim()) return 'Street address / description is required.';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all touched and validate
    const fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'city', 'state', 'zipCode', 'address'];
    const newErrors = {};
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const val = customerData[field] || '';
      const err = validateField(field, val);
      if (err) {
        newErrors[field] = err;
        isValid = false;
      }
    });

    setTouched(fieldsToValidate.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    setErrors(newErrors);

    if (isValid) {
      onPlaceOrder();
    } else {
      // Scroll to top of form
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          {/* Breadcrumb matching screenshot: Cart > Shipping > Payment */}
          <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-2">
            <button onClick={onBackToCart} className="hover:text-blue-600 transition-colors cursor-pointer">
              Cart
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-bold">Shipping Address</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Confirmation</span>
          </nav>

          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Checkout (ទម្រង់បញ្ជាទិញ)
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Customer Form & Shipping Method (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Customer Shipping Address Form */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Shipping Address (អាសយដ្ឋានដឹកជញ្ជូន)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please provide your contact information and shipping address.
                  </p>
                </div>
                <span className="text-xs text-red-500 font-semibold">* Required fields</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={customerData.firstName || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Divyansh"
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      errors.firstName ? 'border-red-400 bg-red-50/30 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={customerData.lastName || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Agarwal"
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      errors.lastName ? 'border-red-400 bg-red-50/30 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerData.email || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      errors.email ? 'border-red-400 bg-red-50/30 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number with Prefix */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="phoneCountry"
                      value={customerData.phoneCountry || '+855'}
                      onChange={handleInputChange}
                      className="px-2.5 py-2.5 text-xs bg-slate-100 border border-slate-300 rounded-xl focus:outline-none font-semibold text-slate-700"
                    >
                      <option value="+855">KH +855</option>
                      <option value="+1">US +1</option>
                      <option value="+91">IND +91</option>
                      <option value="+66">TH +66</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={customerData.phone || ''}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="012 345 678"
                      className={`flex-1 px-3.5 py-2.5 text-sm bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                        errors.phone ? 'border-red-400 bg-red-50/30 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={customerData.city || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Phnom Penh"
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      errors.city ? 'border-red-400 bg-red-50/30 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {errors.city}
                    </p>
                  )}
                </div>

                {/* State & Zip Code side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      State / Province <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={customerData.state || ''}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="State"
                      className={`w-full px-3 py-2.5 text-sm bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                        errors.state ? 'border-red-400 bg-red-50/30 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'
                      }`}
                    />
                    {errors.state && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={customerData.zipCode || ''}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Zip"
                      className={`w-full px-3 py-2.5 text-sm bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                        errors.zipCode ? 'border-red-400 bg-red-50/30 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.zipCode}</p>
                    )}
                  </div>
                </div>

                {/* Address Description (Full width) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Address / Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    value={customerData.address || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Enter street address, building, floor or special delivery instructions..."
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      errors.address ? 'border-red-400 bg-red-50/30 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Shipping Method Selection (Requirement 7) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  Shipping Method (វិធីសាស្ត្រដឹកជញ្ជូន)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SHIPPING_OPTIONS.map((opt) => {
                  const isSelected = selectedShipping === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt.id)}
                      className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={isSelected}
                        onChange={() => setSelectedShipping(opt.id)}
                        className="mt-1 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                      />

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">{opt.name}</span>
                          <span className="font-extrabold text-sm text-slate-900">
                            {opt.price === 0 ? '$0 (Free)' : `$${opt.price.toFixed(2)}`}
                          </span>
                        </div>
                        <span className="inline-block text-xs text-blue-700 font-semibold bg-blue-100/70 px-2 py-0.5 rounded-sm mt-1">
                          {opt.deliveryTime}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">
                          {opt.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order Button (4 columns) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Your Cart (សេចក្តីសង្ខេប)
                </h2>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                  {cart.reduce((s, i) => s + i.quantity, 0)} items
                </span>
              </div>

              {/* Items List Previews */}
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 pr-1 -mr-1 mb-5">
                {cart.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity} &times; ${item.price.toFixed(2)}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-900 shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations (Requirement 8 & 9) */}
              <div className="space-y-3 text-xs sm:text-sm pt-4 border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Shipping ({currentShippingOption.name})</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? 'Free ($0.00)' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Estimated Taxes</span>
                  <span className="font-semibold text-slate-900">$0.00</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-slate-900">Grand Total</span>
                  <span className="text-2xl font-black text-blue-600">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Requirement 10: Create Place Order Button */}
              <div className="mt-6 space-y-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-black active:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Place Order (បញ្ជាក់ការបញ្ជាទិញ)</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onBackToCart}
                  className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Cart (ត្រឡប់ទៅកែប្រែកន្ត្រក)</span>
                </button>
              </div>

              {/* Trust & Guarantee note */}
              <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" /> 100% Encrypted & Safe Ordering
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
