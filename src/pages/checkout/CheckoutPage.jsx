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
  // Context & Hooks
  const { cartItems, setCartItems } = useCart(); 
  const studentContext = useStudent(); 
  const enrollCourses = studentContext?.enrollCourses;
  const navigate = useNavigate();

  // Local State
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
  const subtotal = cartItems ? cartItems.reduce((acc, item) => acc + Number(item.price), 0) : 0;
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Payment Submit Handler
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});

    try {
      await checkoutSchema.validate(
        { ...formData, paymentMethod }, 
        { abortEarly: false }
      );

      setTimeout(() => {
        try {
          if (typeof enrollCourses === 'function') {
            enrollCourses(cartItems);
          }

          if (typeof setCartItems === 'function') {
            setCartItems([]); 
          }
          localStorage.removeItem('cart'); 

          setIsProcessing(false);
          navigate('/success'); 
          
        } catch (error) {
          console.error("Checkout Error:", error);
          setIsProcessing(false);
          navigate('/success');
        }
      }, 2000);

    } catch (err) {
      const validationErrors = {};
      if (err.inner) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }
      setErrors(validationErrors);
      setIsProcessing(false);
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden text-slate-300">      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <h1 className="text-3xl font-light text-white mb-8 tracking-widest uppercase">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <div className="lg:w-2/3 space-y-8">
            
            {/* Billing Details Section */}
            <div className="glass-panel p-8 sm:p-10">
              <h2 className="text-xl font-medium text-white mb-8 flex items-center gap-3 tracking-wide">
                <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 text-sm font-bold flex items-center justify-center shadow-lg text-white">1</span>
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
                <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 text-sm font-bold flex items-center justify-center shadow-lg text-white">2</span>
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
                <div className="space-y-6 animate-fadeIn">
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
                    <div key={item.id || item.documentId} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                      <img src={item.image} alt="" className="w-14 h-14 rounded-xl object-cover bg-black/20" />
                      <div className="flex-grow">
                        <p className="text-sm text-white font-medium line-clamp-1 tracking-wide">{item.title}</p>
                        <p className="text-xs text-pink-400 mt-1">${item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 font-light text-center py-4">Your cart is empty.</p>
                )}
              </div>

              <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                <div className="flex justify-between text-slate-400 font-light text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-400 font-light text-sm"><span>Tax (14%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-white font-bold text-lg pt-4 border-t border-white/10">
                  <span className="tracking-wide">Total</span>
                  <span className="text-pink-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing || !cartItems || cartItems.length === 0}
                className="btn-primary w-full py-4 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest text-slate-500">
                <FaShieldAlt className="text-green-400 text-sm opacity-80" />
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
    {error && <span className="text-red-500 text-[11px] font-medium mt-1.5 ml-1">{error}</span>}
  </div>
);

const PaymentOption = ({ id, icon: Icon, label, selected, onClick }) => (
  <button 
    onClick={onClick}
    type="button"
    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl border transition-all ${
      selected 
      ? 'bg-gradient-to-r from-pink-500/10 to-violet-600/10 border-pink-400/50 text-white shadow-[0_0_15px_rgba(244,114,182,0.1)]' 
      : 'bg-transparent border-white/10 text-slate-500 hover:border-white/30 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon className={`text-lg ${selected ? 'text-pink-400' : ''}`} />
    <span className="font-medium tracking-wide text-sm">{label}</span>
  </button>
);

export default CheckoutPage;