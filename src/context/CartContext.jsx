import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. استرجاع السلة من الذاكرة
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. إضافة كورس
  const addToCart = (course) => {
    const isExist = cartItems.find((item) => item.id === course.id);
    if (isExist) return; 
    setCartItems([...cartItems, course]);
  };

  // 3. حذف كورس
  const removeFromCart = (courseId) => {
    setCartItems(cartItems.filter((item) => item.id !== courseId));
  };

  // 4. حفظ التغييرات في الذاكرة
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    // 🔥 التعديل هنا: ضفنا setCartItems في القائمة عشان CheckoutPage تشوفها
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);