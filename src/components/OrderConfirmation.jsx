import React from 'react';
import { CheckCircle2, Clock, Package, Printer, RotateCcw, User, MapPin, Mail, Phone } from 'lucide-react';
import { SHIPPING_OPTIONS } from '../data/products';

export default function OrderConfirmation({ order, onResetOrder }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const shippingOption = SHIPPING_OPTIONS.find((s) => s.id === order.shippingMethod) || SHIPPING_OPTIONS[0];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Exercise Badge */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          Practical Exercise 3 &middot; លំហាត់អនុវត្តទី៣ (Order Confirmation)
        </span>
      </div>

      {/* Main Confirmation Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:shadow-none print:border-none">
        {/* Success Header Banner */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 sm:p-10 text-center relative overflow-hidden">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/40 shadow-lg">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[2.5]" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base font-medium max-w-md mx-auto">
            ការបញ្ជាទិញរបស់អ្នកត្រូវបានកត់ត្រាចូលក្នុងប្រព័ន្ធដោយជោគជ័យ។ យើងនឹងរៀបចំទំនិញដឹកជញ្ជូនជូនអ្នកក្នុងពេលឆាប់ៗនេះ។
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold">
            <span>Order Reference:</span>
            <span className="font-mono text-white tracking-wider bg-black/20 px-2 py-0.5 rounded">
              {order.orderId}
            </span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 1. Key Order Summary Grid (Matching requirements) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {/* Requirement: Order ID */}
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Order ID
              </span>
              <span className="text-sm sm:text-base font-black text-slate-900 font-mono">
                {order.orderId}
              </span>
            </div>

            {/* Requirement: Customer Name */}
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Customer Name
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-900 truncate block">
                {order.customer.firstName} {order.customer.lastName}
              </span>
            </div>

            {/* Requirement: Order Date */}
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Order Date
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                {order.orderDate}
              </span>
            </div>

            {/* Requirement: Order Status: Pending */}
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Order Status
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 mt-0.5">
                <Clock className="w-3 h-3 text-amber-600 animate-spin" />
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* 2. Customer & Shipping recap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Customer Contact Details
              </h3>
              <p className="text-sm font-bold text-slate-900">
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <div className="mt-2 space-y-1 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {order.customer.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {order.customer.phoneCountry} {order.customer.phone}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Shipping Destination & Method
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {order.customer.address}, {order.customer.city}, {order.customer.state} ({order.customer.zipCode})
              </p>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Method:</span>
                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {shippingOption.name} ({shippingOption.deliveryTime})
                </span>
              </div>
            </div>
          </div>

          {/* 3. Ordered Products Table (Requirement: Ordered Products) */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span>Ordered Products (បញ្ជីទំនិញដែលបានកុម្ម៉ង់)</span>
            </h3>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4 text-center">Qty</th>
                    <th className="py-3 px-4 text-right">Unit Price</th>
                    <th className="py-3 px-4 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{item.name}</span>
                            <span className="text-[11px] text-slate-400">{item.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                        &times;{item.quantity}
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-600">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Requirement: Total Amount summary */}
              <div className="bg-slate-50/70 p-4 border-t border-slate-200 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Amount:</span>
                  <span className="font-semibold text-slate-900">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Fee:</span>
                  <span className="font-semibold text-slate-900">
                    {order.shippingFee === 0 ? 'Free ($0.00)' : `$${order.shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-wide">
                    Total Amount (Grand Total):
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Print Invoice (បោះពុម្ពវិក្កយបត្រ)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onResetOrder}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Continue Shopping (បន្តការទិញទំនិញ)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
