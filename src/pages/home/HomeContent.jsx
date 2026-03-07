import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaChalkboardTeacher, FaCertificate, FaInfinity, FaStar, FaQuoteRight, 
  FaArrowRight, FaUserTie, FaPlayCircle, FaBookOpen 
} from 'react-icons/fa';

const HomeContent = () => {
  // 👈 State لتخزين الكورسات اللي جاية من الباك إند
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    axios.get('http://localhost:1337/api/courses?populate=*')
      .then(response => {
        const fetchedCourses = response.data.data.slice(0, 3).map(item => {
          const attr = item.attributes || item;
          
          let imageUrl = 'https://via.placeholder.com/400x200?text=No+Image';
          if (attr.image) {
            if (attr.image.url) imageUrl = `http://localhost:1337${attr.image.url}`;
            else if (attr.image.data?.attributes?.url) imageUrl = `http://localhost:1337${attr.image.data.attributes.url}`;
          }

          return {
            id: item.id || item.documentId,
            title: attr.title || "بدون عنوان",
            category: attr.category || "General",
            price: attr.price || 0,
            rating: attr.rating || 0,
            instructor: attr.instructor || "Unknown",
            lessons: attr.lessons || 0,
            image: imageUrl
          };
        });

        setPopularCourses(fetchedCourses);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching home courses:", error);
        setLoading(false);
      });
  }, []);

  const features = [
    {
      id: 1,
      title: "World-Class Mentors",
      desc: "Learn directly from engineers at Google, Meta, and Amazon.",
      icon: <FaChalkboardTeacher />,
      iconBg: "bg-purple-500/20 text-purple-400"
    },
    {
      id: 2,
      title: "Verified Certificates",
      desc: "Get accredited certificates that boost your LinkedIn profile instantly.",
      icon: <FaCertificate />,
      iconBg: "bg-blue-500/20 text-blue-400"
    },
    {
      id: 3,
      title: "Lifetime Access",
      desc: "Pay once, learn forever. Get unlimited updates to all course materials.",
      icon: <FaInfinity />,
      iconBg: "bg-teal-500/20 text-teal-400"
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

  return (
    <div className="w-full bg-transparent py-24 relative overflow-hidden">
      
      {/* Background Glows (متوافقة مع 3D والهيرو) */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* --- سكشن المميزات --- */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
            Why Choose Us?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Designed for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Success</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
            We provide the modern ecosystem you need to transform your career and build real-world applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {features.map((item) => (
            <div key={item.id} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl group">
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* --- سكشن الإحصائيات --- */}
        <div className="mb-32 bg-white/5 backdrop-blur-lg rounded-[2.5rem] border border-white/10 p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {stat.value}
                </h3>
                <p className="text-purple-300 text-xs font-bold tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- سكشن الكورسات (ديناميك من الباك إند) --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
             <span className="text-purple-400 font-bold text-sm tracking-widest uppercase mb-2 block">Top Rated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Popular Courses</h2>
          </div>
          <Link to="/courses" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold group bg-white/5 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10">
            Explore All <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {loading ? (
            // Skeleton Loader (تأثير التحميل)
            [1, 2, 3].map(n => (
              <div key={n} className="bg-white/5 border border-white/10 rounded-3xl h-[420px] animate-pulse flex flex-col overflow-hidden">
                <div className="h-52 bg-white/10 w-full"></div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="h-4 bg-white/10 rounded w-1/4"></div>
                  <div className="h-6 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-full mt-4"></div>
                  <div className="h-10 bg-white/10 rounded-xl w-full mt-auto"></div>
                </div>
              </div>
            ))
          ) : popularCourses.length > 0 ? (
            popularCourses.map((course) => (
              <div key={course.id} className="group bg-[#13151d]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 shadow-xl hover:shadow-purple-500/10 flex flex-col hover:-translate-y-1">
                
                <Link to={`/course/${course.id}`} className="relative h-52 overflow-hidden block bg-white">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13151d] via-transparent to-transparent z-10 opacity-90"></div>
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-[#13151d]/80 backdrop-blur-md border border-white/10 text-slate-200 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                      <FaBookOpen className="text-purple-400" /> {course.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow relative z-20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-1.5 text-amber-400 text-sm bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                      <FaStar /> <span className="font-bold text-amber-300">{course.rating}</span>
                    </div>
                    <span className={`text-xl font-black tracking-tight ${course.price === 0 || course.price === "Free" ? "text-green-400" : "text-white"}`}>
                      {course.price === 0 || course.price === "Free" ? "Free" : `$${course.price}`}
                    </span>
                  </div>

                  <Link to={`/course/${course.id}`}>
                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-purple-300 transition-colors">{course.title}</h3>
                  </Link>
                  
                  <div className="flex items-center gap-5 text-xs text-slate-400 mb-8 font-medium">
                    <span className="flex items-center gap-2"><FaUserTie className="text-purple-400" /> {course.instructor}</span>
                    <span className="flex items-center gap-2"><FaPlayCircle className="text-purple-400" /> {course.lessons} Lessons</span>
                  </div>

                  <Link 
                    to={`/course/${course.id}`} 
                    className="w-full mt-auto py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-purple-600/25"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-slate-400">No courses available at the moment.</div>
          )}
        </div>

        {/* --- سكشن التقييمات --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Loved by Students</h2>
          <p className="text-slate-400 font-light">Real feedback from our global community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {reviews.map((review) => (
            <div key={review.id} className="relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 shadow-xl group">
              <FaQuoteRight className="absolute top-8 right-8 text-white/5 text-5xl group-hover:text-purple-500/10 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full border-2 border-white/10 group-hover:border-purple-500/50 transition-colors" />
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <p className="text-purple-300 text-xs">{review.role}</p>
                </div>
              </div>

              <div className="flex gap-1 text-amber-400 text-sm mb-5 relative z-10">
                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-light relative z-10">"{review.text}"</p>
            </div>
          ))}
        </div>

        {/* --- سكشن الـ Call to Action الختامي --- */}
        <div className="relative w-full rounded-[3rem] overflow-hidden p-12 md:p-24 text-center border border-white/10 shadow-2xl mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#0a0a0a] to-blue-900/40"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Start building your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Future Today</span>
            </h2>
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Join a community of ambitious developers. Get access to premium content, expert mentorship, and build a career you love.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link 
                to="/register" 
                className="px-10 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Create Free Account
              </Link>
              <Link 
                to="/courses" 
                className="px-10 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-md"
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