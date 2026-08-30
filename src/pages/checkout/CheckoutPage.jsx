/**
 * CheckoutPage.jsx
 *
 * Handles billing form, payment method selection, and purchase simulation.
 *
 * PORTFOLIO VERSION: Simulates payment processing using a 2-second timeout.
 * On success, enrolled courses are persisted via StudentContext → localStorage.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Original API implementation (commented out for portfolio):
 * This page originally sent a real payment/order request to the Strapi backend:
 *
 *   const res = await axios.post('https://futuredev-backend.onrender.com/api/orders', {
 *     data: { user: userId, courses: cartItems.map(c => c.documentId), total }
 *   });
 *
 * On success the backend created an enrollment record and returned the order.
 * The cart was then cleared and the user was redirected to /success.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useStudent } from '../../context/StudentContext';
import { FaCreditCard, FaPaypal, FaShieldAlt } from 'react-icons/fa';
import * as yup from 'yup';

// --- Validation Schema ---
const checkoutSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  paymentMethod: yup.string(),
  cardNumber: yup.string().when('paymentMethod', {
    is: 'card',
    then: () => yup.string().required('Card number is required').min(16, 'Card must be at least 16 digits')
  }),
  expDate: yup.string().when('paymentMethod', {
    is: 'card',
    then: () => yup.string().required('Expiration date is required')
  }),
  cvc: yup.string().when('paymentMethod', {
    is: 'card',
    then: () => yup.string().required('CVC is required').min(3, 'CVC must be at least 3 digits')
  })
});

// --- Main Component ---
const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { enrollCourses } = useStudent();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    cardNumber: '',
    expDate: '',
    cvc: ''
  });

  // Order Calculations
  const subtotal = cartItems ? cartItems.reduce((acc, item) => acc + Number(item.price || 0), 0) : 0;
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  /**
   * handlePayment
   *
   * PORTFOLIO VERSION — simulates a payment flow:
   * 1. Validate form fields.
   * 2. Wait 2 seconds (simulates network round-trip).
   * 3. Enroll the cart courses via StudentContext (persisted to localStorage).
   * 4. Clear the cart.
   * 5. Navigate to /success ONLY after successful enrollment.
   *
   * If validation fails → show errors, do NOT navigate.
   * If enrollment throws → show alert, do NOT navigate to /success.
   */
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      alert('Your cart is empty. Please add a course before checking out.');
      return;
    }

    setIsProcessing(true);
    setErrors({});

    try {
      // Step 1 — Validate form
      await checkoutSchema.validate(
        { ...formData, paymentMethod },
        { abortEarly: false }
      );

      // Step 2 — Simulate payment processing (2-second delay)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 3 — Enroll purchased courses (stored in StudentContext → localStorage)
      enrollCourses(cartItems);

      // Step 4 — Clear the cart
      clearCart();

      // Step 5 — Navigate to success ONLY here, after everything succeeded
      setIsProcessing(false);
      navigate('/success');

    } catch (err) {
      setIsProcessing(false);

      if (err.name === 'ValidationError' && err.inner) {
        // Yup validation errors — show field errors, do NOT navigate
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        // Unexpected runtime error — do NOT navigate to success
        console.error('Checkout error:', err);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden text-zinc-300">
      <div className="absolute top-20 left-0 w-[500px] h-[400px] bg-cyan-900/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-10 border-b border-zinc-800/50 pb-6">
          <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase mb-2 block">Checkout Flow</span>
          <h1 className="text-3xl font-bold text-white">Secure Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          <div className="lg:w-2/3 space-y-8">

            {/* Billing Details Section */}
            <div className="glass-panel p-8 sm:p-10">
              <h2 className="text-xl font-medium text-white mb-8 flex items-center gap-3 tracking-wide">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center">1</span>
                Billing Details
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} error={errors.firstName} placeholder="Enter your first name" />
                <InputGroup label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} error={errors.lastName} placeholder="Enter your last name" />
                <InputGroup label="Email Address" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} placeholder="Enter your email" type="email" full />
                <InputGroup label="Country" name="country" value={formData.country} onChange={handleInputChange} error={errors.country} placeholder="Country" />
                <InputGroup label="City" name="city" value={formData.city} onChange={handleInputChange} error={errors.city} placeholder="City" />
              </form>
            </div>

            {/* Payment Method Section */}
            <div className="glass-panel p-8 sm:p-10">
              <h2 className="text-xl font-medium text-white mb-8 flex items-center gap-3 tracking-wide">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center">2</span>
                Payment Method
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <PaymentOption
                  id="card"
                  icon={FaCreditCard}
                  label="Credit Card"
                  selected={paymentMethod === 'card'}
                  onClick={() => { setPaymentMethod('card'); setErrors({}); }}
                />
                <PaymentOption
                  id="paypal"
                  icon={FaPaypal}
                  label="PayPal"
                  selected={paymentMethod === 'paypal'}
                  onClick={() => { setPaymentMethod('paypal'); setErrors({}); }}
                />
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  <InputGroup label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} error={errors.cardNumber} placeholder="0000 0000 0000 0000" full />
                  <div className="grid grid-cols-2 gap-6">
                    <InputGroup label="Expiration Date" name="expDate" value={formData.expDate} onChange={handleInputChange} error={errors.expDate} placeholder="MM/YY" />
                    <InputGroup label="CVC" name="cvc" value={formData.cvc} onChange={handleInputChange} error={errors.cvc} placeholder="123" />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="glass-panel p-8 sticky top-28">
              <h2 className="text-xl font-medium text-white mb-6 tracking-wide">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                      <img src={item.image} alt="" className="w-14 h-14 rounded-xl object-cover bg-black/20" />
                      <div className="flex-grow">
                        <p className="text-sm text-white font-medium line-clamp-1 tracking-wide">{item.title}</p>
                        <p className="text-xs text-cyan-400 font-semibold mt-1">
                          {item.price === 0 || item.price === 'Free' ? 'Free' : `$${item.price}`}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500 text-center py-4">Your cart is empty.</p>
                )}
              </div>

              <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                <div className="flex justify-between text-zinc-400 text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-zinc-400 text-sm"><span>Tax (14%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-white font-bold text-lg pt-4 border-t border-zinc-800/50">
                  <span className="tracking-wide">Total</span>
                  <span className="text-cyan-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing || !cartItems || cartItems.length === 0}
                className="btn-primary w-full py-4 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-zinc-600">
                <FaShieldAlt className="text-emerald-400 text-sm" />
                Secure SSL Encryption
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---
const InputGroup = ({ label, name, value, onChange, error, placeholder, type = "text", full }) => (
  <div className={`flex flex-col ${full ? "col-span-1 md:col-span-2" : ""}`}>
    <label className="label-text mb-2">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field tracking-wider w-full ${error ? '!border-red-500 focus:!border-red-500' : ''}`}
      />
    </div>
    {error && <span className="text-rose-400 text-xs font-medium mt-1.5 ml-1">{error}</span>}
  </div>
);

const PaymentOption = ({ id, icon: Icon, label, selected, onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl border transition-all duration-300 ${
      selected
        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.08)]'
        : 'bg-transparent border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-300 hover:bg-zinc-800/40'
    }`}
  >
    <Icon className={`text-lg ${selected ? 'text-cyan-400' : ''}`} />
    <span className="font-medium tracking-wide text-sm">{label}</span>
  </button>
);

export default CheckoutPage;