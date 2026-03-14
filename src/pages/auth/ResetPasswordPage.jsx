import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaLock, FaRocket } from 'react-icons/fa';

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const initialValues = { password: '', confirmPassword: '' };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Min 8 characters')
      .matches(/[0-9]/, 'Must contain a number')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = (values) => {
    console.log("New Password Set:", values);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      
      <div className="relative z-10 w-full max-w-[500px]">
        {/* Pure Water-like Glass Card */}
        <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
              <FaLock className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Reset Password</h1>
            <p className="text-slate-300/80 text-sm">Create a new strong password.</p>
          </div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched }) => (
              <Form className="space-y-5">
                
                {/* New Password Input */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">New Password</label>
                  <Field 
                    type="password"
                    name="password"
                    placeholder="••••••••" 
                    className={`w-full px-4 py-3 bg-transparent border rounded-xl focus:bg-white/5 outline-none transition-all text-white text-sm placeholder:text-slate-500/50 tracking-widest
                      ${errors.password && touched.password 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50'}`} 
                  />
                  <ErrorMessage name="password" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Confirm Password</label>
                  <Field 
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••" 
                    className={`w-full px-4 py-3 bg-transparent border rounded-xl focus:bg-white/5 outline-none transition-all text-white text-sm placeholder:text-slate-500/50 tracking-widest
                      ${errors.confirmPassword && touched.confirmPassword 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50'}`} 
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-3.5 mt-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Set New Password <FaRocket className="text-sm opacity-90" />
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