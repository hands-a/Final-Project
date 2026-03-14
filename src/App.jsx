import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { StudentProvider } from './context/StudentContext';
import { AuthProvider } from './context/AuthContext';
import Global3D from './components/3d/Global3D'; 

function App() {
  return (
    // 👇 1. حطينا اللون الكحلي هنا عشان يبقى الأرضية الأساسية للموقع كله
    <div className="bg-[#050511] min-h-screen font-sans">
      <AuthProvider>
        <StudentProvider>
          <CartProvider>
            
            {/* 👇 2. الـ 3D شغال هنا فوق اللون الكحلي */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <Global3D />
            </div>
            
            {/* 👇 3. محتوى الصفحات شفاف فوق الـ 3D */}
            <div className="relative z-10 min-h-screen bg-transparent">
              <AppRoutes />
            </div>

          </CartProvider>
        </StudentProvider>
      </AuthProvider>
    </div>
  );
}

export default App;