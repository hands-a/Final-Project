import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { RiRocketLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Logo from "../../assets/logo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cartItems } = useCart();
  const { user, logout } = useAuth(); // بيانات المستخدم

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  }; 

  const getLinkClass = ({ isActive }) => 
    `relative text-[16px] font-medium transition-colors duration-300 pb-1
    ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] 
    after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 
    after:rounded-full after:transition-transform after:duration-300 after:origin-right
    ${isActive ? 'after:scale-x-100 after:origin-left' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left'}
    `;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 shadow-lg py-3' : 'bg-transparent border-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={Logo} alt="Logo" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-2xl font-bold text-white font-sans tracking-tight">
            Future<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Dev</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 bg-white/5 px-8 py-2 rounded-full border border-white/5 backdrop-blur-sm">
          <NavLink to="/" className={getLinkClass}>Home</NavLink>
          <NavLink to="/courses" className={getLinkClass}>Courses</NavLink>
          {user && <NavLink to="/my-courses" className={getLinkClass}>My Learning</NavLink>}
          <NavLink to="/about" className={getLinkClass}>About</NavLink>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative group mr-2">
            <FaShoppingCart className="text-2xl text-slate-400 group-hover:text-white transition-colors" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-[#0a0a0a]">
                {cartItems.length}
              </span>
            )}
          </Link>
          
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold border-2 border-[#0a0a0a] shadow-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-sm font-bold text-white leading-none">{user.name}</p>
                    {/* 👇 هنا التعديل عشان يظهر Role المستخدم صح 👇 */}
                    <p className="text-xs text-slate-400 capitalize">
                      {user.role === 'admin' ? 'Administrator' : 'Student'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <RiLogoutBoxRLine className="text-xl" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-white/10 border border-white/10 hover:bg-white/20 transition-all backdrop-blur-sm">Log In</Link>
                <Link to="/register" className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg active:scale-95">
                  Get Started <RiRocketLine />
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-2xl text-white focus:outline-none hover:text-purple-400">
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-6 p-8 text-center">
          <NavLink to="/" className={getLinkClass}>Home</NavLink>
          <NavLink to="/courses" className={getLinkClass}>Courses</NavLink>
          {user && <NavLink to="/my-courses" className={getLinkClass}>My Learning</NavLink>}
          <NavLink to="/cart" className={getLinkClass}>Cart ({cartItems.length})</NavLink>
          
          <div className="h-[1px] bg-white/10 w-full my-2"></div>
          
          {user ? (
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 text-red-400 font-bold py-2">
              <RiLogoutBoxRLine /> Logout ({user.name})
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <Link to="/login" className="text-white bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-white/20">Log In</Link>
              <Link to="/register" className="py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg">Sign Up Free</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;