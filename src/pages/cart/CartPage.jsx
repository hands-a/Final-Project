import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowRight, FaLock, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price);
    return acc + (isNaN(price) ? 0 : price);
  }, 0);

  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden text-zinc-300">

      {/* Ambient */}
      <div className="absolute top-20 left-0 w-[500px] h-[400px] bg-cyan-900/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="mb-10 border-b border-zinc-800/50 pb-6">
          <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase mb-2 block">Checkout Flow</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Shopping Cart
            <span className="text-zinc-600 text-xl font-normal ml-3">({cartItems?.length || 0} items)</span>
          </h1>
        </div>

        {cartItems && cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-4">
              {cartItems.map((item, index) => {
                return (
                  <div key={item.id} className="glass-panel !p-5 flex flex-col sm:flex-row gap-5 items-center group transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/20 hover:shadow-cyan-500/5">

                    {/* Image */}
                    <Link to={`/courses/${item.id}`} className="w-full sm:w-44 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800/50 flex items-center justify-center">
                      <img src={item.image || 'https://via.placeholder.com/400x200'} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>

                    {/* Details */}
                    <div className="flex-grow text-center sm:text-left w-full">
                      <Link to={`/courses/${item.id}`} className="text-white font-semibold text-base hover:text-cyan-400 transition-colors duration-300 line-clamp-2 mb-1 block">
                        {item.title || "Untitled Course"}
                      </Link>
                      <p className="text-zinc-600 text-xs uppercase tracking-wider font-medium mb-3">by {item.instructor || "Unknown"}</p>

                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="bg-zinc-800/60 text-zinc-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-zinc-700/50">{item.level || "Beginner"}</span>
                        <span className="bg-zinc-800/60 text-zinc-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-zinc-700/50">
                          {Array.isArray(item.lessons) ? item.lessons.length : (item.lessons || 0)} Lessons
                        </span>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-row sm:flex-col items-center gap-4 w-full sm:w-auto justify-between sm:justify-center border-t sm:border-t-0 border-zinc-800/50 pt-4 sm:pt-0 sm:pl-5 sm:border-l sm:border-zinc-800/50">
                      <span className={`font-semibold text-2xl ${item.price === 0 || item.price === 'Free' ? 'text-emerald-400' : 'text-white'}`}>
                        {item.price === 0 || item.price === 'Free' ? 'Free' : `$${item.price}`}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-600 hover:text-rose-400 transition-all duration-300 p-2.5 rounded-xl border border-transparent hover:bg-rose-500/10 hover:border-rose-500/20"
                        title="Remove from Cart"
                      >
                        <FaTrash className="text-base" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 h-fit lg:sticky lg:top-32">
              <div className="glass-panel p-8">
                <h2 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800/50 pb-4 tracking-wide">Order Summary</h2>

                <div className="space-y-3 mb-6 border-b border-zinc-800/50 pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Tax (14%)</span>
                    <span className="text-white font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-7">
                  <span className="text-base text-white font-semibold">Total</span>
                  <span className="text-3xl font-bold text-cyan-400">${total.toFixed(2)}</span>
                </div>

                {/* Coupon */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="input-field !pr-24 uppercase tracking-wider"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs uppercase tracking-widest font-semibold px-3 py-2 rounded-lg transition-all duration-300">
                    Apply
                  </button>
                </div>

                <Link to="/checkout" className="btn-primary w-full py-4 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                  Checkout <FaArrowRight className="text-sm opacity-80" />
                </Link>

                <p className="text-center text-zinc-600 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                  <FaLock className="text-sm" /> Secure Checkout
                </p>
              </div>
            </div>

          </div>
        ) : (
          /* Empty State */
          <div className="glass-panel py-24 flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-zinc-800/60 border border-zinc-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="text-3xl text-zinc-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty</h2>
            <p className="text-zinc-500 mb-10 text-sm leading-relaxed max-w-sm">Discover top-rated courses and start your learning journey today.</p>
            <Link to="/courses" className="btn-primary py-3.5 px-10">
              Browse Courses <FaArrowRight className="text-sm opacity-80" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartPage;