import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaCheckCircle, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

const VerifyCodePage = () => {
  const navigate = useNavigate();

  const initialValues = { code: '' };

  const validationSchema = Yup.object({
    code: Yup.string()
      .length(6, 'Code must be 6 digits')
      .matches(/^[0-9]+$/, 'Digits only')
      .required('Code required'),
  });

  const onSubmit = (values) => {
    console.log("Verified Code:", values.code);
    navigate('/reset-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-900 via-[#1a103c] to-slate-900 relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      
      
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] opacity-70 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[100px] opacity-70 animate-pulse-slow pointer-events-none" style={{animationDelay: '1.5s'}}></div>

     
      <div className="relative z-10 w-full max-w-[550px] mt-15">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">Verify Code</h1>
            <p className="text-slate-300/80 text-sm">Enter the 6-digit code sent to your email.</p>
          </div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched }) => (
              <Form className="space-y-4">
                
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Enter Code</label>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-4 text-slate-400 group-focus-within:text-pink-400 transition-colors">
                      <FaCheckCircle />
                    </div>
                    
                    <Field 
                      type="text"
                      name="code"
                      maxLength="6"
                      placeholder="000000" 
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-center focus:ring-1 outline-none transition-all text-white text-sm placeholder:text-slate-500 tracking-widest
                        ${errors.code && touched.code 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-white/10 focus:border-pink-400/50 focus:ring-pink-400/50'}`} 
                    />
                  </div>
                  <ErrorMessage name="code" component="div" className="text-red-400 text-[10px] mt-1 ml-1" />
                </div>

                <button type="submit" className="w-full py-3.5 mt-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Verify & Continue <FaCheckCircle />
                </button>

                <div className="text-center mt-4 text-xs text-slate-400">
                  Didn't receive the email? <button type="button" className="text-pink-400 font-bold hover:text-pink-300 transition-colors ml-1">Resend Code</button>
                </div>

                <div className="text-center mt-2">
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

export default VerifyCodePage;