import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChalkboardTeacher, FaCertificate, FaInfinity, FaStar, FaQuoteRight, 
  FaArrowRight, FaUserTie, FaPlayCircle, FaBookOpen 
} from 'react-icons/fa';

import { coursesData } from '../../data/coursesData'; 

const HomeContent = () => {

  const features = [
    {
      id: 1,
      title: "World-Class Mentors",
      desc: "Learn directly from engineers at Google, Meta, and Amazon.",
      icon: <FaChalkboardTeacher />,
      iconBg: "bg-indigo-500/20 text-indigo-300"
    },
    {
      id: 2,
      title: "Verified Certificates",
      desc: "Get accredited certificates that boost your LinkedIn profile instantly.",
      icon: <FaCertificate />,
      iconBg: "bg-blue-500/20 text-blue-300"
    },
    {
      id: 3,
      title: "Lifetime Access",
      desc: "Pay once, learn forever. Get unlimited updates to all course materials.",
      icon: <FaInfinity />,
      iconBg: "bg-teal-500/20 text-teal-300"
    }
  ];

  const stats = [
    { label: "Active Learners", value: "50K+" },
    { label: "Video Hours", value: "1200+" },
    { label: "Expert Mentors", value: "40+" },
    { label: "Success Rate", value: "95%" },
  ];

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      role: "Software Engineer",
      text: "The platform is user-friendly and easy to navigate. The instructors are knowledgeable and engaging. I highly recommend it!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      role: "Data Scientist",
      text: "Best investment in my education. The platform is intuitive and the content is top-notch. I got hired in 3 months!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Product Designer",
      text: "I love the flexibility. I can learn at my own pace, and the community help is faster than StackOverflow!",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5
    }
  ];

  // بناخد أول 3 كورسات من ملفك الحقيقي (React, Next.js, Angular)
  const popularCourses = coursesData.slice(0, 3);

  return (
    <div className="w-full bg-[#0f1117] py-24 relative overflow-hidden">
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-4">
            Why FutureDev?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Designed for your <span className="text-indigo-400">Success</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">We provide the ecosystem you need to transform your career.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {features.map((item) => (
            <div key={item.id} className="bg-[#1a1a2e]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-2 shadow-xl group">
              <div className={`w-16 h-16 rounded-2xl ${item.iconBg} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-32 border rounded-3xl border-white/10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
             <span className="text-indigo-400 font-bold text-sm tracking-widest uppercase mb-2 block">Learning Tracks</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Popular Courses</h2>
          </div>
          <Link to="/courses" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm group">
            Explore All <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- شبكة الكورسات --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {popularCourses.map((course) => (
            <div key={course.id} className="group bg-[#13151d] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col">
              
              <Link to={`/course/${course.id}`} className="relative h-52 overflow-hidden block">
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151d] via-transparent to-transparent z-10 opacity-80"></div>
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-white" />
                
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#13151d]/80 backdrop-blur-md border border-white/10 text-slate-200 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                    <FaBookOpen className="text-indigo-400" /> {course.category}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex flex-col flex-grow relative z-20">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    <FaStar /> <span className="font-bold">{course.rating}</span>
                  </div>
                  <span className={`text-lg font-bold ${course.price === 0 || course.price === "Free" ? "text-teal-400" : "text-white"}`}>
                    {course.price === 0 || course.price === "Free" ? "Free" : `$${course.price}`}
                  </span>
                </div>

                <Link to={`/course/${course.id}`}>
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-indigo-300 transition-colors">{course.title}</h3>
                </Link>
                
                <div className="flex items-center gap-5 text-xs text-slate-500 mb-6">
                  <span className="flex items-center gap-1.5"><FaUserTie className="text-slate-400" /> {course.instructor}</span>
                  <span className="flex items-center gap-1.5"><FaPlayCircle className="text-slate-400" /> {course.lessons} Lessons</span>
                </div>

                <Link 
                  to={`/course/${course.id}`} 
                  className="w-full mt-auto py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Loved by Students</h2>
          <p className="text-slate-400">Feedback from our community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {reviews.map((review) => (
            <div key={review.id} className="relative bg-[#1a1a2e]/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-all duration-300">
              <FaQuoteRight className="absolute top-8 right-8 text-white/5 text-4xl" />
              
              <div className="flex items-center gap-4 mb-6">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <p className="text-slate-500 text-xs">{review.role}</p>
                </div>
              </div>

              <div className="flex gap-1 text-amber-500/80 text-xs mb-4">
                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">"{review.text}"</p>
            </div>
          ))}
        </div>

        <div className="relative w-full rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-white/5 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 to-[#0f1117]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-800/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Start building your <br />
              <span className="text-indigo-400">Future Today</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join a community of ambitious developers. Get access to premium content and expert mentorship.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/register" 
                className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-sm hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
              >
                Create Free Account
              </Link>
              <Link 
                to="/courses" 
                className="px-8 py-4 bg-transparent border border-white/10 text-white rounded-full font-bold text-sm hover:bg-white/5 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeContent;