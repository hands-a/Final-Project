import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RiRocketLine, RiLogoutBoxRLine } from "react-icons/ri";
import { FaShoppingCart, FaUserCircle, FaBookOpen, FaShieldAlt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    clearCart();
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const getLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-300 px-3 py-1.5 rounded-lg
    ${isActive
      ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20"
      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-zinc-950/90 backdrop-blur-xl border-zinc-800/60 shadow-2xl shadow-black/40 py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={Logo}
              alt="Logo"
              className="w-9 h-9 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              Future
              <span className="text-cyan-400 ml-0.5">Dev</span>
            </span>
          </Link>

          {/* Desktop Nav Pills */}
          <div className="hidden lg:flex items-center gap-1 bg-zinc-900/60 px-3 py-2 rounded-2xl border border-zinc-800/50 backdrop-blur-md shadow-inner">
            <NavLink to="/" className={getLinkClass}>Home</NavLink>
            {user && (
              <NavLink to="/my-courses" className={getLinkClass}>My Learning</NavLink>
            )}
            <NavLink to="/courses" className={getLinkClass}>Courses</NavLink>
            <NavLink to="/about" className={getLinkClass}>About</NavLink>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative group flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-900/60 border border-zinc-800/50 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
            >
              <FaShoppingCart className="text-base text-zinc-400 group-hover:text-cyan-400 transition-colors" />
              {user && cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-cyan-500 text-zinc-950 text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Desktop User / Auth */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="relative group pl-3 border-l border-zinc-800">
                  <div className="flex items-center gap-2.5 cursor-pointer py-1.5">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 shadow-[0_0_12px_rgba(6,182,212,0.15)] group-hover:border-cyan-500/40 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.25)] transition-all duration-300 overflow-hidden">
                      <img
                        src={
                          user?.avatar ||
                          `https://ui-avatars.com/api/?name=${user?.name || "U"}&background=0e7490&color=fff`
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="hidden xl:block text-left">
                      <p className="text-sm font-semibold text-white leading-none">{user.name}</p>
                      <p className={`text-xs font-bold uppercase tracking-wider mt-0.5 ${
                        user.role === "admin" ? "text-amber-400" : "text-cyan-400"
                      }`}>
                        {user.role === "admin" ? "Administrator" : "Student"}
                      </p>
                    </div>
                  </div>

                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/60 rounded-2xl shadow-2xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 overflow-hidden">
                    <div className="p-2 space-y-0.5">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-all duration-200"
                      >
                        <FaUserCircle className="text-base text-zinc-500" /> My Profile
                      </Link>

                      {user.role === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-amber-400 font-semibold hover:text-amber-300 hover:bg-amber-500/10 rounded-xl transition-all duration-200"
                        >
                          <FaShieldAlt className="text-base" /> Admin Dashboard
                        </Link>
                      )}

                      <div className="h-px bg-zinc-800 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all duration-200"
                      >
                        <RiLogoutBoxRLine className="text-base" /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 pl-3 border-l border-zinc-800">
                  <Link
                    to="/login"
                    className="px-5 py-2 rounded-xl font-medium text-sm text-zinc-300 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all duration-300"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 btn-primary px-5 py-2 text-sm"
                  >
                    Get Started <RiRocketLine className="text-base" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900/60 border border-zinc-800/50 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-300"
            >
              <HiMenuAlt3 className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-zinc-950 border-l border-zinc-800/60 z-[70] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 flex items-center justify-between border-b border-zinc-800/60">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-semibold text-white tracking-wider uppercase">Menu</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-300"
          >
            <HiX className="text-lg" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
          {[
            { to: "/", label: "Home" },
            { to: "/courses", label: "Courses" },
            { to: "/about", label: "About" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-medium text-base transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to="/my-courses"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-medium text-base transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                }`
              }
            >
              My Learning
            </NavLink>
          )}

          {user && (
            <>
              <div className="h-px bg-zinc-800 my-3 mx-2" />
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest px-4 mb-1">Account</span>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl font-medium text-base transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                  }`
                }
              >
                Profile Settings
              </NavLink>

              {user.role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
                      isActive
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "text-amber-400 hover:bg-amber-500/10"
                    }`
                  }
                >
                  Admin Dashboard
                </NavLink>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-zinc-800/60 bg-zinc-900/40">
          {user ? (
            <div>
              <div className="flex items-center gap-3 mb-4 px-1">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 overflow-hidden">
                  <img
                    src={
                      user?.avatar ||
                      `https://ui-avatars.com/api/?name=${user?.name || "U"}&background=0e7490&color=fff`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{user.name}</p>
                  <p className={`text-xs font-bold uppercase tracking-wider ${
                    user.role === "admin" ? "text-amber-400" : "text-cyan-400"
                  }`}>
                    {user.role === "admin" ? "Administrator" : "Student"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 border border-rose-500/20"
              >
                <RiLogoutBoxRLine /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 text-white rounded-xl font-semibold text-center transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 flex items-center justify-center gap-2 btn-primary"
              >
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