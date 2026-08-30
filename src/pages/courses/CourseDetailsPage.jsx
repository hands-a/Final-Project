import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coursesData } from '../../data/coursesData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import {
  FaStar, FaPlayCircle, FaClock, FaAward,
  FaCheckCircle, FaArrowLeft
} from 'react-icons/fa';

// Category → semantic accent helper (same as CourseCard)
const getCategoryAccent = (category = '') => {
  const cat = category.toLowerCase();
  if (cat.includes('front') || cat.includes('react') || cat.includes('css') || cat.includes('html')) {
    return { badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', check: 'text-cyan-400', tab: 'text-cyan-400 after:bg-cyan-400' };
  }
  if (cat.includes('back') || cat.includes('node') || cat.includes('api') || cat.includes('php') || cat.includes('python')) {
    return { badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20', check: 'text-orange-400', tab: 'text-orange-400 after:bg-orange-400' };
  }
  if (cat.includes('career') || cat.includes('devops') || cat.includes('mobile') || cat.includes('cyber')) {
    return { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', check: 'text-emerald-400', tab: 'text-emerald-400 after:bg-emerald-400' };
  }
  return { badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', check: 'text-cyan-400', tab: 'text-cyan-400 after:bg-cyan-400' };
};

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');

  // Look up course from static data by numeric id or strapiId or documentId
  const course = coursesData.find(c =>
    String(c.id) === String(id) ||
    String(c.strapiId) === String(id) ||
    c.documentId === id
  ) || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!user) { navigate('/login'); return; }
    addToCart(course);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("Please log in first to enroll in this course!");
      navigate('/login');
      return;
    }
    addToCart(course);
    navigate('/checkout');
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center pt-28 px-6 relative z-10">
        <div className="glass-panel p-12 text-center max-w-md">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-zinc-300 mb-5">Course Not Found</h2>
          <p className="text-zinc-500 mb-8 text-sm leading-relaxed">The course you are looking for might have been removed or the link is broken.</p>
          <Link to="/courses" className="btn-primary px-8 py-3.5 w-fit mx-auto">
            <FaArrowLeft className="opacity-80" /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const accent = getCategoryAccent(course.category);

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden text-zinc-300">

      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-cyan-900/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-12">

          {/* ── Left Content ── */}
          <div className="lg:w-2/3">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-zinc-600 mb-6 font-medium">
              <Link to="/courses" className="hover:text-cyan-400 transition-colors duration-300">Courses</Link>
              <span>/</span>
              <span className="text-zinc-400 truncate">{course.title}</span>
            </div>

            {/* Category Badge */}
            <span className={`${accent.badge} border text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block`}>
              {course.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {course.title}
            </h1>
            <p className="text-zinc-500 text-base mb-8 leading-relaxed">
              Master {course.category} with this comprehensive course. Learn from scratch to advanced level.
            </p>

            {/* Instructor & Rating */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-300 mb-10 bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50 p-4 rounded-2xl w-fit">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-xs font-bold text-zinc-950 shadow-md">
                  {course.instructor.charAt(0)}
                </div>
                <span className="font-medium text-white">{course.instructor}</span>
              </div>
              <div className="w-px h-5 bg-zinc-800 hidden sm:block" />
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <FaStar />
                <span>{course.rating}</span>
                <span className="text-zinc-600 font-normal ml-1">(1,250 ratings)</span>
              </div>
            </div>

            {/* Mobile enrollment card */}
            <div className="lg:hidden mb-10">
              <EnrollmentCard course={course} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} accent={accent} />
            </div>

            {/* Tabs */}
            <div className="border-b border-zinc-800/50 mb-8 overflow-x-auto">
              <div className="flex gap-8 min-w-max">
                {['overview', 'instructor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs tracking-widest uppercase transition-all duration-300 relative font-semibold ${
                      activeTab === tab
                        ? `text-cyan-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-cyan-400 after:shadow-[0_0_8px_rgba(6,182,212,0.5)]`
                        : 'text-zinc-600 hover:text-zinc-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Course Description</h3>
                    <p className="leading-relaxed whitespace-pre-wrap text-zinc-500 text-sm">
                      {course.description}
                    </p>
                  </div>

                  {course.requirements && (
                    <div className="glass-panel p-6">
                      <h3 className="text-base font-semibold text-white mb-4">Requirements</h3>
                      <div className="flex items-start gap-3">
                        <FaCheckCircle className={`${accent.check} mt-1 shrink-0`} />
                        <span className="text-sm leading-relaxed text-zinc-400">{course.requirements}</span>
                      </div>
                    </div>
                  )}

                  <div className="glass-panel p-6">
                    <h3 className="text-base font-semibold text-white mb-5">What you'll learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Build full-scale applications",
                        "Understand modern architecture",
                        "Master industry-standard tools",
                        "Write clean, maintainable code"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <FaCheckCircle className={`${accent.check} mt-0.5 shrink-0 text-sm`} />
                          <span className="text-sm text-zinc-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="glass-panel p-8">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-xl font-bold text-zinc-950 shadow-lg shrink-0">
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{course.instructor}</h3>
                      <p className="text-cyan-400 text-xs tracking-widest uppercase mt-1 mb-4 font-semibold">Senior Software Engineer</p>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        Top rated instructor with 10+ years of experience in shipping high-quality software. Passionate about teaching and simplifying complex concepts for students around the globe.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Sticky Enrollment Card ── */}
          <div className="hidden lg:block lg:w-1/3 relative">
            <div className="sticky top-28">
              <EnrollmentCard course={course} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} accent={accent} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const EnrollmentCard = ({ course, onAddToCart, onBuyNow, accent }) => (
  <div className="glass-panel overflow-hidden">

    {/* Preview image */}
    <div className="relative h-52 group cursor-pointer overflow-hidden bg-zinc-900 flex items-center justify-center p-6 border-b border-zinc-800/50">
      <img
        src={course.image}
        alt="Preview"
        className="max-w-full max-h-full object-cover relative z-10 transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors z-20 flex items-center justify-center">
        <FaPlayCircle className="text-white text-4xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
      </div>
    </div>

    <div className="p-7">
      {/* Price */}
      <div className="flex items-end gap-3 mb-6">
        <span className={`text-4xl font-bold tracking-tight ${
          course.price === 0 || course.price === 'Free' ? 'text-emerald-400' : 'text-white'
        }`}>
          {course.price === 0 || course.price === 'Free' ? 'Free' : `$${course.price}`}
        </span>
      </div>

      {/* Enroll button */}
      <button onClick={onAddToCart} className="btn-primary w-full py-4 mb-3">
        {course.price === 0 || course.price === 'Free' ? 'Enroll for Free' : 'Add to Cart'}
      </button>

      {course.price !== 0 && course.price !== 'Free' && (
        <button
          onClick={onBuyNow}
          className="w-full py-4 bg-transparent border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/40 text-white font-semibold rounded-xl transition-all duration-300 mb-5"
        >
          Buy Now
        </button>
      )}

      <p className="text-center text-xs uppercase tracking-widest text-zinc-600 mb-7">
        30-Day Money-Back Guarantee
      </p>

      <div className="space-y-4 border-t border-zinc-800/50 pt-5">
        <FeatureRow icon={FaPlayCircle} text="Full on-demand video access" accent={accent} />
        <FeatureRow icon={FaClock} text={course.duration ? `Duration: ${course.duration}` : "Full lifetime access"} accent={accent} />
        <FeatureRow icon={FaAward} text="Certificate of completion" accent={accent} />
      </div>
    </div>
  </div>
);

const FeatureRow = ({ icon: Icon, text, accent }) => (
  <div className="flex items-center gap-3 text-sm text-zinc-400">
    <Icon className={`${accent?.check || 'text-cyan-400'} text-base shrink-0`} />
    <span>{text}</span>
  </div>
);

export default CourseDetailsPage;