import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaLock, FaRocket } from 'react-icons/fa';

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  // Initial Form State
  const initialValues = { password: '', confirmPassword: '' };

  // Validation Schema
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Min 8 characters')
      .matches(/[0-9]/, 'Must contain a number')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  // Handle Form Submission
  const onSubmit = (values, { setSubmitting }) => {
    // Simulating API call delay
    setTimeout(() => {
      console.log("New Password Set:", values);
      setSubmitting(false);
      navigate('/login');
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
              <FaLock className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Reset Password</h1>
            <p className="text-slate-300/80 text-sm">Create a new strong password.</p>
          </div>

          {/* Formik Integration */}
          <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-5">
                
                {/* New Password Input */}
                <div>
                  <label className="label-text">New Password</label>
                  <Field 
                    type="password"
                    name="password"
                    placeholder="••••••••" 
                    // Added tracking-widest specifically here for the bullet points effect
                    className={`input-field tracking-widest ${errors.password && touched.password ? '!border-red-500/50 focus:!border-red-500 focus:!ring-red-500/50' : ''}`} 
                  />
                  <ErrorMessage name="password" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="label-text">Confirm Password</label>
                  <Field 
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••" 
                    className={`input-field tracking-widest ${errors.confirmPassword && touched.confirmPassword ? '!border-red-500/50 focus:!border-red-500 focus:!ring-red-500/50' : ''}`} 
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 mt-2"
                >
                  {isSubmitting ? 'Updating...' : (
                    <>Set New Password <FaRocket className="text-sm opacity-90" /></>
                  )}
                </button>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;