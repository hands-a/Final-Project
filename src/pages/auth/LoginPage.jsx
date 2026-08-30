import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowRight, FaTerminal } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      const userData = {
        name: values.email.split('@')[0],
        email: values.email,
        role: 'student'
      };
      login(userData);
      setSubmitting(false);
      if (values.email.includes('admin')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden flex items-center justify-center p-4 sm:p-6">

      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-600/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-emerald-700/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="bg-grid-mesh absolute inset-0 pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-[460px]">

        {/* Brand mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <FaTerminal className="text-cyan-400 text-xs" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">Command Center</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Welcome Back</h1>
          <p className="text-zinc-500 text-sm">Enter your credentials to access your account.</p>
        </div>

        <div className="glass-panel p-8 sm:p-10">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-5">

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

                <div>
                  <div className="flex justify-between items-center mb-2 ml-1">
                    <label className="label-text !mb-0 !ml-0">Password</label>
                    <Link to="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider">
                      Forgot Password?
                    </Link>
                  </div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`input-field ${errors.password && touched.password ? '!border-rose-500/50 focus:!border-rose-500 focus:!ring-rose-500/20' : ''}`}
                  />
                  <ErrorMessage name="password" component="div" className="text-rose-400 text-xs mt-1.5 ml-1" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 mt-2 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                >
                  {isSubmitting ? 'Authenticating...' : <><span>Access Account</span> <FaArrowRight /></>}
                </button>

              </Form>
            )}
          </Formik>

          <p className="text-center mt-6 text-zinc-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors ml-1">
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;