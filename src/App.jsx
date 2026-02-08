import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { StudentProvider } from './context/StudentContext';
import { AuthProvider } from './context/AuthContext'; // 👈 1. استدعاء

function App() {
  return (
    // 👈 2. الترتيب مهم: Auth الأول، ثم Student، ثم Cart
    <AuthProvider>
      <StudentProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;