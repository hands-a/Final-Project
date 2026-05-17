import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../assets/logo.png"; 
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';

const Footer = () => {

  const SocialIcon = ({ icon: Icon, link }) => (
    <a 
      href={link || "#"} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 
      bg-white/5 text-white border border-white/10 hover:bg-purple-600 hover:border-purple-600 shadow-lg"
    >
      <Icon size={18} />
    </a>
  );

  const headingStyle = "font-bold text-lg mb-6 relative inline-block text-white";
  const underlineStyle = "absolute bottom-[-8px] left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full";
  const linkStyle = "text-sm font-medium transition-all duration-300 flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1";

  // Removed the duplicate 'Data Science'
  const tracks = [
    'Data Science',
    'Mobile App', 
    'Cyber Security',
    'DevOps',
    'Front-end',
    'Back-end'
  ];

  return (
    <footer className="w-full pt-20 pb-8 border-t border-white/10 bg-[#020202] text-slate-300">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Logo & Bio */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
               <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
               <span className="text-2xl font-bold font-english text-white">
                Future<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Dev</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your #1 platform to learn coding from scratch to mastery. We build your future line by line with elite mentors.
            </p>
            
            <div className="flex items-center gap-3 mt-2">
              <SocialIcon icon={FaFacebookF} link="#" />
              <SocialIcon icon={FaXTwitter} link="#" />
              <SocialIcon icon={FaLinkedinIn} link="#" />
              <SocialIcon icon={FaGithub} link="#" />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className={headingStyle}>
              Quick Links
              <span className={underlineStyle}></span>
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/" className={linkStyle}>
                  <span className="text-purple-500 text-xs">●</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={linkStyle}> 
                  <span className="text-purple-500 text-xs">●</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className={linkStyle}>
                  <span className="text-purple-500 text-xs">●</span> All Courses
                </Link>
              </li>
              
              <li>
                <Link to="/faq" className={linkStyle}>
                  <span className="text-purple-500 text-xs">●</span> FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Top Tracks */}
          <div>
            <h3 className={headingStyle}>
              Top Tracks
              <span className={underlineStyle}></span>
            </h3>
            <ul className="flex flex-col gap-3">
              {tracks.map((track, index) => (
                <li key={`${track}-${index}`}>
                  <Link to="/courses" className={linkStyle}>
                    <span className="text-pink-500 text-xs">●</span> {track}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Us */}
          <div>
            <h3 className={headingStyle}>
              Contact Us
              <span className={underlineStyle}></span>
            </h3>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-purple-400">
                    <HiLocationMarker size={18} />
                </div>
                <span className="mt-1">Nasr City, Cairo, Egypt.</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-purple-400">
                    <HiMail size={18} />
                </div>
                <span>contact@futuredev.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-purple-400">
                    <HiPhone size={18} />
                </div>
                <span>+20 100 000 0000</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center md:text-left text-slate-500">
            © {new Date().getFullYear()} All rights reserved to <span className="font-bold text-white">FutureDev</span>.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="#" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;