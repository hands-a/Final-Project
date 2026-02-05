import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaFacebook, FaRocket, FaCheckCircle } from 'react-icons/fa';

const RegisterPage = () => {
  const navigate = useNavigate();

  // 1. القيم المبدئية (تم التحديث)
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
    const validationSchema = Yup.object({
    firstName: Yup.string()
        .min(2, 'Too short')
        .required('First Name required'),
    lastName: Yup.string()
            .min(2, 'Too short')
            .required('Last Name required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Min 8 characters')
        .matches(/[0-9]/, 'Must contain a number')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match') 
        .required('Confirm Password is required'),
    });
    
    const onSubmit = (values) => {
    console.log("Register Data:", values);
    
    navigate('/login');
    };

    return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-900 via-[#1a103c] to-slate-900 relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
        
        
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] opacity-70 animate-pulse-slow pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[100px] opacity-70 animate-pulse-slow pointer-events-none" style={{animationDelay: '1.5s'}}></div>

      
        <div className="relative z-10 w-full max-w-[550px] mt-15">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
            
            <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
                <FaRocket className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">Create Account</h1>
            <p className="text-slate-300/80 text-sm">Join the future of development today.</p>
            </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                
                {/* الاسم الأول والأخير (جنب بعض) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">First Name</label>
                    <div className="relative group">
                      <div className="absolute top-3.5 left-4 text-slate-400 group-focus-within:text-pink-400 transition-colors">
                        <FaUser />
                      </div>
                      <Field 
                        type="text"
                        name="firstName"
                        placeholder="First Name" 
                        className={`w-full pl-10 pr-3 py-3 bg-white/5 border rounded-xl focus:ring-1 outline-none transition-all text-white text-sm placeholder:text-slate-500
                          ${errors.firstName && touched.firstName 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-white/10 focus:border-pink-400/50 focus:ring-pink-400/50'}`} 
                      />
                    </div>
                    <ErrorMessage name="firstName" component="div" className="text-red-400 text-[10px] mt-1 ml-1" />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Last Name</label>
                    <div className="relative group">
                      <div className="absolute top-3.5 left-4 text-slate-400 group-focus-within:text-pink-400 transition-colors">
                        <FaUser />
                      </div>
                      <Field 
                        type="text"
                        name="lastName"
                        placeholder="Last Name" 
                        className={`w-full pl-10 pr-3 py-3 bg-white/5 border rounded-xl focus:ring-1 outline-none transition-all text-white text-sm placeholder:text-slate-500
                          ${errors.lastName && touched.lastName 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-white/10 focus:border-pink-400/50 focus:ring-pink-400/50'}`} 
                      />
                    </div>
                    <ErrorMessage name="lastName" component="div" className="text-red-400 text-[10px] mt-1 ml-1" />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-4 text-slate-400 group-focus-within:text-pink-400 transition-colors">
                      <FaEnvelope />
                    </div>
                    <Field 
                      type="email"
                      name="email"
                      placeholder="Enter your email address" 
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl focus:ring-1 outline-none transition-all text-white text-sm placeholder:text-slate-500
                        ${errors.email && touched.email 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-white/10 focus:border-pink-400/50 focus:ring-pink-400/50'}`} 
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-400 text-[10px] mt-1 ml-1" />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Password</label>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-4 text-slate-400 group-focus-within:text-pink-400 transition-colors">
                      <FaLock />
                    </div>
                    <Field 
                      type="password"
                      name="password"
                      placeholder="Enter your password here" 
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl focus:ring-1 outline-none transition-all text-white text-sm placeholder:text-slate-500
                        ${errors.password && touched.password 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-white/10 focus:border-pink-400/50 focus:ring-pink-400/50'}`} 
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-400 text-[10px] mt-1 ml-1" />
                </div>

                
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-4 text-slate-400 group-focus-within:text-pink-400 transition-colors">
                      <FaCheckCircle />
                    </div>
                    <Field 
                      type="password"
                      name="confirmPassword"
                      placeholder="Enter Password Again" 
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl focus:ring-1 outline-none transition-all text-white text-sm placeholder:text-slate-500
                        ${errors.confirmPassword && touched.confirmPassword 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-white/10 focus:border-pink-400/50 focus:ring-pink-400/50'}`} 
                    />
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-[10px] mt-1 ml-1" />
                </div>

                
                <button type="submit" className="w-full py-3.5 mt-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Create Account <FaArrowRight />
                </button>

                {/* Divider */}
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] uppercase tracking-wider">Or continue with</span>
                    <div className="flex-grow border-t border-white/10"></div>
                </div>

                {/* Social Buttons */}
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
            Already have an account? <Link to="/login" className="text-pink-400 font-bold hover:text-pink-300 transition-colors ml-1">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;