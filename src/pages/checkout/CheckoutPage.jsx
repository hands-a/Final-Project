import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useStudent } from '../../context/StudentContext'; // 👈 استدعاء هام جداً
import { FaCreditCard, FaPaypal, FaLock, FaShieldAlt } from 'react-icons/fa';

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useCart(); 
  const { enrollCourses } = useStudent(); // 👈 دالة التسجيل
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price), 0);
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // 1. نقل الكورسات من السلة لصفحة الطالب
      enrollCourses(cartItems);

      // 2. تفريغ السلة تماماً
      setCartItems([]); 
      localStorage.removeItem('cart'); // زيادة تأكيد لمسح الذاكرة

      setIsProcessing(false);
      navigate('/success'); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Forms */}
          <div className="lg:w-2/3 space-y-8">
            
            {/* 1. Billing Details */}
            <div className="bg-[#13151d] border border-white/5 p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-xs flex items-center justify-center">1</span>
                Billing Details
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="First Name" placeholder="Enter your first name" />
                <InputGroup label="Last Name" placeholder="Enter your last name" />
                <InputGroup label="Email Address" placeholder="Enter your email" type="email" full />
                <InputGroup label="Country" placeholder="Country" />
                <InputGroup label="City" placeholder="City" />
              </form>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-[#13151d] border border-white/5 p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-xs flex items-center justify-center">2</span>
                Payment Method
              </h2>
              
              <div className="flex gap-4 mb-6">
                <PaymentOption 
                  id="card" 
                  icon={FaCreditCard} 
                  label="Credit Card" 
                  selected={paymentMethod === 'card'} 
                  onClick={() => setPaymentMethod('card')} 
                />
                <PaymentOption 
                  id="paypal" 
                  icon={FaPaypal} 
                  label="PayPal" 
                  selected={paymentMethod === 'paypal'} 
                  onClick={() => setPaymentMethod('paypal')} 
                />
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fadeIn">
                  <InputGroup label="Card Number" placeholder="0000 0000 0000 0000" icon={FaCreditCard} full />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Expiration Date" placeholder="MM/YY" />
                    <InputGroup label="CVC" placeholder="123" icon={FaLock} />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-[#13151d] border border-white/10 p-8 rounded-3xl sticky top-28">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-contain bg-black/20 p-1" />
                    <div className="flex-grow">
                      <p className="text-sm text-white font-bold line-clamp-1">{item.title}</p>
                      <p className="text-xs text-slate-400">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 border-t border-white/10 pt-4">
                <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-400"><span>Tax (14%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/5">
                  <span>Total</span>
                  <span className="text-purple-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <FaShieldAlt className="text-green-500" />
                Secure SSL Encryption
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


const InputGroup = ({ label, placeholder, type = "text", full, icon: Icon }) => (
  <div className={full ? "col-span-1 md:col-span-2" : ""}>
    <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <input 
        type={type} 
        placeholder={placeholder} 
        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
      />
      {Icon && <Icon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />}
    </div>
  </div>
);

const PaymentOption = ({ id, icon: Icon, label, selected, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border transition-all ${
      selected 
      ? 'bg-purple-600/10 border-purple-500 text-white' 
      : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/5'
    }`}
  >
    <Icon className={selected ? 'text-purple-400' : ''} />
    <span className="font-bold text-sm">{label}</span>
  </button>
);

export default CheckoutPage;