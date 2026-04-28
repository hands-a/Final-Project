import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowRight, FaKey, FaArrowLeft } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  // Initial Form State
  const initialValues = { email: '' };

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  // Handle Form Submission
  const onSubmit = (values, { setSubmitting }) => {
    // Simulating API call delay for UX
    setTimeout(() => {
      console.log("Send Code to:", values.email);
      setSubmitting(false);
      navigate('/verify-code');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      
      <div className="relative z-10 w-full max-w-[500px]">
        {/* Reusable Glass Panel */}
        <div className="glass-panel p-8 sm:p-10">
            
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
                <FaKey className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Forgot Password?</h1>
            <p className="text-slate-300/80 text-sm">Enter your email to receive a reset code.</p>
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

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 mt-2"
                >
                    {isSubmitting ? 'Sending...' : (
                      <>Send Code <FaArrowRight /></>
                    )}
                </button>

                {/* Footer Link */}
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