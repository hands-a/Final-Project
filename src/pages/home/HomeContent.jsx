import React from 'react';
import { Link } from 'react-router-dom';
import { coursesData } from '../../data/coursesData';
import {
  FaChalkboardTeacher, FaCertificate, FaInfinity, FaStar, FaQuoteRight,
  FaArrowRight, FaUserTie, FaPlayCircle, FaBookOpen
} from 'react-icons/fa';

// Category → semantic accent
const getCategoryColors = (category = '') => {
  const cat = category.toLowerCase();
  if (cat.includes('front') || cat.includes('react') || cat.includes('css') || cat.includes('html')) {
    return { badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', title: 'group-hover:text-cyan-400' };
  }
  if (cat.includes('back') || cat.includes('node') || cat.includes('api') || cat.includes('php') || cat.includes('python')) {
    return { badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20', title: 'group-hover:text-orange-400' };
  }
  if (cat.includes('career') || cat.includes('devops') || cat.includes('mobile') || cat.includes('cyber')) {
    return { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', title: 'group-hover:text-emerald-400' };
  }
  if (cat.includes('data') || cat.includes('science') || cat.includes('ai') || cat.includes('ml')) {
    return { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', title: 'group-hover:text-amber-400' };
  }
  return { badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', title: 'group-hover:text-cyan-400' };
};

const HomeContent = () => {
  // Use top 3 highest-rated courses from static data for the homepage
  const popularCourses = [...coursesData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const features = [
    {
      id: 1,
      title: "World-Class Mentors",
      desc: "Learn directly from engineers at Google, Meta, and Amazon.",
      icon: <FaChalkboardTeacher />,
      iconBg: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    },
    {
      id: 2,
      title: "Verified Certificates",
      desc: "Get accredited certificates that boost your LinkedIn profile instantly.",
      icon: <FaCertificate />,
      iconBg: "bg-amber-500/20 text-amber-400 border border-amber-500/20",
    },
    {
      id: 3,
      title: "Lifetime Access",
      desc: "Pay once, learn forever. Get unlimited updates to all course materials.",
      icon: <FaInfinity />,
      iconBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    }
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

  return (
    <div className="w-full bg-transparent py-24 relative overflow-hidden">

      {/* Ambient background */}
      <div className="absolute top-20 left-0 w-[600px] h-[500px] bg-cyan-900/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-[700px] h-[600px] bg-emerald-900/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Why Choose Us ── */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            Why Choose Us?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Designed for your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Success
            </span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">
            We provide the modern ecosystem you need to transform your career and build real-world applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {features.map((item) => (
            <div key={item.id} className="glass-panel p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center text-xl mb-6 shadow-md group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Popular Courses ── */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-zinc-800/50 pb-6">
          <div>
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase mb-2 block">Top Rated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Popular Courses</h2>
          </div>
          <Link
            to="/courses"
            className="text-zinc-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 text-xs font-bold uppercase tracking-widest group bg-zinc-900/60 border border-zinc-800/50 hover:border-cyan-500/30 px-5 py-3 rounded-xl hover:bg-cyan-500/5"
          >
            Explore All <FaArrowRight className="opacity-80 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {popularCourses.length > 0 ? (
            popularCourses.map((course) => {
              const accent = getCategoryColors(course.category);
              return (
                <div key={course.id} className="glass-panel group overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-xl hover:border-zinc-700/60">

                  <Link to={`/course/${course.id}`} className="relative h-48 overflow-hidden block bg-zinc-900 border-b border-zinc-800/50">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/50 backdrop-blur-sm z-20">
                      <div className="w-14 h-14 bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <FaPlayCircle className="text-2xl text-cyan-400" />
                      </div>
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`${accent.badge} border text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>
                        <FaBookOpen className="inline mr-1 opacity-80" />{course.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs bg-zinc-800/60 px-2.5 py-1 rounded-full border border-zinc-700/50">
                        <FaStar className="mb-0.5" /> <span className="font-bold text-white">{course.rating}</span>
                      </div>
                    </div>

                    <Link to={`/course/${course.id}`}>
                      <h3 className={`text-base font-semibold text-white mb-4 line-clamp-2 ${accent.title} transition-colors duration-300`}>
                        {course.title}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between text-xs text-zinc-600 mb-6 font-medium uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><FaUserTie className="text-cyan-400/60" /> {course.instructor}</span>
                      <span className="flex items-center gap-1.5"><FaPlayCircle className="text-cyan-400/60" /> {Array.isArray(course.lessons) ? course.lessons.length : (course.lessons ?? 0)} Lessons</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-800/50">
                      <span className={`text-xl font-semibold ${course.price === 0 || course.price === "Free" ? "text-emerald-400" : "text-white"}`}>
                        {course.price === 0 || course.price === "Free" ? "Free" : `$${course.price}`}
                      </span>
                      <Link
                        to={`/course/${course.id}`}
                        className="px-5 py-2 rounded-xl bg-transparent border border-zinc-700 text-zinc-400 text-xs uppercase tracking-widest font-bold hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300 flex items-center gap-1.5"
                      >
                        View <FaArrowRight className="opacity-70" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-10 text-zinc-600 tracking-wider">
              No courses available at the moment.
            </div>
          )}
        </div>

        {/* ── Reviews ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Loved by Students
          </h2>
          <p className="text-zinc-500 text-sm">Real feedback from our global community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {reviews.map((review) => (
            <div key={review.id} className="relative glass-panel p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/60 group">
              <FaQuoteRight className="absolute top-6 right-6 text-zinc-800 text-4xl group-hover:text-cyan-500/10 transition-colors duration-300" />

              <div className="flex items-center gap-4 mb-5 relative z-10">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full border border-zinc-700 group-hover:border-cyan-500/30 transition-colors duration-300 shadow-sm" />
                <div>
                  <h4 className="text-white font-semibold text-sm">{review.name}</h4>
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-0.5">{review.role}</p>
                </div>
              </div>

              <div className="flex gap-1 text-amber-400 text-sm mb-4 relative z-10">
                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed relative z-10">"{review.text}"</p>
            </div>
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div className="relative w-full overflow-hidden p-12 md:p-24 text-center mb-10 glass-panel">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/15 via-transparent to-emerald-900/15 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Start building your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Future Today
              </span>
            </h2>
            <p className="text-zinc-500 text-sm md:text-base mb-10 max-w-2xl mx-auto leading-relaxed">
              Join a community of ambitious developers. Get access to premium content, expert mentorship, and build a career you love.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary px-10 py-4 text-base shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                Create Free Account
              </Link>
              <Link
                to="/courses"
                className="px-10 py-4 bg-zinc-900/60 border border-zinc-700/50 text-white rounded-xl font-semibold hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 shadow-sm"
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