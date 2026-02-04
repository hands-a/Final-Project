import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaFacebook } from 'react-icons/fa';

const LoginPage = () => {
    const navigate = useNavigate();

    
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

    
    const onSubmit = (values) => {
    console.log("Login Data:", values);
    
    navigate('/');
    };

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#1a103c] to-slate-900 relative overflow-hidden flex items-center justify-center p-6">
        
        
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] opacity-70 animate-pulse-slow pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] opacity-70 animate-pulse-slow pointer-events-none" style={{animationDelay: '2s'}}></div>

            
        <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl">
            
            <div className="text-center mb-8">
            
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-slate-300/80 text-sm">Enter your credentials to access your account.</p>
            </div>

            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
            {({ errors, touched }) => (
                <Form className="space-y-6">
                
                
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Email</label>
                    <div className="relative group">
                    <div className="absolute top-4 left-4 text-slate-400 group-focus-within:text-violet-400 transition-colors">
                        <FaEnvelope />
                    </div>
                    
                    <Field 
                        type="email"
                        name="email"
                        placeholder="name@example.com" 
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-xl focus:ring-1 outline-none transition-all text-white placeholder:text-slate-500
                        ${errors.email && touched.email 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-white/10 focus:border-violet-400/50 focus:ring-violet-400/50'}`} 
                    />
                    </div>
                    
                    <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-1 ml-1" />
                </div>

                
                <div>
                    <div className="flex justify-between items-center mb-2 ml-1">
                    <label className="block text-sm font-medium text-slate-300">Password</label>
                    <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">? Forgot Password</a>
                    </div>
                    <div className="relative group">
                    <div className="absolute top-4 left-4 text-slate-400 group-focus-within:text-violet-400 transition-colors">
                        <FaLock />
                    </div>
                    <Field 
                        type="password"
                        name="password"
                        placeholder="Enter your Password" 
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-xl focus:ring-1 outline-none transition-all text-white placeholder:text-slate-500
                        ${errors.password && touched.password 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-white/10 focus:border-violet-400/50 focus:ring-violet-400/50'}`} 
                    />
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-400 text-xs mt-1 ml-1" />
                    </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-violet-600/20 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Log In Now <FaArrowRight />
                </button>

                {/* Divider */}
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase tracking-wider">Or continue with</span>
                    <div className="flex-grow border-t border-white/10"></div>
                </div>

                
                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex justify-center items-center gap-2 group">
                    <FaGoogle className="text-red-400 group-hover:scale-110 transition-transform" /> Google
                    </button>
                    <button type="button" className="py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex justify-center items-center gap-2 group">
                    <FaFacebook className="text-blue-500 group-hover:scale-110 transition-transform" /> Facebook
                    </button>
                </div>

                </Form>
            )}
            </Formik>

            <p className="text-center mt-8 text-slate-400 text-sm">
            Don't have an account? <Link to="/register" className="text-violet-400 font-bold hover:text-violet-300 transition-colors ml-1">Sign Up Free</Link>
            </p>
        </div>
    </div>
    </div>
);
};

export default LoginPage;