import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useStudent } from '../../context/StudentContext'; 
import { FaCreditCard, FaPaypal, FaShieldAlt } from 'react-icons/fa';

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useCart(); 
  // 💡 تأمين الـ Context: لو مش موجود ميعملش Crash
  const studentContext = useStudent(); 
  const enrollCourses = studentContext?.enrollCourses;

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // حساب الإجمالي
  const subtotal = cartItems ? cartItems.reduce((acc, item) => acc + Number(item.price), 0) : 0;
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      try {
        // 1. نقل الكورسات (مع التأكد إن الدالة موجودة عشان الكود ميعلقش)
        if (typeof enrollCourses === 'function') {
          enrollCourses(cartItems);
        }

        // 2. تفريغ السلة
        if (typeof setCartItems === 'function') {
          setCartItems([]); 
        }
        localStorage.removeItem('cart'); 

        setIsProcessing(false);
        navigate('/success'); 
        
      } catch (error) {
        console.error("Checkout Error:", error);
        // في حالة حدوث أي خطأ، الزرار هيرجع طبيعي وهينقلك بردو عشان ميفضلش معلق
        setIsProcessing(false);
        navigate('/success');
      }
    }, 2000);
  };

  return (
<div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <h1 className="text-3xl font-light text-white mb-8 tracking-widest uppercase">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <div className="lg:w-2/3 space-y-8">
            
            <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
              <h2 className="text-xl font-medium text-white mb-8 flex items-center gap-3 tracking-wide">
                <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 text-sm font-bold flex items-center justify-center shadow-lg">1</span>
                Billing Details
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="First Name" placeholder="Enter your first name" />
                <InputGroup label="Last Name" placeholder="Enter your last name" />
                <InputGroup label="Email Address" placeholder="Enter your email" type="email" full />
                <InputGroup label="Country" placeholder="Country" />
                <InputGroup label="City" placeholder="City" />
              </form>
            </div>

            <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
              <h2 className="text-xl font-medium text-white mb-8 flex items-center gap-3 tracking-wide">
                <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 text-sm font-bold flex items-center justify-center shadow-lg">2</span>
                Payment Method
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
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
                <div className="space-y-6 animate-fadeIn">
                  <InputGroup label="Card Number" placeholder="0000 0000 0000 0000" full />
                  <div className="grid grid-cols-2 gap-6">
                    <InputGroup label="Expiration Date" placeholder="MM/YY" />
                    <InputGroup label="CVC" placeholder="123" />
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="lg:w-1/3">
            <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 rounded-3xl sticky top-28 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
              <h2 className="text-xl font-medium text-white mb-6 tracking-wide">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5">
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
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium rounded-xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2 mb-6 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
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

const InputGroup = ({ label, placeholder, type = "text", full }) => (
  <div className={full ? "col-span-1 md:col-span-2" : ""}>
    <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">{label}</label>
    <div className="relative">
      <input 
        type={type} 
        placeholder={placeholder} 
        className="w-full bg-transparent border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider"
      />
    </div>
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