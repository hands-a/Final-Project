import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coursesData } from '../../data/coursesData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // 👈 1. استدعاء نظام المستخدمين
import { 
  FaStar, FaPlayCircle, FaClock, FaAward, FaMobileAlt, 
  FaCheckCircle, FaChevronDown, FaChevronUp, FaLock
} from 'react-icons/fa';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth(); // 👈 2. التأكد من حالة المستخدم
  
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const curriculum = [
    { title: "Introduction & Setup", lessons: 3, duration: "15m" },
    { title: "Core Concepts Deep Dive", lessons: 8, duration: "2h 30m" },
    { title: "Advanced Techniques", lessons: 12, duration: "4h 10m" },
    { title: "Real World Project", lessons: 5, duration: "1h 45m" },
    { title: "Final Exam & Certification", lessons: 1, duration: "45m" },
  ];

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
    window.scrollTo(0, 0);
  }, [id]);

  // 👇 3. تعديل دالة الإضافة للسلة
  const handleAddToCart = () => {
    // لو مفيش مستخدم، نمنعه ونوديه يسجل دخول
    if (!user) {
      alert("Please log in first to enroll in this course!"); 
      navigate('/login');
      return;
    }

    // لو مسجل، كمل عادي
    addToCart(course);
    navigate('/cart');
  };

  if (!course) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          
          {/* --- Left Content --- */}
          <div className="lg:w-2/3">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link to="/courses" className="hover:text-purple-400 transition-colors">Courses</Link> / 
              <span className="text-white truncate">{course.title}</span>
            </div>

            {/* Badge */}
            <span className="bg-purple-600/20 text-purple-300 border border-purple-600/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              {course.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              Master {course.category} from scratch. This comprehensive course covers everything you need to become a professional developer using modern tools.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white border border-purple-500">
                  {course.instructor.charAt(0)}
                </div>
                <span className="font-bold text-white">{course.instructor}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <FaStar /> {course.rating} <span className="text-slate-400 font-normal">(1,250 ratings)</span>
              </div>
            </div>

            {/* Mobile Enrollment Card */}
            <div className="lg:hidden mb-10">
               <EnrollmentCard course={course} onAddToCart={handleAddToCart} />
            </div>

            {/* --- Tabs --- */}
            <div className="border-b border-white/10 mb-8 overflow-x-auto">
              <div className="flex gap-8 min-w-max">
                {['overview', 'curriculum', 'instructor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold capitalize transition-all relative ${
                      activeTab === tab 
                      ? 'text-purple-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-purple-400' 
                      : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* --- Tab Content --- */}
            <div className="text-slate-300">
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-2xl font-bold text-white mb-2">Course Description</h3>
                  <p className="leading-relaxed">
                    This course is designed for beginners and professionals alike. We start from the very basics and move towards advanced topics. 
                    You will build real-world projects, learn best practices, and get ready for high-paying jobs.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white mt-8 mb-4">What you'll learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Build full-scale applications", "Understand modern architecture", "Master industry-standard tools", "Write clean, maintainable code"].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-purple-500 mt-1 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Course Content</h3>
                    <span className="text-sm text-slate-400">{curriculum.length} Sections • {course.lessons} Lectures</span>
                  </div>
                  {curriculum.map((section, idx) => (
                    <CurriculumItem key={idx} section={section} idx={idx} />
                  ))}
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl animate-fadeIn">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold text-white border-2 border-purple-500 shrink-0">
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{course.instructor}</h3>
                      <p className="text-purple-400 text-sm mb-3">Senior Software Engineer</p>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Top rated instructor with 10+ years of experience in shipping high-quality software.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- Right Sidebar (Sticky) --- */}
          <div className="hidden lg:block lg:w-1/3 relative">
            <div className="sticky top-28">
              <EnrollmentCard course={course} onAddToCart={handleAddToCart} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const EnrollmentCard = ({ course, onAddToCart }) => (
  <div className="bg-[#13151d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
    {/* Preview Image: Object-Contain for Logos */}
    <div className="relative h-48 group cursor-pointer overflow-hidden bg-[#0f1119] p-6 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-[#13151d] to-transparent opacity-60"></div>
      <img 
        src={course.image} 
        alt="Preview" 
        className="w-full h-full object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-500" 
      />
    </div>

    <div className="p-6">
      <div className="flex items-end gap-3 mb-6">
        <span className={`text-3xl font-bold ${course.price === 0 ? 'text-green-400' : 'text-white'}`}>
          {course.price === 0 ? 'Free' : `$${course.price}`}
        </span>
      </div>

      <button 
        onClick={onAddToCart}
        className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/25 transition-all mb-4 transform hover:-translate-y-1"
      >
        {course.price === 0 ? 'Enroll for Free' : 'Add to Cart'}
      </button>
      
      {course.price > 0 && (
        <button 
          onClick={onAddToCart}
          className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all mb-6"
        >
          Buy Now
        </button>
      )}

      <p className="text-center text-xs text-slate-500 mb-6">30-Day Money-Back Guarantee</p>

      <div className="space-y-4">
        <FeatureRow icon={FaPlayCircle} text={`${course.lessons} On-demand video lessons`} />
        <FeatureRow icon={FaClock} text="Full lifetime access" />
        <FeatureRow icon={FaAward} text="Certificate of completion" />
      </div>
    </div>
  </div>
);

const FeatureRow = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 text-sm text-slate-300">
    <Icon className="text-purple-500 shrink-0" />
    <span>{text}</span>
  </div>
);

const CurriculumItem = ({ section, idx }) => {
  const [isOpen, setIsOpen] = useState(idx === 0);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isOpen ? <FaChevronUp className="text-slate-400 text-xs" /> : <FaChevronDown className="text-slate-400 text-xs" />}
          <span className="font-bold text-white text-sm text-left">{section.title}</span>
        </div>
        <span className="text-xs text-slate-400">{section.lessons} lessons • {section.duration}</span>
      </button>
      
      {isOpen && (
        <div className="p-4 bg-[#0a0a0a]/50 space-y-3 border-t border-white/5">
          {[...Array(section.lessons)].map((_, i) => (
            <div key={i} className="flex justify-between items-center text-sm text-slate-400 hover:text-purple-300 cursor-pointer transition-colors group">
              <div className="flex items-center gap-3">
                <FaPlayCircle className="text-xs text-slate-500 group-hover:text-purple-400" />
                <span>Lesson {i + 1}: Introduction to topic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-50">10:00</span>
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