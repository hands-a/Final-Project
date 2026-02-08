import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // 👈 استدعاء

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 استدعاء دالة الدخول

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
    // محاكاة عملية تسجيل دخول (هنا المفروض تكلم الـ API)
    setTimeout(() => {
      const userData = {
        name: values.email.split('@')[0], // اسم مؤقت من الإيميل
        email: values.email,
        role: 'student'
      };
      
      login(userData); // 👈 تفعيل الدخول في السيستم
      setSubmitting(false);
      navigate('/'); // 👈 توجيه للصفحة الرئيسية
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-900 via-[#1a103c] to-slate-900 relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] opacity-70 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[100px] opacity-70 animate-pulse-slow pointer-events-none" style={{animationDelay: '1.5s'}}></div>

      <div className="relative z-10 w-full max-w-[550px] mt-15">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
          
          <div className="text-center mb-6">
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
              <Form className="space-y-4">
                
                {/* Email Input */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-4 text-slate-400 group-focus-within:text-pink-400 transition-colors">
                      <FaEnvelope />
                    </div>
                    <Field 
                      type="email"
                      name="email"
                      placeholder="name@example.com" 
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl focus:ring-1 outline-none transition-all text-white text-sm placeholder:text-slate-500
                        ${errors.email && touched.email 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-white/10 focus:border-pink-400/50 focus:ring-pink-400/50'}`} 
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-400 text-[10px] mt-1 ml-1" />
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 ml-1">
                    <label className="block text-xs font-medium text-slate-300">Password</label>
                    <Link to="/forgot-password" className="text-[10px] text-pink-400 hover:text-pink-300 transition-colors">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-4 text-slate-400 group-focus-within:text-pink-400 transition-colors">
                      <FaLock />
                    </div>
                    <Field 
                      type="password"
                      name="password"
                      placeholder="Enter your Password" 
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl focus:ring-1 outline-none transition-all text-white text-sm placeholder:text-slate-500
                        ${errors.password && touched.password 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-white/10 focus:border-pink-400/50 focus:ring-pink-400/50'}`} 
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-400 text-[10px] mt-1 ml-1" />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3.5 mt-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-wait"
                >
                  {isSubmitting ? 'Logging in...' : (
                    <>Log In Now <FaArrowRight /></>
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] uppercase tracking-wider">Or continue with</span>
                    <div className="flex-grow border-t border-white/10"></div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex justify-center items-center gap-2 text-sm group">
                    <FaGoogle className="text-red-400 group-hover:scale-110 transition-transform" /> Google
                  </button>
                  <button type="button" className="py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex justify-center items-center gap-2 text-sm group">
                    <FaFacebook className="text-blue-500 group-hover:scale-110 transition-transform" /> Facebook
                  </button>
                </div>

              </Form>
            )}
          </Formik>

          <p className="text-center mt-6 text-slate-400 text-sm">
            Don't have an account? <Link to="/register" className="text-pink-400 font-bold hover:text-pink-300 transition-colors ml-1">Sign Up Free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;