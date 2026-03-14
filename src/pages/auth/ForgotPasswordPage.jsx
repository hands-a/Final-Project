import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowRight, FaKey, FaArrowLeft } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const initialValues = { email: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const onSubmit = (values) => {
    console.log("Send Code to:", values.email);
    navigate('/verify-code');
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      
      <div className="relative z-10 w-full max-w-[500px]">
        {/* Pure Water-like Glass Card / كارت زجاجي نقي مثل الماء */}
        <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
            
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
                <FaKey className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Forgot Password?</h1>
            <p className="text-slate-300/80 text-sm">Enter your email to receive a reset code.</p>
          </div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched }) => (
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

                {/* Colorful Submit Button / زر الإرسال الملون */}
                <button type="submit" className="w-full py-3.5 mt-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Send Code <FaArrowRight />
                </button>

                {/* Back to Login Link / رابط العودة لتسجيل الدخول */}
                <div className="text-center mt-6">
                    <Link to="/login" className="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 group">
                    <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" /> Back to Login
                    </Link>
                </div>

                </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;