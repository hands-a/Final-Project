import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartPage from '../pages/cart/CartPage';
import Hero from '../pages/home/Hero';
import HomeContent from '../pages/home/HomeContent';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import VerifyCodePage from '../pages/auth/VerifyCodePage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import CheckoutPage from '../pages/checkout/CheckoutPage';
import SuccessPage from '../pages/checkout/SuccessPage';
import CoursesPage from '../pages/courses/CoursesPage';
import CourseDetailsPage from '../pages/courses/CourseDetailsPage';
import MyCoursesPage from '../pages/dashboard/MyCoursesPage';
import CoursePlayerPage from '../pages/dashboard/CoursePlayerPage';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-code" element={<VerifyCodePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/learn/:id" element={<CoursePlayerPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;