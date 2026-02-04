import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer'
import Hero from '../pages/home/Hero';
import HomeContent from '../pages/home/HomeContent';    
import LoginPage from '../pages/auth/LoginPage';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
        <Footer/>
      </main>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        
        
        <Route path="/" element={
          <>
            <Hero />
            <HomeContent />
          </>
        } />
        
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;