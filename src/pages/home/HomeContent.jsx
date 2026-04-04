import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaChalkboardTeacher, FaCertificate, FaInfinity, FaStar, FaQuoteRight, 
  FaArrowRight, FaUserTie, FaPlayCircle, FaBookOpen 
} from 'react-icons/fa';

const HomeContent = () => {
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
            // 💡 التعديل هنا: خلينا الكود يعد الدروس بدل ما يجيب الداتا كلها
            lessons: attr.lessons?.data?.length || attr.lessons?.length || 0,
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
      iconBg: "bg-pink-500/10 text-pink-400 border border-pink-500/20"
    },
    {
      id: 2,
      title: "Verified Certificates",
      desc: "Get accredited certificates that boost your LinkedIn profile instantly.",
      icon: <FaCertificate />,
      iconBg: "bg-violet-500/10 text-violet-400 border border-violet-500/20"
    },
    {
      id: 3,
      title: "Lifetime Access",
      desc: "Pay once, learn forever. Get unlimited updates to all course materials.",
      icon: <FaInfinity />,
      iconBg: "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20"
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
      
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-0 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-pink-400 text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm">
            Why Choose Us?
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-wide">
            Designed for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 font-medium">Success</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm font-light leading-relaxed tracking-wide">
            We provide the modern ecosystem you need to transform your career and build real-world applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {features.map((item) => (
            <div key={item.id} className="bg-white/0 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-pink-400/30 hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] group">
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-medium tracking-wide text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* --- Stats Section (Pure Glass) --- */}
        <div className="mb-32 bg-white/0 backdrop-blur-xl rounded-[3rem] border border-white/10 p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <h3 className="text-4xl md:text-5xl font-light text-white tracking-wide drop-shadow-md">
                  {stat.value}
                </h3>
                <p className="text-pink-400 text-[10px] font-bold tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-6">
          <div>
             <span className="text-pink-400 font-bold text-[10px] tracking-widest uppercase mb-2 block">Top Rated</span>
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-wide">Popular Courses</h2>
          </div>
          <Link to="/courses" className="text-slate-300 hover:text-white transition-colors flex items-center gap-3 text-xs font-bold uppercase tracking-widest group bg-white/5 px-6 py-3.5 rounded-full border border-white/10 hover:bg-white/10">
            Explore All <FaArrowRight className="opacity-80 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {loading ? (
            [1, 2, 3].map(n => (
              <div key={n} className="bg-white/0 backdrop-blur-xl border border-white/10 rounded-3xl h-[440px] animate-pulse flex flex-col overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
                <div className="h-52 bg-white/5 w-full border-b border-white/5"></div>
                <div className="p-8 flex-1 flex flex-col gap-5">
                  <div className="flex justify-between">
                     <div className="h-5 bg-white/10 rounded-full w-1/3"></div>
                     <div className="h-5 bg-white/10 rounded-full w-1/4"></div>
                  </div>
                  <div className="h-6 bg-white/10 rounded w-3/4 mt-2"></div>
                  <div className="h-4 bg-white/10 rounded w-full mt-auto"></div>
                  <div className="h-12 bg-white/10 rounded-xl w-full mt-4"></div>
                </div>
              </div>
            ))
          ) : popularCourses.length > 0 ? (
            popularCourses.map((course) => (
              
              <div key={course.id} className="group bg-white/0 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-pink-500/30 transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_0_rgba(244,114,182,0.15)] flex flex-col hover:-translate-y-2">
                
                {/* Image Section */}
                <Link to={`/course/${course.id}`} className="relative h-52 overflow-hidden block bg-white/5 border-b border-white/5">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  
                  {/* Glass Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 backdrop-blur-sm z-20">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                      <FaPlayCircle className="text-3xl opacity-90" />
                    </div>
                  </div>
                </Link>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow relative z-20">
                  <div className="flex justify-between items-start mb-5">
                    <span className="bg-white/5 border border-white/10 text-pink-400 text-[9px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-widest shadow-sm">
                      <FaBookOpen className="opacity-80" /> {course.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-amber-400 text-[10px] bg-white/5 px-2.5 py-1.5 rounded-full border border-white/10 shadow-sm">
                      <FaStar className="mb-0.5" /> <span className="font-bold text-white tracking-widest">{course.rating}</span>
                    </div>
                  </div>

                  <Link to={`/course/${course.id}`}>
                    <h3 className="text-xl font-medium tracking-wide text-white mb-4 line-clamp-2 group-hover:text-pink-400 transition-colors">
                      {course.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-8 font-medium uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><FaUserTie className="text-pink-400 opacity-80 text-sm" /> {course.instructor}</span>
                    <span className="flex items-center gap-1.5"><FaPlayCircle className="text-pink-400 opacity-80 text-sm" /> {course.lessons} Lessons</span>
                  </div>

                  {/* Card Footer (Price & Action) */}
                  <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/10">
                    <span className={`text-2xl font-light tracking-wider ${course.price === 0 || course.price === "Free" ? "text-pink-400" : "text-white"}`}>
                      {course.price === 0 || course.price === "Free" ? "Free" : `$${course.price}`}
                    </span>
                    <Link 
                      to={`/course/${course.id}`} 
                      className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2"
                    >
                      View <FaArrowRight className="opacity-70" />
                    </Link>
                  </div>
                </div>
              </div>

            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-slate-500 font-light tracking-wider">No courses available at the moment.</div>
          )}
        </div>

        {/* --- Reviews Section (Pure Glass) --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-wide">Loved by Students</h2>
          <p className="text-slate-400 font-light tracking-wide text-sm">Real feedback from our global community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {reviews.map((review) => (
            <div key={review.id} className="relative bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl hover:bg-white/5 hover:border-pink-400/30 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] group">
              <FaQuoteRight className="absolute top-8 right-8 text-white/5 text-5xl group-hover:text-pink-500/10 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full border border-white/20 group-hover:border-pink-400/50 transition-colors shadow-sm" />
                <div>
                  <h4 className="text-white font-medium tracking-wide text-sm">{review.name}</h4>
                  <p className="text-pink-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{review.role}</p>
                </div>
              </div>

              <div className="flex gap-1 text-amber-400 text-sm mb-5 relative z-10">
                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
              </div>

              <p className="text-slate-400 text-sm leading-relaxed font-light relative z-10">"{review.text}"</p>
            </div>
          ))}
        </div>

        {/* --- Final CTA Section (Glassmorphism) --- */}
        <div className="relative w-full rounded-[3rem] overflow-hidden p-12 md:p-24 text-center border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] mb-10 bg-white/0 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-transparent to-violet-900/20 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wide drop-shadow-lg leading-tight">
              Start building your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 font-medium">Future Today</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-10 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Join a community of ambitious developers. Get access to premium content, expert mentorship, and build a career you love.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link 
                to="/register" 
                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-xl font-medium tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-pink-500/20"
              >
                Create Free Account
              </Link>
              <Link 
                to="/courses" 
                className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium tracking-wide hover:bg-white/10 hover:border-white/30 transition-all shadow-sm"
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