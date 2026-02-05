import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { RiRocketLine } from 'react-icons/ri';
import Logo from "../../assets/logo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  
  const getLinkClass = ({ isActive }) => 
    `relative text-[16px] font-medium transition-colors duration-300 pb-1
    ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
    
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] 
    after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 
    after:rounded-full after:transition-transform after:duration-300 after:origin-right
    ${isActive ? 'after:scale-x-100 after:origin-left' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left'}
    `;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 shadow-lg py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">

        
        <Link to="/" className="flex items-center gap-2 group">
          <img src={Logo} alt="Logo" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-2xl font-bold text-white font-sans tracking-tight">
            Future<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Dev</span>
          </span>
        </Link>

    
        <div className="hidden lg:flex items-center gap-8 bg-white/5 px-8 py-2 rounded-full border border-white/5 backdrop-blur-sm">
          <NavLink to="/" className={getLinkClass}>Home</NavLink>
          <NavLink to="/courses" className={getLinkClass}>Courses</NavLink>
          <NavLink to="/mentors" className={getLinkClass}>Mentors</NavLink>
          <NavLink to="/community" className={getLinkClass}>Community</NavLink>
        </div>

        
        <div className="flex items-center gap-4">
          
          
          <div className="hidden lg:flex items-center gap-3">
            
            <Link 
              to="/login" 
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              Log In
            </Link>

            <Link 
              to="/register" 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20 transition-transform active:scale-95"
            >
              Get Started <RiRocketLine />
            </Link>
          </div>

        
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden text-2xl text-white focus:outline-none hover:text-purple-400 transition-colors"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

      </div>

      
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-6 p-8 text-center">
          <NavLink to="/" className={getLinkClass}>Home</NavLink>
          <NavLink to="/courses" className={getLinkClass}>Courses</NavLink>
          <NavLink to="/mentors" className={getLinkClass}>Mentors</NavLink>
          <NavLink to="/community" className={getLinkClass}>Community</NavLink>
          
          <div className="h-[1px] bg-white/10 w-full my-2"></div>
          
          <div className="flex flex-col gap-4">
            
            <Link to="/login" className="text-white bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors">Log In</Link>
            <Link to="/register" className="py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg">Sign Up Free</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;