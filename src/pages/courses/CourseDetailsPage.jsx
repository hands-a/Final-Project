import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { 
  FaStar, FaPlayCircle, FaClock, FaAward, 
  FaCheckCircle, FaChevronDown, FaChevronUp, FaLock, FaArrowLeft
} from 'react-icons/fa';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth(); 
  
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  const curriculum = [
    { title: "Introduction & Setup", lessons: 3, duration: "15m" },
    { title: "Core Concepts Deep Dive", lessons: 8, duration: "2h 30m" },
    { title: "Advanced Techniques", lessons: 12, duration: "4h 10m" },
    { title: "Real World Project", lessons: 5, duration: "1h 45m" },
    { title: "Final Exam & Certification", lessons: 1, duration: "45m" },
  ];

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:1337/api/courses?populate=*')
      .then(response => {
        const allCourses = response.data.data;
        const targetCourse = allCourses.find(c => 
          String(c.id) === String(id) || String(c.documentId) === String(id)
        );

        if (targetCourse) {
          const attr = targetCourse.attributes || targetCourse;
          
          let imageUrl = 'https://via.placeholder.com/400x200?text=No+Image';
          if (attr.image) {
            if (attr.image.url) { 
              imageUrl = `http://localhost:1337${attr.image.url}`;
            } else if (attr.image.data?.attributes?.url) { 
              imageUrl = `http://localhost:1337${attr.image.data.attributes.url}`;
            }
          }

          setCourse({
            id: targetCourse.id || targetCourse.documentId,
            title: attr.title || "بدون عنوان",
            category: attr.category || "General",
            instructor: attr.instructor || "Unknown",
            rating: attr.rating || 0,
            lessons: attr.lessons || 0,
            duration: attr.duration || "N/A",
            level: attr.level || "Beginner",
            price: attr.price || 0,
            description: attr.description || "لا يوجد وصف متاح حالياً.",
            requirements: attr.requirements || "",
            image: imageUrl
          });
        } else {
          setCourse(null);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching course details:", error);
        setCourse(null);
        setLoading(false);
      });
      
    window.scrollTo(0, 0);
  }, [id]);

  // 💡 دالة زرار الإضافة للكارت
  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in first to enroll in this course!"); 
      navigate('/login');
      return;
    }
    addToCart(course);
    navigate('/cart');
  };

  // 💡 دالة زرار الشراء المباشر (جديدة)
  const handleBuyNow = () => {
    if (!user) {
      alert("Please log in first to enroll in this course!"); 
      navigate('/login');
      return;
    }
    addToCart(course);
    navigate('/checkout'); // بتودي للدفع علطول
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050511] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-light text-white mb-4 tracking-widest">404</h1>
        <h2 className="text-2xl font-light text-slate-300 mb-6 tracking-wide">Course Not Found</h2>
        <p className="text-slate-500 mb-8 font-light">The course you are looking for might have been removed or the link is broken.</p>
        <Link to="/courses" className="flex items-center gap-2 px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all">
          <FaArrowLeft /> Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          
          <div className="lg:w-2/3">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-light">
              <Link to="/courses" className="hover:text-pink-400 transition-colors">Courses</Link> / 
              <span className="text-slate-300 truncate">{course.title}</span>
            </div>

            <span className="bg-white/5 backdrop-blur-md border border-white/10 text-pink-400 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block shadow-sm">
              {course.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-light text-white mb-4 leading-tight tracking-wide">
              {course.title}
            </h1>

            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
              Master {course.category} with this comprehensive course. Learn from scratch to advanced level.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 mb-10 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-fit">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                  {course.instructor.charAt(0)}
                </div>
                <span className="font-medium text-white tracking-wide">{course.instructor}</span>
              </div>
              <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
              <div className="flex items-center gap-1.5 text-pink-400 font-medium">
                <FaStar /> {course.rating} <span className="text-slate-500 font-light ml-1">(1,250 ratings)</span>
              </div>
            </div>

            {/* 💡 مررنا الدالتين للموبايل */}
            <div className="lg:hidden mb-10">
               <EnrollmentCard course={course} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
            </div>

            <div className="border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
              <div className="flex gap-8 min-w-max">
                {['overview', 'curriculum', 'instructor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm tracking-widest uppercase transition-all relative ${
                      activeTab === tab 
                      ? 'text-pink-400 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-pink-400 after:shadow-[0_0_8px_rgba(244,114,182,0.6)]' 
                      : 'text-slate-500 font-medium hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-slate-300 font-light">
              
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-4 tracking-wide">Course Description</h3>
                    <p className="leading-relaxed whitespace-pre-wrap text-slate-400">
                      {course.description}
                    </p>
                  </div>
                  
                  {course.requirements && (
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                      <h3 className="text-lg font-medium text-white mb-4 tracking-wide">Requirements</h3>
                      <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-pink-400 mt-1 shrink-0 opacity-80" />
                        <span className="text-sm leading-relaxed text-slate-300">{course.requirements}</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                    <h3 className="text-lg font-medium text-white mb-5 tracking-wide">What you'll learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Build full-scale applications", "Understand modern architecture", "Master industry-standard tools", "Write clean, maintainable code"].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <FaCheckCircle className="text-pink-400 mt-1 shrink-0 opacity-80" />
                          <span className="text-sm text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex justify-between items-end mb-6">
                    <h3 className="text-xl font-medium text-white tracking-wide">Course Content</h3>
                    <span className="text-xs text-slate-500 tracking-wider uppercase">{curriculum.length} Sections • {course.lessons} Lectures</span>
                  </div>
                  {curriculum.map((section, idx) => (
                    <CurriculumItem key={idx} section={section} idx={idx} />
                  ))}
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] animate-fadeIn">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shrink-0">
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">{course.instructor}</h3>
                      <p className="text-pink-400 text-xs tracking-widest uppercase mt-1 mb-4">Senior Software Engineer</p>
                      <p className="text-sm text-slate-400 leading-relaxed font-light">
                        Top rated instructor with 10+ years of experience in shipping high-quality software. Passionate about teaching and simplifying complex concepts for students around the globe.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/3 relative">
            <div className="sticky top-28">
              {/* 💡 مررنا الدالتين للكمبيوتر */}
              <EnrollmentCard course={course} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// 💡 استقبلنا الدالتين هنا وربطنا كل زرار بدالته الصح
const EnrollmentCard = ({ course, onAddToCart, onBuyNow }) => (
  <div className="bg-white/0 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
    
    <div className="relative h-56 group cursor-pointer overflow-hidden bg-white/5 flex items-center justify-center p-6 border-b border-white/5">
      <img 
        src={course.image} 
        alt="Preview" 
        className="max-w-[100%] max-h-[100%] object-cover relative z-10 transform group-hover:scale-105 transition-transform duration-700" 
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-20 flex items-center justify-center">
        <FaPlayCircle className="text-white text-5xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
      </div>
    </div>

    <div className="p-8">
      <div className="flex items-end gap-3 mb-8">
        <span className={`text-4xl font-light tracking-tight ${course.price === 0 || course.price === 'Free' ? 'text-pink-400' : 'text-white'}`}>
          {course.price === 0 || course.price === 'Free' ? 'Free' : `$${course.price}`}
        </span>
      </div>

      <button 
        onClick={onAddToCart}
        className="w-full py-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium rounded-xl shadow-lg shadow-pink-500/20 transition-all mb-4 hover:scale-[1.02] active:scale-[0.98]"
      >
        {course.price === 0 || course.price === 'Free' ? 'Enroll for Free' : 'Add to Cart'}
      </button>
      
      {course.price !== 0 && course.price !== 'Free' && (
        <button 
          onClick={onBuyNow} 
          className="w-full py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium rounded-xl transition-all mb-6"
        >
          Buy Now
        </button>
      )}

      <p className="text-center text-[10px] uppercase tracking-widest text-slate-500 mb-8">30-Day Money-Back Guarantee</p>

      <div className="space-y-5">
        <FeatureRow icon={FaPlayCircle} text={`${course.lessons} On-demand video lessons`} />
        <FeatureRow icon={FaClock} text={course.duration ? `Duration: ${course.duration}` : "Full lifetime access"} />
        <FeatureRow icon={FaAward} text="Certificate of completion" />
      </div>
    </div>
  </div>
);

const FeatureRow = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-4 text-sm text-slate-300 font-light">
    <Icon className="text-pink-400 text-lg shrink-0 opacity-80" />
    <span>{text}</span>
  </div>
);

const CurriculumItem = ({ section, idx }) => {
  const [isOpen, setIsOpen] = useState(idx === 0);

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/0 backdrop-blur-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
             {isOpen ? <FaChevronUp className="text-pink-400 text-[10px]" /> : <FaChevronDown className="text-slate-400 text-[10px]" />}
          </div>
          <span className="font-medium text-white text-sm text-left tracking-wide">{section.title}</span>
        </div>
        <span className="text-xs text-slate-500 tracking-wider hidden sm:block">{section.lessons} lessons • {section.duration}</span>
      </button>
      
      {isOpen && (
        <div className="p-5 bg-white/5 space-y-4 border-t border-white/5">
          {[...Array(section.lessons)].map((_, i) => (
            <div key={i} className="flex justify-between items-center text-sm text-slate-400 hover:text-pink-300 cursor-pointer transition-colors group px-2">
              <div className="flex items-center gap-4">
                <FaPlayCircle className="text-xs text-slate-500 group-hover:text-pink-400" />
                <span className="font-light">Lesson {i + 1}: Introduction to topic</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-widest opacity-50">10:00</span>
                <FaLock className="text-xs opacity-30" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;