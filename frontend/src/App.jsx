import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';
import { PRODUCTS, SHIPPING_OPTIONS } from './data/products';
import { getProducts, getCategories } from './services/api';

export default function App() {
  // Current Step: 1 = Products, 2 = Shopping Cart, 3 = Checkout Form, 4 = Order Confirmation
  const [currentStep, setStep] = useState(1);

  // Products & Categories loaded from Laravel API
  const [products, setProducts] = useState(PRODUCTS);
  const [categories, setCategories] = useState([]);
  const [apiConnected, setApiConnected] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Cart State (starts fresh and empty)
  const [cart, setCart] = useState([]);

  // Customer Checkout Form Data
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCountry: '+855',
    phone: '',
    city: '',
    state: '',
    zipCode: '',
    address: ''
  });

  // Shipping Method Selection
  const [selectedShipping, setSelectedShipping] = useState('vet');

  // Placed Order Snapshot
  const [placedOrder, setPlacedOrder] = useState(null);
  const [orderCounter, setOrderCounter] = useState(1);

  // Fetch products and categories from Laravel API
  const fetchApiData = useCallback(async () => {
    try {
      setLoadingProducts(true);
      const [productsResult, categoriesResult] = await Promise.allSettled([
        getProducts(),
        getCategories(),
      ]);

      if (productsResult.status === 'fulfilled' && productsResult.value && productsResult.value.length > 0) {
        setProducts(productsResult.value);
        setApiConnected(true);
      } else {
        // Fallback to static PRODUCTS
        setProducts(PRODUCTS);
        setApiConnected(false);
      }

      if (categoriesResult.status === 'fulfilled' && categoriesResult.value) {
        setCategories(categoriesResult.value);
      }
    } catch {
      setProducts(PRODUCTS);
      setApiConnected(false);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Update quantity (+ / -): minimum is 1, only Remove button can delete an item
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item completely
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Place Order handler (transitions from Checkout to Confirmation)
  const handlePlaceOrder = () => {
    const shippingOpt = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping) || SHIPPING_OPTIONS[0];
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = shippingOpt.price;
    const totalAmount = subtotal + shippingFee;

    const formattedOrderId = `ORD-${String(orderCounter).padStart(4, '0')}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newOrder = {
      orderId: formattedOrderId,
      orderDate: formattedDate,
      customer: { ...customerData },
      shippingMethod: selectedShipping,
      shippingFee,
      subtotal,
      totalAmount,
      items: [...cart],
      orderStatus: 'Pending'
    };

    setPlacedOrder(newOrder);
    setOrderCounter((prev) => prev + 1);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to continue shopping
  const handleResetOrder = () => {
    setCart([]);
    setCustomerData({
      firstName: '',
      lastName: '',
      email: '',
      phoneCountry: '+855',
      phone: '',
      city: '',
      state: '',
      zipCode: '',
      address: ''
    });
    setPlacedOrder(null);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Clean Navbar */}
      <Navbar
        currentStep={currentStep}
        setStep={setStep}
        cartItemsCount={totalCartCount}
        apiConnected={apiConnected}
      />

      {/* Main Page Content based on Step */}
      <main className="flex-1">
        {/* Step 1: Products List */}
        {currentStep === 1 && (
          <ProductList
            products={products}
            categories={categories}
            apiConnected={apiConnected}
            loading={loadingProducts}
            onRefresh={fetchApiData}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onGoToCart={() => setStep(2)}
          />
        )}

        {/* Step 2: Shopping Cart (Entered by clicking Cart icon or Go to Cart) */}
        {currentStep === 2 && (
          <ShoppingCart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onProceedToCheckout={() => setStep(3)}
            onBackToProducts={() => setStep(1)}
          />
        )}

        {/* Step 3: Checkout Form (Entered from Shopping Cart) */}
        {currentStep === 3 && (
          <CheckoutForm
            cart={cart}
            customerData={customerData}
            setCustomerData={setCustomerData}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => setStep(2)}
          />
        )}

        {/* Step 4: Order Confirmation (Entered after Place Order) */}
        {currentStep === 4 && (
          <OrderConfirmation
            order={placedOrder}
            onResetOrder={handleResetOrder}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
          <p className="font-semibold text-slate-700 tracking-wide">
            Copyright RGB STORE
          </p>
        </div>
      </footer>
    </div>
  );
}
