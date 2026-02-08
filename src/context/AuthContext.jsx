
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // بنشوف هل فيه مستخدم متسجل في الذاكرة ولا لأ
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // دالة تسجيل الدخول (بنحفظ البيانات)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // دالة تسجيل الخروج (بنمسح البيانات)
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // اختياري: نمسح السلة لو خرج
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);