import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import { CourseProvider } from './context/CourseContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider> 
          <StudentProvider>
            <App />
          </StudentProvider>
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);