import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaCheckCircle, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const initialValues = { code: '' };

  const validationSchema = Yup.object({
    code: Yup.string()
      .length(4, 'Code must be exactly 4 digits')
      .matches(/^[0-9]+$/, 'Digits only')
      .required('Verification code is required'),
  });

  const onSubmit = (values) => {
    console.log("Verified Code:", values.code);
    navigate('/reset-password');
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      
      <div className="relative z-10 w-full max-w-[500px]">
        <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Verify Code</h1>
            <p className="text-slate-300/80 text-sm">Enter the 4-digit code sent to your email.</p>
          </div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, setFieldValue, values }) => (
              <Form className="space-y-6">
                
                <div>
                  <div className="flex justify-center gap-3 sm:gap-5" dir="ltr">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-transparent border text-center text-2xl text-white outline-none transition-all
                          ${errors.code && touched.code 
                            ? 'border-red-500/50 focus:border-red-500 focus:bg-red-500/5' 
                            : 'border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50 focus:bg-white/5'}`}
                        value={values.code[index] || ''}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          
                          const newCodeArr = (values.code || '').padEnd(4, ' ').split('');
                          newCodeArr[index] = val;
                          const newCode = newCodeArr.join('').trim();
                          
                          setFieldValue('code', newCode);

                          if (val && index < 3) {
                            inputRefs.current[index + 1].focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !values.code[index] && index > 0) {
                            inputRefs.current[index - 1].focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center mt-3">
                    <ErrorMessage name="code" component="span" className="text-red-400 text-[11px] tracking-wider" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 mt-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Verify & Continue <FaCheckCircle />
                </button>

                <div className="text-center mt-4 text-xs text-slate-400">
                  Didn't receive the email? <button type="button" className="text-pink-400 font-bold hover:text-pink-300 transition-colors ml-1 uppercase tracking-wider">Resend Code</button>
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