import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { StudentProvider } from './context/StudentContext';
import { AuthProvider } from './context/AuthContext';
import Global3D from './components/3d/Global3D'; // 👈 استيراد الـ 3D

function App() {
  return (
    // الترتيب بتاعك ممتاز جداً: Auth الأول، ثم Student، ثم Cart
    <AuthProvider>
      <StudentProvider>
        <CartProvider>
          
          {/* 👇 1. حطينا خلفية الـ 3D هنا عشان تغطي الموقع كله */}
          <Global3D />
          
          {/* 👇 2. غلفنا الموقع بـ relative عشان نضمن إنه دايماً فوق الـ 3D */}
          {/* غلفنا الموقع بـ bg-transparent عشان الشفافية */}
<div className="relative z-0 min-h-screen bg-transparent">
  <AppRoutes />
</div>

        </CartProvider>
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;