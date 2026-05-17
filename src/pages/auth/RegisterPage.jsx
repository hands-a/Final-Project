import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaArrowRight,
  FaGoogle,
  FaFacebook,
  FaRocket,
} from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();

  // Initial Form State
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Form Validation Schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().min(2, "Too short").required("First Name required"),
    lastName: Yup.string().min(2, "Too short").required("Last Name required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Min 8 characters")
      .matches(/[0-9]/, "Must contain a number")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Handle Form Submission
  const onSubmit = (values, { setSubmitting }) => {
    // Simulating an API call delay
    setTimeout(() => {
      console.log("Register Data:", values);
      setSubmitting(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      
      <div className="relative z-10 w-full max-w-[500px]">
        {/* Reusable Glass Panel Class */}
        <div className="glass-panel p-8 sm:p-10">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
              <FaRocket className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-300/80 text-sm">
              Join the future of development today.
            </p>
          </div>

          {/* Formik Integration */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-5">
                
                {/* Name Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* First Name Field */}
                  <div>
                    <label className="label-text">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="John"
                      className={`input-field ${errors.firstName && touched.firstName ? "!border-red-500/50 focus:!border-red-500 focus:!ring-red-500/50" : ""}`}
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                  </div>

                  {/* Last Name Field */}
                  <div>
                    <label className="label-text">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      className={`input-field ${errors.lastName && touched.lastName ? "!border-red-500/50 focus:!border-red-500 focus:!ring-red-500/50" : ""}`}
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="label-text">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className={`input-field ${errors.email && touched.email ? "!border-red-500/50 focus:!border-red-500 focus:!ring-red-500/50" : ""}`}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Password Field */}
                <div>
                  <label className="label-text">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`input-field ${errors.password && touched.password ? "!border-red-500/50 focus:!border-red-500 focus:!ring-red-500/50" : ""}`}
                  />
                  <ErrorMessage name="password" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="label-text">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className={`input-field ${errors.confirmPassword && touched.confirmPassword ? "!border-red-500/50 focus:!border-red-500 focus:!ring-red-500/50" : ""}`}
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-[10px] mt-1.5 ml-1" />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 mt-2"
                >
                  {isSubmitting ? 'Creating Account...' : (
                    <>Create Account <FaArrowRight /></>
                  )}
                </button>

                

              </Form>
            )}
          </Formik>

          {/* Footer Link */}
          <p className="text-center mt-6 text-slate-300 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-400 font-bold hover:text-pink-300 transition-colors ml-1">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;