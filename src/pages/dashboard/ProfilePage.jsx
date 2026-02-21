import React, { useState, useRef } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaSave,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaBriefcase,
  FaAlignLeft,
} from "react-icons/fa";

const ProfilePage = () => {
  // 👇 ضفنا updateUser هنا عشان نحدث الداتا على مستوى الموقع 👇
  const { user, updateUser } = useAuth();

  // 1. Ref لزرار رفع الصورة المخفي
  const fileInputRef = useRef(null);

  // 2. State لعرض الصورة اللي الطالب اختارها (Preview)
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    headline: "",
    bio: "",
    github: "",
    linkedin: "",
    twitter: "",
    portfolio: "",
    currentPassword: "",
    newPassword: "",
    avatarFile: null, // عشان نحفظ الملف الحقيقي ونبعته للباك اند بعدين
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. دالة بتفتح نافذة اختيار الملفات
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // 4. دالة بتستقبل الصورة وتعرضها
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // حفظ الملف الحقيقي عشان الـ API
      setFormData({ ...formData, avatarFile: file });
      // عمل رابط مؤقت لعرض الصورة للمستخدم
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // 👇 التعديل الأخير: تحديث بيانات المستخدم في الـ Context عشان الناف بار يتغير 👇
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // إرسال الصورة والاسم للناف بار والذاكرة
    if (updateUser) {
      updateUser({
        name: formData.name,
        avatar: avatarPreview || user.avatar // لو في صورة جديدة حطها، لو مفيش سيب القديمة
      });
    }

    alert("Profile and Avatar updated successfully! 🚀");
    // هنا في المستقبل هنبعت الـ formData (بما فيها الصورة) لـ Strapi
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-bold text-2xl">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 relative overflow-hidden">
        {/* Background Blob */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Account Settings
            </h1>
            <p className="text-slate-400">
              Manage your personal details, developer profile, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Avatar & Info Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#13151d] border border-white/5 rounded-3xl p-8 text-center relative overflow-hidden sticky top-32">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-900/40 to-pink-900/40"></div>

                <div className="relative w-32 h-32 mx-auto mt-4 mb-4 rounded-full border-4 border-[#13151d] shadow-xl group">
                  {/* تحديث مصدر الصورة عشان يعرض الـ Preview لو موجود */}
                  <img
                    src={
                      avatarPreview ||
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${user.name}&background=random`
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover bg-white"
                  />

                  {/* زرار الكاميرا اللي بيدوس على الـ input المخفي */}
                  <div
                    onClick={handleCameraClick}
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <FaCamera className="text-white text-2xl" />
                  </div>

                  {/* الـ Input المخفي لرفع الصورة */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">
                  {formData.name || user.name}
                </h2>
                <p className="text-purple-400 text-sm font-bold uppercase tracking-wider mb-2">
                  {user.role === "admin" ? "Administrator" : "Student"}
                </p>

                {/* Headline Display */}
                {formData.headline && (
                  <p className="text-slate-300 font-medium text-sm mb-6">
                    {formData.headline}
                  </p>
                )}

                {/* Bio Display */}
                {formData.bio && (
                  <p className="text-slate-400 text-sm text-center italic mb-6 border-b border-white/5 pb-6">
                    "{formData.bio}"
                  </p>
                )}

                {/* Social Links Display */}
                <div className="flex justify-center gap-4 mb-6">
                  {formData.github && (
                    <a
                      href={formData.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white transition-colors text-xl"
                    >
                      <FaGithub />
                    </a>
                  )}
                  {formData.linkedin && (
                    <a
                      href={formData.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-[#0077b5] transition-colors text-xl"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {formData.twitter && (
                    <a
                      href={formData.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-[#1DA1F2] transition-colors text-xl"
                    >
                      <FaTwitter />
                    </a>
                  )}
                  {formData.portfolio && (
                    <a
                      href={formData.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-pink-500 transition-colors text-xl"
                    >
                      <FaGlobe />
                    </a>
                  )}
                </div>

                <div className="space-y-4 text-left border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 text-slate-400 text-sm">
                    <FaEnvelope className="text-slate-500" /> {user.email}
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-sm">
                    <FaUser className="text-slate-500" /> Member since 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Edit Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#13151d] border border-white/5 rounded-3xl p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* --- Section 1: Personal Details --- */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaUser className="text-slate-500" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaEnvelope className="text-slate-500" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-slate-400 cursor-not-allowed focus:outline-none"
                            readOnly
                            title="Email cannot be changed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- Section 2: Professional Info --- */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">
                      Developer Profile
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">
                          Professional Headline
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaBriefcase className="text-slate-500" />
                          </div>
                          <input
                            type="text"
                            name="headline"
                            placeholder="Enter your professional headline (e.g. React Developer)"
                            value={formData.headline}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">
                          Short Bio
                        </label>
                        <div className="relative">
                          <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                            <FaAlignLeft className="text-slate-500" />
                          </div>
                          <textarea
                            name="bio"
                            rows="3"
                            placeholder="Enter a short bio about yourself..."
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all resize-none placeholder:text-slate-600"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- Section 3: Social Links --- */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">
                      Social Profiles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">
                          GitHub URL
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaGithub className="text-slate-500" />
                          </div>
                          <input
                            type="url"
                            name="github"
                            placeholder="Enter your GitHub URL"
                            value={formData.github}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">
                          LinkedIn URL
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaLinkedin className="text-slate-500" />
                          </div>
                          <input
                            type="url"
                            name="linkedin"
                            placeholder="Enter your LinkedIn URL"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">
                          Twitter / X
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaTwitter className="text-slate-500" />
                          </div>
                          <input
                            type="url"
                            name="twitter"
                            placeholder="Enter your Twitter URL"
                            value={formData.twitter}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">
                          Portfolio Website
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaGlobe className="text-slate-500" />
                          </div>
                          <input
                            type="url"
                            name="portfolio"
                            placeholder="Enter your Portfolio URL"
                            value={formData.portfolio}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- Section 4: Security --- */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">
                      Security
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaLock className="text-slate-500" />
                          </div>
                          <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-600"
                            placeholder="Enter current password"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaLock className="text-slate-500" />
                          </div>
                          <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-600"
                            placeholder="Enter new password (optional)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4 border-t border-white/5 mt-8">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-purple-900/40 hover:-translate-y-1 transition-all flex items-center gap-2"
                    >
                      <FaSave /> Save Profile Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;