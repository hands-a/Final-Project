import React, { useState, useRef } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaCamera,
  FaSave,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";

const ProfilePage = () => {
  const { user } = useAuth();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile and Avatar updated successfully! 🚀");
    // هنا في المستقبل هنبعت الـ formData (بما فيها الصورة) لـ Strapi
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050511] flex items-center justify-center text-white font-light text-xl tracking-widest uppercase">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          
          <div className="mb-10 border-b border-white/10 pb-8">
            <h1 className="text-3xl md:text-5xl font-light text-white mb-3 tracking-wide">
              Account Settings
            </h1>
            <p className="text-slate-400 font-light tracking-wide text-sm">
              Manage your personal details, developer profile, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- Left Column: Avatar & Info Summary (Pure Glass) --- */}
            <div className="lg:col-span-1">
              <div className="bg-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden sticky top-32 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
                
                <div className="relative w-32 h-32 mx-auto mt-2 mb-6 rounded-full border border-white/20 shadow-[0_0_20px_rgba(244,114,182,0.15)] group">
                  <img
                    src={
                      avatarPreview ||
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${user.name}&background=random`
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover bg-white/5"
                  />

                  {/* زرار الكاميرا اللي بيدوس على الـ input المخفي */}
                  <div
                    onClick={handleCameraClick}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                  >
                    <FaCamera className="text-white text-2xl opacity-80" />
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

                <h2 className="text-2xl font-medium tracking-wide text-white mb-1">
                  {formData.name || user.name}
                </h2>
                <p className="text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-6 inline-block bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {user.role === "admin" ? "Administrator" : "Student"}
                </p>

                {/* Headline Display */}
                {formData.headline && (
                  <p className="text-slate-300 font-medium text-sm mb-6 tracking-wide">
                    {formData.headline}
                  </p>
                )}

                {/* Bio Display */}
                {formData.bio && (
                  <p className="text-slate-400 text-sm text-center font-light leading-relaxed mb-6 border-b border-white/10 pb-6">
                    "{formData.bio}"
                  </p>
                )}

                {/* Social Links Display */}
                <div className="flex justify-center gap-5 mb-2">
                  {formData.github && (
                    <a href={formData.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors text-xl">
                      <FaGithub />
                    </a>
                  )}
                  {formData.linkedin && (
                    <a href={formData.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#0077b5] transition-colors text-xl">
                      <FaLinkedin />
                    </a>
                  )}
                  {formData.twitter && (
                    <a href={formData.twitter} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#1DA1F2] transition-colors text-xl">
                      <FaTwitter />
                    </a>
                  )}
                  {formData.portfolio && (
                    <a href={formData.portfolio} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-pink-400 transition-colors text-xl">
                      <FaGlobe />
                    </a>
                  )}
                </div>

                <div className="space-y-4 text-left mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4 text-slate-400 text-[11px] uppercase tracking-widest">
                    <FaEnvelope className="text-pink-400 text-sm opacity-80" /> {user.email}
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 text-[11px] uppercase tracking-widest">
                    <FaUser className="text-pink-400 text-sm opacity-80" /> Member since 2026
                  </div>
                </div>
              </div>
            </div>

            {/* --- Right Column: Edit Form (Pure Glass) --- */}
            <div className="lg:col-span-2">
              <div className="bg-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
                <form onSubmit={handleSubmit} className="space-y-10">
                  
                  {/* --- Section 1: Personal Details --- */}
                  <div>
                    <h3 className="text-xl font-medium tracking-wide text-white mb-6 border-b border-white/10 pb-4">
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-slate-500 text-sm cursor-not-allowed focus:outline-none tracking-wider"
                          readOnly
                          title="Email cannot be changed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- Section 2: Professional Info --- */}
                  <div>
                    <h3 className="text-xl font-medium tracking-wide text-white mb-6 border-b border-white/10 pb-4">
                      Developer Profile
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Professional Headline</label>
                        <input
                          type="text"
                          name="headline"
                          placeholder="e.g. Senior React Developer"
                          value={formData.headline}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Short Bio</label>
                        <textarea
                          name="bio"
                          rows="3"
                          placeholder="Enter a short bio about yourself..."
                          value={formData.bio}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all resize-none placeholder:text-slate-500/50 tracking-wider leading-relaxed"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* --- Section 3: Social Links --- */}
                  <div>
                    <h3 className="text-xl font-medium tracking-wide text-white mb-6 border-b border-white/10 pb-4">
                      Social Profiles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">GitHub URL</label>
                        <input
                          type="url"
                          name="github"
                          placeholder="https://github.com/..."
                          value={formData.github}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">LinkedIn URL</label>
                        <input
                          type="url"
                          name="linkedin"
                          placeholder="https://linkedin.com/in/..."
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Twitter / X</label>
                        <input
                          type="url"
                          name="twitter"
                          placeholder="https://twitter.com/..."
                          value={formData.twitter}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Portfolio Website</label>
                        <input
                          type="url"
                          name="portfolio"
                          placeholder="https://..."
                          value={formData.portfolio}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- Section 4: Security --- */}
                  <div>
                    <h3 className="text-xl font-medium tracking-wide text-white mb-6 border-b border-white/10 pb-4">
                      Security
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-widest"
                          placeholder="••••••••"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-widest"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6 border-t border-white/10 mt-8">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium py-3.5 px-8 rounded-xl shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                    >
                      <FaSave className="opacity-80" /> Save Profile Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;