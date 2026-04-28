import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    let role = 'student';
    if (userData.email.includes('admin') || userData.email.includes('instructor')) {
      role = 'admin'; 
    }
    const userWithRole = { 
      ...userData, 
      role: role, 
      avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`
    };
    setUser(userWithRole);
    localStorage.setItem('user', JSON.stringify(userWithRole));
  }; 

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // ضفنا updateUser هنا عشان باقي الصفحات تشوفها
  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};