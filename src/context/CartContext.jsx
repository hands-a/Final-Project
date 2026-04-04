import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (course) => {
    const isExist = cartItems.find((item) => item.id === course.id);
    if (isExist) return; 
    setCartItems([...cartItems, course]);
  };

  const removeFromCart = (courseId) => {
    setCartItems(cartItems.filter((item) => item.id !== courseId));
  };

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);