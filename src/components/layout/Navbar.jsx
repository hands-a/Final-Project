import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { RiRocketLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { FaShoppingCart, FaUserCircle, FaBookOpen } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Logo from "../../assets/logo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cartItems } = useCart();
  const { user, logout } = useAuth(); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  }; 

  const getLinkClass = ({ isActive }) => 
    `relative text-[15px] font-bold transition-colors duration-300 pb-1
    ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] 
    after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 
    after:rounded-full after:transition-transform after:duration-300 after:origin-right
    ${isActive ? 'after:scale-x-100 after:origin-left' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left'}
    `;

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-white/10 shadow-lg py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* 1. Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={Logo} alt="Logo" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
            <span className="text-2xl font-bold text-white font-sans tracking-tight">
              Future<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Dev</span>
            </span>
          </Link>

          {/* 2. Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 bg-white/5 px-8 py-2.5 rounded-full border border-white/5 backdrop-blur-sm shadow-inner">
            <NavLink to="/" className={getLinkClass}>Home</NavLink>
            {user && <NavLink to="/my-courses" className={getLinkClass}>My Learning</NavLink>}
            <NavLink to="/courses" className={getLinkClass}>Courses</NavLink>
            <NavLink to="/about" className={getLinkClass}>About</NavLink>
          </div>

          <div className="flex items-center gap-5">
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative group flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors">
              <FaShoppingCart className="text-xl text-slate-300 group-hover:text-purple-400 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#0a0a0a]">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="relative group pl-4 border-l border-white/10">
                  <div className="flex items-center gap-3 cursor-pointer py-2">
                    
                    <div className="w-10 h-10 rounded-full bg-[#13151d] border-2 border-[#13151d] shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-105 transition-transform overflow-hidden">
                      <img 
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=random`} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="hidden xl:block text-left">
                      <p className="text-sm font-bold text-white leading-none">{user.name}</p>
                      <p className="text-[11px] text-purple-400 font-bold uppercase tracking-wider mt-1">
                        {user.role === 'admin' ? 'Administrator' : 'Student'}
                      </p>
                    </div>
                  </div>

                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#13151d] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 overflow-hidden">
                    <div className="p-2 space-y-1">
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 font-medium hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                        <FaUserCircle className="text-lg text-slate-500" /> My Profile
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-purple-400 font-bold hover:text-purple-300 hover:bg-purple-500/10 rounded-xl transition-colors">
                           <RiRocketLine className="text-lg" /> Admin Dashboard
                        </Link>
                      )}
                      
                      <div className="h-px bg-white/5 my-2"></div>
                      
                      <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 font-medium hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors">
                        <RiLogoutBoxRLine className="text-lg" /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // --- Login / Register Buttons ---
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                  <Link to="/login" className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-white/10 border border-white/10 hover:bg-white/20 transition-all backdrop-blur-sm">Log In</Link>
                  <Link to="/register" className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all">
                    Get Started <RiRocketLine />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(true)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
              <HiMenuAlt3 className="text-2xl" />
            </button>
          </div>

        </div>
      </nav>

      
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#0f1117] border-l border-white/10 z-[70] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Drawer Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <span className="text-xl font-bold text-white">Menu</span>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <HiX className="text-xl" />
          </button>
        </div>
        
        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
          <NavLink to="/" className={({isActive}) => `block px-4 py-3 rounded-xl font-bold text-lg transition-colors ${isActive ? 'bg-purple-500/10 text-purple-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>Home</NavLink>
          {user && (
            <NavLink to="/my-courses" className={({isActive}) => `block px-4 py-3 rounded-xl font-bold text-lg transition-colors ${isActive ? 'bg-purple-500/10 text-purple-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>My Learning</NavLink>
          )}
          <NavLink to="/courses" className={({isActive}) => `block px-4 py-3 rounded-xl font-bold text-lg transition-colors ${isActive ? 'bg-purple-500/10 text-purple-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>Courses</NavLink>
          <NavLink to="/about" className={({isActive}) => `block px-4 py-3 rounded-xl font-bold text-lg transition-colors ${isActive ? 'bg-purple-500/10 text-purple-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>About</NavLink>
          
          {user && (
            <>
              <div className="h-px bg-white/5 my-4 mx-4"></div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">My Account</span>
              <NavLink to="/profile" className={({isActive}) => `block px-4 py-3 rounded-xl font-bold text-lg transition-colors ${isActive ? 'bg-purple-500/10 text-purple-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>Profile Settings</NavLink>
              
              {user.role === 'admin' && (
                <NavLink to="/admin/dashboard" className={({isActive}) => `block px-4 py-3 rounded-xl font-bold text-lg transition-colors ${isActive ? 'bg-purple-500/10 text-purple-400' : 'text-purple-400 hover:bg-purple-500/10'}`}>Admin Dashboard</NavLink>
              )}
            </>
          )}
        </div>
        
        <div className="p-6 border-t border-white/5 bg-[#13151d]">
          {user ? (
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-[#0a0a0a] overflow-hidden">
                   <img 
                     src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=random`} 
                     alt="Profile" 
                     className="w-full h-full object-cover"
                   />
                 </div>
                 <div>
                   <p className="text-white font-bold">{user.name}</p>
                   <p className="text-purple-400 text-xs font-bold uppercase tracking-wider">{user.role === 'admin' ? 'Administrator' : 'Student'}</p>
                 </div>
               </div>
               <button onClick={handleLogout} className="w-full py-3.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                 <RiLogoutBoxRLine className="text-lg" /> Logout
               </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-3.5 bg-white/10 border border-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-center transition-colors">Log In</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="w-full py-3.5 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold text-center shadow-lg transition-colors">
                Get Started <RiRocketLine />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;