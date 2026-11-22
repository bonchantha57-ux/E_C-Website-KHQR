import React from 'react';
import { Check, ShoppingBag, ShoppingCart, CreditCard, CheckCircle2 } from 'lucide-react';

export default function StepProgress({ currentStep, setStep, canGoToCheckout, isOrderPlaced }) {
  const steps = [
    { number: 1, label: 'Products', khmer: 'ផលិតផលទាំង ៤', icon: ShoppingBag },
    { number: 2, label: 'Shopping Cart', khmer: 'កន្ត្រកទំនិញ', icon: ShoppingCart },
    { number: 3, label: 'Checkout Form', khmer: 'ទម្រង់ទូទាត់ប្រាក់', icon: CreditCard },
    { number: 4, label: 'Confirmation', khmer: 'ការបញ្ជាក់ការបញ្ជាទិញ', icon: CheckCircle2 }
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-3 px-4 shadow-2xs">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Connector Line behind steps */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0"></div>
          <div 
            className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 transition-all duration-300 -z-0"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 94}%` }}
          ></div>

          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;
            const isClickable = s.number < currentStep || (s.number === 3 && canGoToCheckout) || (s.number === 4 && isOrderPlaced);

            return (
              <button
                key={s.number}
                type="button"
                disabled={!isClickable && s.number !== currentStep}
                onClick={() => {
                  if (isClickable || s.number <= currentStep) {
                    setStep(s.number);
                  }
                }}
                className={`flex flex-col items-center group relative z-10 focus:outline-none transition-all ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 shadow-sm ${
                    isCompleted
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-200 scale-110 shadow-md'
                      : 'bg-white text-slate-400 border-2 border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>

                <div className="mt-1.5 text-center">
                  <div
                    className={`text-xs sm:text-sm font-bold transition-colors ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </div>
                  <div className="hidden sm:block text-[11px] text-slate-400 font-medium">
                    {s.khmer}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
