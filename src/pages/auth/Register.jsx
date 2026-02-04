import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const Register = () => {
  // 1. Validation Logic
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().min(3, 'الاسم قصير جداً').required('الاسم مطلوب'),
      email: Yup.string().email('بريد إلكتروني غير صحيح').required('البريد مطلوب'),
      password: Yup.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل').required('كلمة المرور مطلوبة'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'كلمات المرور غير متطابقة')
        .required('تأكيد كلمة المرور مطلوب'),
    }),
    onSubmit: (values) => {
      console.log('Register Data:', values);
      alert('تم إنشاء الحساب بنجاح! (محاكاة)');
    },
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* القسم الأيسر: الفورم */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">إنشاء حساب جديد 🚀</h2>
            <p className="text-slate-500 mt-2">انضم إلينا وابدأ رحلة التعلم اليوم</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">الاسم الكامل</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FaUser /></div>
                <input
                  type="text"
                  {...formik.getFieldProps('fullName')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-violet-500 outline-none transition-all ${
                    formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="أحمد محمد"
                />
              </div>
              {formik.touched.fullName && formik.errors.fullName && <p className="text-red-500 text-xs mt-1">{formik.errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FaEnvelope /></div>
                <input
                  type="email"
                  {...formik.getFieldProps('email')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-violet-500 outline-none transition-all ${
                    formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="name@example.com"
                />
              </div>
              {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FaLock /></div>
                <input
                  type="password"
                  {...formik.getFieldProps('password')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-violet-500 outline-none transition-all ${
                    formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">تأكيد كلمة المرور</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FaLock /></div>
                <input
                  type="password"
                  {...formik.getFieldProps('confirmPassword')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-violet-500 outline-none transition-all ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-violet-200 transition-all transform hover:-translate-y-1"
            >
              إنشاء حساب
            </button>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">أو</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Google Button */}
            <button type="button" className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-slate-700 py-3 rounded-xl hover:bg-gray-50 transition-all font-medium">
              <FaGoogle className="text-red-500" />
              <span>التسجيل باستخدام Google</span>
            </button>

          </form>

          <p className="text-center mt-6 text-slate-600">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-violet-600 font-bold hover:underline">
              سجل دخولك
            </Link>
          </p>
        </div>
      </div>

      {/* القسم الأيمن: صورة أو جرافيك (بيختفي في الموبايل) */}
      <div className="hidden lg:flex w-1/2 bg-violet-600 items-center justify-center relative overflow-hidden">
         {/* هنا ممكن نحط 3D Scene بعدين */}
         <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-800 opacity-90"></div>
         <div className="relative z-10 text-white text-center px-10">
            <h1 className="text-5xl font-bold mb-6">EduPro Learning</h1>
            <p className="text-xl text-violet-100">
              انضم لأكبر مجتمع تعليمي تفاعلي. <br/>
              تعلم البرمجة بتقنيات ثلاثية الأبعاد.
            </p>
         </div>
         {/* دوائر خلفية للتزيين */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 opacity-20 rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

    </div>
  );
};

export default Register;