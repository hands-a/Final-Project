import React from 'react';
import { Link } from 'react-router-dom';
// ✅ استيراد الأيقونات من المكتبة اللي إنت سطبتها
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';

const Footer = () => {

  // مكون الأيقونة (بيظبط نفسه في الدارك مود واللايت مود)
  const SocialIcon = ({ icon: Icon, link }) => (
    <a 
      href={link || "#"} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 
      bg-white text-purple-600 border border-purple-100 shadow-sm hover:bg-purple-600 hover:text-white
      dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-purple-600 dark:hover:text-white"
    >
      <Icon size={18} />
    </a>
  );

  // ستايلات النصوص الموحدة
  const headingStyle = "font-bold text-lg mb-6 relative inline-block text-slate-800 dark:text-white";
  const underlineStyle = "absolute bottom-[-8px] left-0 w-12 h-1 bg-purple-500 rounded-full";
  const linkStyle = "text-sm font-medium transition-all duration-300 flex items-center gap-2 text-slate-600 hover:text-purple-600 hover:translate-x-1 dark:text-slate-400 dark:hover:text-white";

  return (
    <footer className="w-full pt-16 pb-8 border-t transition-colors duration-500 mt-auto
      bg-gradient-to-t from-[#f3e7ff] to-white border-purple-100
      dark:bg-none dark:bg-slate-900 dark:border-slate-800"
    >
      <div className="container mx-auto px-6">
        
        {/* --- Grid Layout (تقسيمة الفوتر) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* 1. اللوجو ومعلومات البراند */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold font-english text-slate-800 dark:text-white">
                Future<span className="text-purple-600">Dev</span>
                
              </span>
                            <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain dark:brightness-0 dark:invert" />

              {/* اللوجو بيقلب أبيض لوحده في الدارك مود */}
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Your #1 platform to learn coding from scratch to mastery. We build your future line by line with elite mentors.
            </p>
            
            {/* أيقونات السوشيال ميديا */}
            <div className="flex items-center gap-3 mt-2">
              <SocialIcon icon={FaFacebookF} link="#" />
              <SocialIcon icon={FaTwitter} link="#" />
              <SocialIcon icon={FaLinkedinIn} link="#" />
              <SocialIcon icon={FaGithub} link="#" />
            </div>
          </div>

          {/* 2. روابط سريعة */}
          <div>
            <h3 className={headingStyle}>
              Quick Links
              <span className={underlineStyle}></span>
            </h3>
            <ul className="flex flex-col gap-3">
              {['Home', 'About Us', 'Mentors', 'Community', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link to="/" className={linkStyle}>
                    <span className="text-purple-400 text-xs">●</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. أهم الكورسات */}
          <div>
            <h3 className={headingStyle}>
              Top Tracks
              <span className={underlineStyle}></span>
            </h3>
            <ul className="flex flex-col gap-3">
              {['Front-end Development', 'Back-end Python', 'UI/UX Design', 'React.js Master', 'Data Science'].map((item) => (
                <li key={item}>
                  <Link to="/courses" className={linkStyle}>
                    <span className="text-purple-400 text-xs">●</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. معلومات التواصل */}
          <div>
            <h3 className={headingStyle}>
              Contact Us
              <span className={underlineStyle}></span>
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <HiLocationMarker size={22} className="text-purple-600 shrink-0" />
                <span>Nasr City, Cairo, Egypt.</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <HiMail size={22} className="text-purple-600 shrink-0" />
                <span>contact@futuredev.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <HiPhone size={22} className="text-purple-600 shrink-0" />
                <span>+20 100 000 0000</span>
              </li>
            </ul>
          </div>

        </div>

        {/* --- الحقوق (Copyright) --- */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4
          border-purple-100 dark:border-slate-800"
        >
          <p className="text-sm text-center md:text-left text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} All rights reserved to <span className="font-bold text-purple-600">FutureDev</span>.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link to="#" className="hover:text-purple-600 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-purple-600 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;