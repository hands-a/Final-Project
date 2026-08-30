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
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-600/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="bg-grid-mesh absolute inset-0 pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-[460px]">
        <div className="glass-panel p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl mb-4 shadow-md">
              <FaLock className="text-cyan-400 text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-zinc-500 text-sm">Create a new strong password.</p>
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
                    placeholder="new password" 
                    // Added tracking-widest specifically here for the bullet points effect
                    className={`input-field tracking-widest ${errors.password && touched.password ? '!border-rose-500/50 focus:!border-rose-500 focus:!ring-rose-500/20' : ''}`}
                  />
                  <ErrorMessage name="password" component="div" className="text-rose-400 text-xs mt-1.5 ml-1" />
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="label-text">Confirm Password</label>
                  <Field 
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password" 
                    className={`input-field tracking-widest ${errors.confirmPassword && touched.confirmPassword ? '!border-red-500/50 focus:!border-red-500 focus:!ring-red-500/50' : ''}`} 
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-xs mt-1.5 ml-1" />
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