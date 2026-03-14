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

  const onSubmit = (values) => {
    console.log("Register Data:", values);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      
      <div className="relative z-10 w-full max-w-[500px]">
        {/* Pure Water-like Glass Card / كارت زجاجي نقي مثل الماء */}
        {/* bg-white/0 makes it completely transparent, backdrop-blur does the glass distortion */}
        <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          
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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-5">
                {/* First and Last Name / الاسم الأول والأخير */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      className={`w-full px-4 py-3 bg-transparent border rounded-xl focus:bg-white/5 outline-none transition-all text-white text-sm placeholder:text-slate-500/50
                        ${
                          errors.firstName && touched.firstName
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50"
                        }`}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-400 text-[10px] mt-1.5 ml-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      className={`w-full px-4 py-3 bg-transparent border rounded-xl focus:bg-white/5 outline-none transition-all text-white text-sm placeholder:text-slate-500/50
                        ${
                          errors.lastName && touched.lastName
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50"
                        }`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-400 text-[10px] mt-1.5 ml-1"
                    />
                  </div>
                </div>

                {/* Email Field / حقل البريد الإلكتروني */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className={`w-full px-4 py-3 bg-transparent border rounded-xl focus:bg-white/5 outline-none transition-all text-white text-sm placeholder:text-slate-500/50
                      ${
                        errors.email && touched.email
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50"
                      }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-400 text-[10px] mt-1.5 ml-1"
                  />
                </div>

                {/* Password Field / حقل كلمة المرور */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className={`w-full px-4 py-3 bg-transparent border rounded-xl focus:bg-white/5 outline-none transition-all text-white text-sm placeholder:text-slate-500/50
                      ${
                        errors.password && touched.password
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50"
                      }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-400 text-[10px] mt-1.5 ml-1"
                  />
                </div>

                {/* Confirm Password / تأكيد كلمة المرور */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className={`w-full px-4 py-3 bg-transparent border rounded-xl focus:bg-white/5 outline-none transition-all text-white text-sm placeholder:text-slate-500/50
                      ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50"
                      }`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-400 text-[10px] mt-1.5 ml-1"
                  />
                </div>

                {/* Colorful Submit Button / زر الإرسال الملون */}
                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Create Account <FaArrowRight />
                </button>

                {/* Divider / فاصل */}
                <div className="relative flex py-2 items-center opacity-70">
                  <div className="grow border-t border-white/10"></div>
                  <span className="shrink-0 mx-4 text-slate-400 text-[10px] uppercase tracking-wider">
                    Or continue with
                  </span>
                  <div className="grow border-t border-white/10"></div>
                </div>

                {/* Social Buttons / أزرار تسجيل الدخول الاجتماعي */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="py-2.5 bg-transparent border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 transition-all flex justify-center items-center gap-2 text-sm group"
                  >
                    <FaGoogle className="text-red-400 group-hover:scale-110 transition-transform" />{" "}
                    Google
                  </button>
                  <button
                    type="button"
                    className="py-2.5 bg-transparent border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 transition-all flex justify-center items-center gap-2 text-sm group"
                  >
                    <FaFacebook className="text-blue-500 group-hover:scale-110 transition-transform" />{" "}
                    Facebook
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Login Link / رابط تسجيل الدخول */}
          <p className="text-center mt-6 text-slate-300 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-400 font-bold hover:text-pink-300 transition-colors ml-1"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;