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
      className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300
      bg-zinc-900/60 text-zinc-500 border border-zinc-800 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 hover:-translate-y-0.5 shadow-sm"
    >
      <Icon size={16} />
    </a>
  );

  const headingStyle = "font-semibold text-base mb-5 relative inline-block text-white";
  const underlineStyle = "absolute bottom-[-6px] left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full";
  const linkStyle = "text-sm transition-all duration-300 flex items-center gap-2 text-zinc-500 hover:text-cyan-400 hover:translate-x-1";

  const tracks = [
    'Data Science',
    'Mobile App',
    'Cyber Security',
    'DevOps',
    'Front-end',
    'Back-end'
  ];

  return (
    <footer className="w-full pt-16 pb-8 border-t border-zinc-800/50 bg-zinc-950 text-zinc-400">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* 1. Logo & Bio */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
              <span className="text-xl font-bold text-white">
                Future<span className="text-cyan-400">Dev</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500">
              Your #1 platform to learn coding from scratch to mastery. We build your future line by line with elite mentors.
            </p>

            <div className="flex items-center gap-2.5 mt-1">
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
            <ul className="flex flex-col gap-3 mt-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/courses", label: "All Courses" },
                { to: "/faq", label: "FAQ" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkStyle}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Top Tracks */}
          <div>
            <h3 className={headingStyle}>
              Top Tracks
              <span className={underlineStyle}></span>
            </h3>
            <ul className="flex flex-col gap-3 mt-2">
              {tracks.map((track, index) => (
                <li key={`${track}-${index}`}>
                  <Link to="/courses" className={linkStyle}>
                    {track}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact */}
          <div>
            <h3 className={headingStyle}>
              Contact Us
              <span className={underlineStyle}></span>
            </h3>
            <ul className="flex flex-col gap-4 mt-2">
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <div className="w-8 h-8 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                  <HiLocationMarker size={16} />
                </div>
                <span className="mt-1 leading-relaxed">Nasr City, Cairo, Egypt.</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-500">
                <div className="w-8 h-8 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center shrink-0 text-cyan-400">
                  <HiMail size={16} />
                </div>
                <span>contact@futuredev.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-500">
                <div className="w-8 h-8 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center shrink-0 text-cyan-400">
                  <HiPhone size={16} />
                </div>
                <span>+20 100 000 0000</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center md:text-left text-zinc-600">
            © {new Date().getFullYear()} All rights reserved to <span className="font-semibold text-zinc-400">FutureDev</span>.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-600">
            <Link to="#" className="hover:text-cyan-400 transition-colors duration-300">Privacy Policy</Link>
            <Link to="#" className="hover:text-cyan-400 transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;