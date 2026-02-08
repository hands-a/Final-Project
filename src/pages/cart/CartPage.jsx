import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowRight, FaTag, FaLock } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price), 0);
  const tax = subtotal * 0.14; 
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart <span className="text-slate-500 text-lg font-normal">({cartItems.length} courses)</span></h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* List */}
            <div className="lg:w-2/3 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-[#13151d] border border-white/5 p-4 rounded-2xl items-center group hover:border-white/10 transition-colors">
                  
                  {/* Image */}
                  <Link to={`/courses/${item.id}`} className="w-full sm:w-40 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-[#0f1119] p-4 flex items-center justify-center">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </Link>

                  <div className="flex-grow text-center sm:text-left">
                    <Link to={`/courses/${item.id}`} className="text-white font-bold text-lg hover:text-purple-400 transition-colors line-clamp-2">
                      {item.title}
                    </Link>
                    <p className="text-slate-400 text-sm mt-1">By {item.instructor}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                      <span className="bg-white/5 text-slate-300 text-xs px-2 py-1 rounded border border-white/5">{item.level}</span>
                      <span className="bg-white/5 text-slate-300 text-xs px-2 py-1 rounded border border-white/5">{item.lessons} Lessons</span>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-center border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                    <span className="text-purple-400 font-bold text-xl">${item.price}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white/5"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-1/3 h-fit lg:sticky lg:top-28">
              <div className="bg-[#13151d] border border-white/10 p-8 rounded-3xl">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tax (14%)</span>
                    <span className="text-white font-bold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg text-white font-bold">Total</span>
                  <span className="text-3xl text-purple-400 font-bold">${total.toFixed(2)}</span>
                </div>

                <div className="relative mb-6">
                  <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Coupon Code" 
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-20 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                    Apply
                  </button>
                </div>

                {/* 👇 هنا التغيير: خليناه Link يودي لصفحة Checkout */}
                <Link to="/checkout" className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2 mb-4">
                  Checkout <FaArrowRight />
                </Link>
                
                <p className="text-center text-slate-500 text-xs flex items-center justify-center gap-2">
                  <FaLock className="text-xs" /> Secure Checkout
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-[#13151d] border border-white/5 rounded-3xl">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTag className="text-3xl text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-8">Looks like you haven't added any courses yet.</p>
            <Link to="/courses" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all">
              Browse Courses
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartPage;