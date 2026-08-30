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
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-600/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="bg-grid-mesh absolute inset-0 pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-[460px]">
        <div className="glass-panel p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl mb-4 shadow-md">
              <FaKey className="text-cyan-400 text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Forgot Password?</h1>
            <p className="text-zinc-500 text-sm">Enter your email to receive a reset code.</p>
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
                        className={`input-field ${errors.email && touched.email ? '!border-rose-500/50 focus:!border-rose-500 focus:!ring-rose-500/20' : ''}`} 
                    />  
                    <ErrorMessage name="email" component="div" className="text-rose-400 text-xs mt-1.5 ml-1" />
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
                    <Link to="/login" className="text-zinc-500 hover:text-cyan-400 text-sm font-medium transition-colors duration-300 flex items-center justify-center gap-2 group">
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