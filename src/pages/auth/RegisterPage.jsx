import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaArrowRight, FaTerminal } from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().min(2, "Too short").required("First Name required"),
    lastName: Yup.string().min(2, "Too short").required("Last Name required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(8, "Min 8 characters")
      .matches(/[0-9]/, "Must contain a number")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Register Data:", values);
      setSubmitting(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden flex items-center justify-center p-4 sm:p-6 py-16">

      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-600/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-emerald-700/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="bg-grid-mesh absolute inset-0 pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-[500px]">

        {/* Brand mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <FaTerminal className="text-cyan-400 text-xs" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">Command Center</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-zinc-500 text-sm">Join the future of development today.</p>
        </div>

        <div className="glass-panel p-8 sm:p-10">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className={`input-field ${errors.firstName && touched.firstName ? "!border-rose-500/50 focus:!border-rose-500 focus:!ring-rose-500/20" : ""}`}
                    />
                    <ErrorMessage name="firstName" component="div" className="text-rose-400 text-xs mt-1.5 ml-1" />
                  </div>
                  <div>
                    <label className="label-text">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className={`input-field ${errors.lastName && touched.lastName ? "!border-rose-500/50 focus:!border-rose-500 focus:!ring-rose-500/20" : ""}`}
                    />
                    <ErrorMessage name="lastName" component="div" className="text-rose-400 text-xs mt-1.5 ml-1" />
                  </div>
                </div>

                <div>
                  <label className="label-text">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`input-field ${errors.email && touched.email ? "!border-rose-500/50 focus:!border-rose-500 focus:!ring-rose-500/20" : ""}`}
                  />
                  <ErrorMessage name="email" component="div" className="text-rose-400 text-xs mt-1.5 ml-1" />
                </div>

                <div>
                  <label className="label-text">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`input-field ${errors.password && touched.password ? "!border-rose-500/50 focus:!border-rose-500 focus:!ring-rose-500/20" : ""}`}
                  />
                  <ErrorMessage name="password" component="div" className="text-rose-400 text-xs mt-1.5 ml-1" />
                </div>

                <div>
                  <label className="label-text">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className={`input-field ${errors.confirmPassword && touched.confirmPassword ? "!border-rose-500/50 focus:!border-rose-500 focus:!ring-rose-500/20" : ""}`}
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-rose-400 text-xs mt-1.5 ml-1" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 mt-2 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                >
                  {isSubmitting ? 'Creating Account...' : <><span>Create Account</span> <FaArrowRight /></>}
                </button>

              </Form>
            )}
          </Formik>

          <p className="text-center mt-6 text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors ml-1">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;