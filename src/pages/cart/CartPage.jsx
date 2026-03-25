import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowRight, FaTag, FaLock } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  // 💡 التعديل هنا: حسبة ذكية وآمنة جداً عشان لو السعر بكلمة "Free" أو فيه مشكلة الكارت مايضربش
  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price);
    return acc + (isNaN(price) ? 0 : price);
  }, 0);
  
  const tax = subtotal * 0.14; 
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <h1 className="text-3xl md:text-4xl font-light text-white mb-10 tracking-wide">
          Shopping Cart <span className="text-slate-500 text-lg md:text-xl font-light">({cartItems?.length || 0} courses)</span>
        </h1>

        {cartItems && cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            
            {/* --- Cart Items List --- */}
            <div className="lg:w-2/3 space-y-6">
              {cartItems.map((item, index) => {
                // 💡 التعديل هنا: بنأمن الـ ID والدروس عشان الداتا بتاعت استرابي
                const uniqueId = item.documentId || item.id || index;
                const safeLessons = typeof item.lessons === 'object' 
                                    ? (item.lessons?.data?.length || item.lessons?.length || 0) 
                                    : (item.lessons || 0);

                return (
                  <div key={uniqueId} className="flex flex-col sm:flex-row gap-6 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl items-center group hover:bg-white/10 hover:border-white/20 transition-all shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                    
                    <Link to={`/courses/${uniqueId}`} className="w-full sm:w-48 h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-black/20 p-2 flex items-center justify-center border border-white/5">
                      <img src={item.image || 'https://via.placeholder.com/400x200'} alt={item.title} className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    <div className="flex-grow text-center sm:text-left w-full">
                      <Link to={`/courses/${uniqueId}`} className="text-white font-medium text-lg tracking-wide hover:text-pink-400 transition-colors line-clamp-2 mb-1">
                        {item.title || "Untitled Course"}
                      </Link>
                      <p className="text-slate-400 text-[11px] uppercase tracking-widest font-light mb-3">By {item.instructor || "Unknown"}</p>
                      
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <span className="bg-white/5 text-slate-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 shadow-sm">{item.level || "Beginner"}</span>
                        <span className="bg-white/5 text-slate-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 shadow-sm">{safeLessons} Lessons</span>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-center border-t sm:border-t-0 border-white/10 pt-5 sm:pt-0 sm:pl-6 sm:border-l">
                      <span className="text-pink-400 font-light tracking-wider text-2xl">
                        {item.price === 0 || item.price === "Free" ? "Free" : `$${item.price}`}
                      </span>
                      <button 
                        onClick={() => removeFromCart(uniqueId)}
                        className="text-slate-500 hover:text-red-400 transition-all p-3 rounded-xl bg-transparent border border-transparent hover:bg-red-500/10 hover:border-red-500/30 flex items-center justify-center gap-2 text-sm"
                        title="Remove from Cart"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* --- Order Summary --- */}
            <div className="lg:w-1/3 h-fit lg:sticky lg:top-32">
              <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
                <h2 className="text-xl font-medium text-white mb-8 tracking-wide border-b border-white/10 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-8 border-b border-white/10 pb-8">
                  <div className="flex justify-between text-slate-400 font-light text-sm">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-light text-sm">
                    <span>Tax (14%)</span>
                    <span className="text-white font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-10">
                  <span className="text-lg text-white font-light tracking-wide">Total</span>
                  <span className="text-3xl text-pink-400 font-light tracking-wider">${total.toFixed(2)}</span>
                </div>

                <div className="relative mb-8">
                  <input 
                    type="text" 
                    placeholder="Coupon Code" 
                    className="w-full bg-transparent border border-white/10 rounded-xl py-3.5 pl-4 pr-24 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider uppercase"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all shadow-sm">
                    Apply
                  </button>
                </div>

                <Link to="/checkout" className="w-full py-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium tracking-wide rounded-xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-3 mb-6 hover:scale-[1.02] active:scale-[0.98]">
                  Checkout <FaArrowRight className="text-sm font-light opacity-80" />
                </Link>
                
                <p className="text-center text-slate-500 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                  <FaLock className="text-sm opacity-80" /> Secure Checkout
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-24 bg-white/0 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col items-center justify-center max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <FaTag className="text-4xl text-slate-500 opacity-50" />
            </div>
            <h2 className="text-3xl font-light text-white mb-3 tracking-wide">Your cart is empty</h2>
            <p className="text-slate-400 mb-10 font-light text-sm">Looks like you haven't added any courses yet. Discover top-rated courses and start learning today.</p>
            <Link to="/courses" className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium py-3.5 px-10 rounded-xl transition-all shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98]">
              Browse Courses <FaArrowRight className="text-sm opacity-80" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartPage;