import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  // 1. لو مش مسجل دخول أصلاً -> روح لصفحة اللوجين
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. لو مسجل بس مش أدمن ولا انستراكتور -> روح للصفحة الرئيسية (مطرود)
  if (user.role !== 'admin' && user.role !== 'instructor') {
    return <Navigate to="/" replace />;
  }

  // 3. لو عدى الشروط -> اتفضل يا باشا
  return children;
};

export default AdminRoute;