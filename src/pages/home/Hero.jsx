import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaCertificate, FaUsers, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { RiRocketLine } from 'react-icons/ri';

// تعريف البيانات خارج المكون لتحسين الأداء
const features = [
  {
    id: 1,
    title: "Certificates",
    desc: "Earn recognized credentials",
    icon: <FaCertificate />,
    color: "bg-blue-600",
    bg: "bg-blue-100",
    shadow: "shadow-blue-500/20"
  },
  {
    id: 2,
    title: "Video Lessons",
    desc: "HD quality video content",
    icon: <FaPlay className="ml-1" />,
    color: "bg-pink-600",
    bg: "bg-pink-100",
    shadow: "shadow-pink-500/20"
  },
  {
    id: 3,
    title: "Track Progress",
    desc: "Smart analytics & insights",
    icon: <FaChartLine />,
    color: "bg-orange-600",
    bg: "bg-orange-100",
    shadow: "shadow-orange-500/20"
  },
  {
    id: 4,
    title: "Community",
    desc: "Learn with peers worldwide",
    icon: <FaUsers />,
    color: "bg-green-600",
    bg: "bg-green-100",
    shadow: "shadow-green-500/20"
  }
];

const Hero = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-slate-50">
      
      {/* --- الخلفية الديكورية (Gradients & Blobs) --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- (اليسار) النصوص والزرار --- */}
          {/* جعلنا النصوص في اليسار لأن الموقع إنجليزي، هذا أفضل لتجربة المستخدم */}
          <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-purple-100 rounded-full px-4 py-1.5 w-fit mx-auto lg:mx-0 shadow-sm animate-fade-in-up">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm font-semibold text-slate-600 tracking-wide">Future of Learning</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-slate-900">
              Unlock Your Potential <br />
              with <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Expert Skills</span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-600 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              We provide the best learning experience with interactive courses, expert instructors, and a supportive community to help you grow.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
              <Link to="/register" className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1">
                Get Started Free <RiRocketLine className="group-hover:rotate-45 transition-transform" />
              </Link>
              <Link to="/courses" className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-slate-700 bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all shadow-sm">
                View Courses <FaPlay className="text-xs text-purple-600 group-hover:scale-110 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-slate-200/60 mt-2">
              {[
                { label: "Active Students", value: "50K+" },
                { label: "Total Courses", value: "200+" },
                { label: "Instructors", value: "4.9/5" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <h4 className="text-2xl lg:text-3xl font-bold text-slate-900">{stat.value}</h4>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- (اليمين) الكروت والجرافيك --- */}
          <div className="order-1 lg:order-2 relative">
             {/* خلفية تجميلية خلف الكروت */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-3xl -z-10"></div>
             
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <div 
                  key={feature.id} 
                  className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-xl ${index === 1 || index === 3 ? 'lg:translate-y-8' : ''} hover:-translate-y-2 transition-transform duration-300 cursor-default`}
                >
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-5 shadow-lg ${feature.shadow}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;