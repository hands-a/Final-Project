import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // 1. استرجاع المستخدم من الذاكرة لو موجود
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. دالة تسجيل الدخول (Updated)
  const login = (userData) => {
    // محاكاة للصلاحيات (Roles Simulation)
    // في الواقع، البيانات دي بتيجي من السيرفر (Database)
    let role = 'student';
    
    // لو الإيميل فيه كلمة admin، نعتبره أدمن/مدرب
    if (userData.email.includes('admin') || userData.email.includes('instructor')) {
      role = 'instructor'; 
    }

    const userWithRole = { 
      ...userData, 
      role: role, 
      // صورة افتراضية لو مفيش صورة
      avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`
    };
    
    setUser(userWithRole);
    localStorage.setItem('user', JSON.stringify(userWithRole));
  };

  // 3. دالة تسجيل الخروج
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // ملحوظة: مبنمسحش الكورسات عشان لما يرجع يلاقيها، إلا لو عايز تمسح كل حاجة
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};