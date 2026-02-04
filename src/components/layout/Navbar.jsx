import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { RiRocketLine } from 'react-icons/ri';
import Logo from "../../assets/logo.png"; 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // تأثير الخلفية عند السكرول
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // غلق القائمة عند تغيير الصفحة
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const getLinkClass = ({ isActive }) => 
    `relative text-[16px] font-medium transition-colors duration-300 pb-1
    ${isActive ? 'text-purple-700' : 'text-slate-600 hover:text-purple-600'}
    
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2.5px] after:bg-purple-600 after:rounded-full after:transition-transform after:duration-300 after:origin-right
    ${isActive ? 'after:scale-x-100 after:origin-left' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left'}
    `;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md border-purple-200 shadow-sm py-2' 
          : 'bg-gradient-to-r from-[#f3e7ff] to-[#eef2ff] border-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between relative">

        {/* 1. (اليسار) الأزرار والقائمة */}
        <div className="flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-2xl text-purple-800 focus:outline-none">
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
          
          <div className="flex items-center gap-3">
            <Link 
              to="/register" 
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md transition-transform active:scale-95"
            >
              Sign Up <RiRocketLine />
            </Link>

            <Link 
              to="/login" 
              className="hidden lg:flex px-6 py-2 rounded-full font-bold text-sm border-2 shadow-sm border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>

        {/* 2. (الوسط) الروابط */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <NavLink to="/" className={getLinkClass}>Home</NavLink>
          <NavLink to="/courses" className={getLinkClass}>Courses</NavLink>
          <NavLink to="/mentors" className={getLinkClass}>Mentors</NavLink>
          <NavLink to="/community" className={getLinkClass}>Community</NavLink>
        </div>

        {/* 3. (اليمين) اللوجو والنص */}
        {/* 3. (اليمين) اللوجو والنص */}
<Link to="/" className="flex items-center gap-2">
  <span className="text-2xl font-bold text-slate-800 font-sans tracking-tight">
    Future<span className="text-purple-600">Dev</span>
  </span>
  {/* ✅ تم وضع المتغير Logo داخل الـ src */}
  <img src={Logo} alt="Logo" className="w-20 h-15 object-contain" />
</Link>

      </div>

      {/* القائمة الجانبية للموبايل */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#f3e7ff]/95 backdrop-blur-lg border-b border-purple-200 shadow-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-4 p-6">
          <NavLink to="/" className={getLinkClass}>Home</NavLink>
          <NavLink to="/courses" className={getLinkClass}>Courses</NavLink>
          <NavLink to="/mentors" className={getLinkClass}>Mentors</NavLink>
          <NavLink to="/community" className={getLinkClass}>Community</NavLink>
          
          <hr className="border-purple-200/50" />
          
          <div className="flex flex-col gap-3">
            <Link to="/login" className="text-center py-2 rounded-full border-2 border-purple-600 text-purple-700 font-bold">Login</Link>
            <Link to="/register" className="text-center py-3 bg-purple-600 text-white rounded-full font-bold shadow-md">Sign Up Now</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;