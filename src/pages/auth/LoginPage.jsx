import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaLock, FaArrowRight, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  // Initial Form State
  const initialValues = {
    email: '',
    password: '',
  };

  // Form Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  // Handle Form Submission
  const onSubmit = (values, { setSubmitting }) => {
    // Simulating an API call delay
    setTimeout(() => {
      const userData = {
        name: values.email.split('@')[0], 
        email: values.email,
        role: 'student' // Default role
      };
      
      login(userData); 
      setSubmitting(false);
      
      // Role-based routing
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
        {/* Reusable Glass Panel Class */}
        <div className="glass-panel p-8 sm:p-10">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
              <FaLock className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">Welcome Back</h1>
            <p className="text-slate-300/80 text-sm">Enter your credentials to access your account.</p>
          </div>

          {/* Formik Integration */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-5">
                
                {/* Email Field */}
                <div>
                  <label className="label-text">Email Address</label>
                  <Field 
                    type="email"
                    name="email"
                    placeholder="name@example.com" 
                    className={`input-field ${errors.email && touched.email ? '!border-red-500/50 focus:!border-red-500 focus:!ring-red-500/50' : ''}`} 
                  />
                  <ErrorMessage name="email" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2 ml-1">
                    <label className="label-text !mb-0 !ml-0">Password</label>
                    <Link to="/forgot-password" className="text-[10px] text-pink-400 hover:text-pink-300 transition-colors uppercase tracking-wider">
                      Forgot Password?
                    </Link>
                  </div>
                  <Field 
                    type="password"
                    name="password"
                    placeholder="Enter your Password" 
                    className={`input-field ${errors.password && touched.password ? '!border-red-500/50 focus:!border-red-500 focus:!ring-red-500/50' : ''}`} 
                  />
                  <ErrorMessage name="password" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 mt-2"
                >
                  {isSubmitting ? 'Logging in...' : (
                    <>Log In Now <FaArrowRight /></>
                  )}
                </button>

                {/* Divider Line */}
                <div className="relative flex py-2 items-center opacity-70">
                    <div className="grow border-t border-white/10"></div>
                    <span className="shrink-0 mx-4 text-slate-400 text-[10px] uppercase tracking-wider">Or continue with</span>
                    <div className="grow border-t border-white/10"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Note: 'group' class is kept inline to avoid Vite compiler errors */}
                  <button type="button" className="btn-social group">
                    <FaGoogle className="text-red-400 group-hover:scale-110 transition-transform" /> Google
                  </button>
                  <button type="button" className="btn-social group">
                    <FaFacebook className="text-blue-500 group-hover:scale-110 transition-transform" /> Facebook
                  </button>
                </div>

              </Form>
            )}
          </Formik>

          {/* Footer Link */}
          <p className="text-center mt-6 text-slate-300 text-sm">
            Don't have an account? <Link to="/register" className="text-pink-400 font-bold hover:text-pink-300 transition-colors ml-1">Sign Up Free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;