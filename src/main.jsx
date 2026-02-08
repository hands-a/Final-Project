import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';      // 👈 تأكد من المسار
import { StudentProvider } from './context/StudentContext'; // 👈 تأكد من المسار

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* الترتيب هنا مهم جداً: Student الأول وبعدين Cart */}
      <StudentProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </StudentProvider>
    </BrowserRouter>
  </React.StrictMode>,
);