import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import {
  FaStar, FaPlayCircle, FaClock, FaAward,
  FaCheckCircle, FaArrowLeft, FaSpinner
} from 'react-icons/fa';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCourseDetails = async () => {
      setLoading(true);

      try {
        const response = await axios.get('https://futuredev-backend.onrender.com/api/courses?populate=*');

        if (!isMounted) return;

        const allCourses = response.data.data;
        const targetCourse = allCourses.find(c =>
          String(c.id) === String(id) || String(c.documentId) === String(id)
        );

        if (targetCourse) {
          const attr = targetCourse.attributes || targetCourse;

          let imageUrl = 'https://via.placeholder.com/400x200?text=No+Image';
          if (attr.image?.url) {
            imageUrl = attr.image.url.startsWith('http') ? attr.image.url : `https://futuredev-backend.onrender.com${attr.image.url}`;
          } else if (attr.image?.data?.attributes?.url) {
            const url = attr.image.data.attributes.url;
            imageUrl = url.startsWith('http') ? url : `https://futuredev-backend.onrender.com${url}`;
          }

          setCourse({
            id: targetCourse.id || targetCourse.documentId,
            title: attr.title || "No Title Available",
            category: attr.category || "General",
            instructor: attr.instructor || "Unknown",
            rating: attr.rating || 0,
            duration: attr.duration || "N/A",
            level: attr.level || "Beginner",
            price: attr.price || 0,
            description: attr.description || "No description available.",
            requirements: attr.requirements || "",
            image: imageUrl
          });
        } else {
          setCourse(null);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) setCourse(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourseDetails();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center pt-28">
        <FaSpinner className="text-pink-500 text-5xl animate-spin mb-4" />
        <h2 className="text-white text-xl font-light tracking-widest uppercase drop-shadow-lg">Loading course...</h2>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center pt-28 px-6 relative z-10">
        <div className="glass-panel p-12 text-center max-w-lg">
          <h1 className="text-6xl font-light text-white mb-4 tracking-widest">404</h1>
          <h2 className="text-2xl font-light text-slate-300 mb-6 tracking-wide">Course Not Found</h2>
          <p className="text-slate-500 mb-8 font-light leading-relaxed">The course you are looking for might have been removed or the link is broken.</p>
          <Link to="/courses" className="btn-primary px-8 py-3.5 w-fit mx-auto">
            <FaArrowLeft className="opacity-80" /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050511] pt-32 pb-20 relative overflow-hidden text-slate-300">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          
          <div className="lg:w-2/3">
            
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-light">
              <Link to="/courses" className="hover:text-pink-400 transition-colors">Courses</Link> /
              <span className="text-slate-300 truncate"> {course.title}</span>
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

            <div className="lg:hidden mb-10">
               <EnrollmentCard course={course} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
            </div>

            <div className="border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
              <div className="flex gap-8 min-w-max">
                {['overview', 'instructor'].map((tab) => (
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
                    <div className="glass-panel p-6 sm:p-8">
                      <h3 className="text-lg font-medium text-white mb-4 tracking-wide">Requirements</h3>
                      <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-pink-400 mt-1 shrink-0 opacity-80" />
                        <span className="text-sm leading-relaxed text-slate-300">{course.requirements}</span>
                      </div>
                    </div>
                  )}

                  <div className="glass-panel p-6 sm:p-8">
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

              {activeTab === 'instructor' && (
                <div className="glass-panel p-8 animate-fadeIn">
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
              <EnrollmentCard course={course} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const EnrollmentCard = ({ course, onAddToCart, onBuyNow }) => (
  <div className="glass-panel overflow-hidden">
    
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
        className="btn-primary w-full py-4 mb-4"
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
        <FeatureRow icon={FaPlayCircle} text="Full on-demand video access" />
        <FeatureRow icon={FaClock} text={course.duration ? `Duration: ${course.duration}` : "Full lifetime access"} />
        <FeatureRow icon={FaAward} text="Certificate of completion" />
      </div>
    </div>
  </div>
);

const FeatureRow = (props) => (
  <div className="flex items-center gap-4 text-sm text-slate-300 font-light">
    <props.icon className="text-pink-400 text-lg shrink-0 opacity-80" />
    <span>{props.text}</span>
  </div>
);

export default CourseDetailsPage;