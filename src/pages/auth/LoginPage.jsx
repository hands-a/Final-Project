import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaLock, FaArrowRight, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Simulate Login Logic
    setTimeout(() => {
      const userData = {
        name: values.email.split('@')[0], 
        email: values.email,
        role: 'student'
      };
      
      login(userData); 
      setSubmitting(false);
      
      // Role-Based Navigation Logic
      if (values.email.includes('admin')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      
      <div className="relative z-10 w-full max-w-[500px]">
        {/* Pure Water-like Glass Card / كارت زجاجي نقي مثل الماء */}
        <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
              <FaLock className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">Welcome Back</h1>
            <p className="text-slate-300/80 text-sm">Enter your credentials to access your account.</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-5">
                
                {/* Email Input / حقل البريد الإلكتروني */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Email Address</label>
                  <Field 
                    type="email"
                    name="email"
                    placeholder="name@example.com" 
                    className={`w-full px-4 py-3 bg-transparent border rounded-xl focus:bg-white/5 outline-none transition-all text-white text-sm placeholder:text-slate-500/50
                      ${errors.email && touched.email 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50'}`} 
                  />
                  <ErrorMessage name="email" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Password Input / حقل كلمة المرور */}
                <div>
                  <div className="flex justify-between items-center mb-2 ml-1">
                    <label className="block text-[11px] uppercase tracking-widest text-slate-300">Password</label>
                    <Link to="/forgot-password" className="text-[10px] text-pink-400 hover:text-pink-300 transition-colors uppercase tracking-wider">
                      Forgot Password?
                    </Link>
                  </div>
                  <Field 
                    type="password"
                    name="password"
                    placeholder="Enter your Password" 
                    className={`w-full px-4 py-3 bg-transparent border rounded-xl focus:bg-white/5 outline-none transition-all text-white text-sm placeholder:text-slate-500/50
                      ${errors.password && touched.password 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50'}`} 
                  />
                  <ErrorMessage name="password" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Colorful Submit Button / زر الإرسال الملون */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3.5 mt-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-wait"
                >
                  {isSubmitting ? 'Logging in...' : (
                    <>Log In Now <FaArrowRight /></>
                  )}
                </button>

                {/* Divider / فاصل */}
                <div className="relative flex py-2 items-center opacity-70">
                    <div className="grow border-t border-white/10"></div>
                    <span className="shrink-0 mx-4 text-slate-400 text-[10px] uppercase tracking-wider">Or continue with</span>
                    <div className="grow border-t border-white/10"></div>
                </div>

                {/* Social Login / أزرار تسجيل الدخول الاجتماعي */}
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="py-2.5 bg-transparent border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 transition-all flex justify-center items-center gap-2 text-sm group">
                    <FaGoogle className="text-red-400 group-hover:scale-110 transition-transform" /> Google
                  </button>
                  <button type="button" className="py-2.5 bg-transparent border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 transition-all flex justify-center items-center gap-2 text-sm group">
                    <FaFacebook className="text-blue-500 group-hover:scale-110 transition-transform" /> Facebook
                  </button>
                </div>

              </Form>
            )}
          </Formik>

          {/* Register Link / رابط التسجيل */}
          <p className="text-center mt-6 text-slate-300 text-sm">
            Don't have an account? <Link to="/register" className="text-pink-400 font-bold hover:text-pink-300 transition-colors ml-1">Sign Up Free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;