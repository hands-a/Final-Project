import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaCheckCircle, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

const VerifyCodePage = () => {
  const navigate = useNavigate();
  
  // Refs for auto-focusing next input
  const inputRefs = useRef([]);

  // Initial Form State
  const initialValues = { code: '' };

  // Validation Schema
  const validationSchema = Yup.object({
    code: Yup.string()
      .length(4, 'Code must be exactly 4 digits')
      .matches(/^[0-9]+$/, 'Digits only')
      .required('Verification code is required'),
  });

  // Handle Form Submission
  const onSubmit = (values, { setSubmitting }) => {
    // Simulating API call delay
    setTimeout(() => {
      console.log("Verified Code:", values.code);
      setSubmitting(false);
      navigate('/reset-password');
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
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Verify Code</h1>
            <p className="text-slate-300/80 text-sm">Enter the 4-digit code sent to your email.</p>
          </div>

          {/* Formik Integration */}
          <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={onSubmit}
          >
            {({ errors, touched, setFieldValue, values, isSubmitting }) => (
              <Form className="space-y-6">
                
                {/* OTP Inputs Group */}
                <div>
                  <div className="flex justify-center gap-3 sm:gap-5" dir="ltr">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        // Reusable OTP input class + Error state override
                        className={`verify-input ${errors.code && touched.code ? '!border-red-500/50 focus:!border-red-500 focus:!bg-red-500/5' : ''}`}
                        value={values.code[index] || ''}
                        
                        // Handle Typing and Auto-focus Forward
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                          
                          const newCodeArr = (values.code || '').padEnd(4, ' ').split('');
                          newCodeArr[index] = val;
                          const newCode = newCodeArr.join('').trim();
                          
                          setFieldValue('code', newCode);

                          // Move focus to next input if a number is typed
                          if (val && index < 3) {
                            inputRefs.current[index + 1].focus();
                          }
                        }}
                        
                        // Handle Backspace and Auto-focus Backward
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !values.code[index] && index > 0) {
                            inputRefs.current[index - 1].focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Error Message */}
                  <div className="text-center mt-3">
                    <ErrorMessage name="code" component="span" className="text-red-400 text-[11px] tracking-wider" />
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 mt-2"
                >
                  {isSubmitting ? 'Verifying...' : (
                    <>Verify & Continue <FaCheckCircle /></>
                  )}
                </button>

                {/* Resend Code Link */}
                <div className="text-center mt-4 text-xs text-slate-400">
                  Didn't receive the email? <button type="button" className="text-pink-400 font-bold hover:text-pink-300 transition-colors ml-1 uppercase tracking-wider">Resend Code</button>
                </div>

                {/* Footer Link */}
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