import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player'; // 👈 استدعاء مكتبة الفيديو
import { useStudent } from '../../context/StudentContext';
import { 
  FaCheckCircle, FaChevronLeft, FaListUl, 
  FaRegCircle, FaQuestionCircle, FaArrowRight, FaSpinner, FaTrophy, FaRedo
} from 'react-icons/fa';

const CoursePlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enrolledCourses, updateProgress } = useStudent();

  // 1. تعريف الـ States الخاصة بالداتا الحقيقية
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // States القديمة بتاعتك
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // 2. جلب الكورس ودروسه من Strapi
  useEffect(() => {
    // بنطلب الكورس بالـ ID بتاعه، وبنعمل populate للدروس عشان تيجي معاه
    axios.get(`http://localhost:1337/api/courses/${id}?populate=lessons`)
      .then(response => {
        const courseData = response.data.data;
        setCourse(courseData);
        
        // لو الكورس ليه دروس بنحفظها، لو ملوش بنحط مصفوفة فاضية
        if (courseData.attributes.lessons && courseData.attributes.lessons.data) {
          setLessons(courseData.attributes.lessons.data);
        }
        
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching course and lessons:", error);
        setLoading(false);
      });
  }, [id]);

  // حماية المسار (تم التعديل ليتناسب مع Strapi ID اللي غالباً بيكون رقم أو نص)
  useEffect(() => {
    if (loading) return;
    const isEnrolled = enrolledCourses.some(c => String(c.id) === String(id));
    if (!isEnrolled) {
      navigate(`/courses/${id}`);
    }
  }, [id, enrolledCourses, loading, navigate]);

  // التحكم في السايدبار
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth > 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // تصفير الكويز أوتوماتيك
  useEffect(() => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLessonIndex]);

  // الانتقال للدرس التالي
  const handleNext = () => {
    if (lessons.length === 0) return;

    const isLastLesson = currentLessonIndex === lessons.length - 1;

    try {
      if (isLastLesson) {
        if (updateProgress) updateProgress(id, 100);
        setTimeout(() => {
          if (window.confirm("🎉 Congratulations! You have completed the course 100%.\nGo to your Dashboard?")) {
            navigate('/my-courses');
          }
        }, 100);
      } else {
        const nextIndex = currentLessonIndex + 1;
        const total = lessons.length;
        const progress = Math.round((nextIndex / total) * 100);
        
        if (updateProgress) updateProgress(id, progress);
        setCurrentLessonIndex(nextIndex);
      }
    } catch (error) {
      console.error("Progress update failed", error);
    }
  };

  const handleAnswer = (optionIndex, correctIndex) => {
    if (optionIndex === correctIndex) {
      setScore(prev => prev + 1);
    }
    const nextQ = currentQuestion + 1;
    if (nextQ < currentLesson.attributes.questions.length) {
      setCurrentQuestion(nextQ);
    } else {
      setShowResult(true);
    }
  };

  // شاشة التحميل
  if (loading) {
    return (
      <div className="flex h-screen bg-[#0a0a0a] items-center justify-center flex-col">
        <FaSpinner className="text-purple-500 text-5xl animate-spin mb-4" />
        <h2 className="text-white text-xl font-bold">جاري تحميل الدرس...</h2>
      </div>
    );
  }

  // لو مفيش كورس
  if (!course) return <div className="text-white text-center pt-40">Course not found.</div>;

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden relative">
      
      {/* --- Sidebar --- */}
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside 
        className={`
          fixed lg:static top-0 left-0 h-full z-30 bg-[#13151d] border-r border-white/5 
          transition-all duration-300 ease-in-out w-80 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-0 lg:-translate-x-full lg:overflow-hidden'}
        `}
      >
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#13151d]">
          <h2 className="text-white font-bold text-sm uppercase tracking-wider">Course Content</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 p-2"><FaChevronLeft /></button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => {
              const { title, duration, isQuiz } = lesson.attributes; // استخراج داتا الدرس الحقيقية
              
              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setCurrentLessonIndex(index);
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-4 text-left transition-colors border-b border-white/5 
                    ${currentLessonIndex === index 
                      ? 'bg-purple-600/10 border-l-4 border-l-purple-500' 
                      : 'hover:bg-white/5 border-l-4 border-l-transparent'}
                  `}
                >
                  <div className={`mt-1 ${currentLessonIndex === index ? 'text-purple-400' : 'text-slate-500'}`}>
                    {isQuiz ? <FaQuestionCircle className={currentLessonIndex === index ? "text-amber-400" : "text-slate-500"} /> : 
                     (index < currentLessonIndex ? <FaCheckCircle className="text-green-500" /> : <FaRegCircle />)
                    }
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${currentLessonIndex === index ? 'text-white' : 'text-slate-400'}`}>
                      {index + 1}. {title}
                    </p>
                    <span className="text-[10px] text-slate-600 flex items-center gap-1 uppercase tracking-wide mt-1">
                       {isQuiz ? 'Quiz • ' : 'Video • '} {duration || "00:00"}
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
             <div className="text-slate-500 text-center p-6 text-sm">لا توجد دروس مضافة لهذا الكورس بعد.</div>
          )}
        </div>
      </aside>

      {/* --- Main Player --- */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        
        {/* Top Header */}
        <div className="h-16 bg-[#0a0a0a] border-b border-white/5 flex items-center px-4 gap-4 shrink-0 z-10">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white transition-colors p-2">
            <FaListUl className="text-xl" />
          </button>
          <Link to="/my-courses" className="text-slate-400 hover:text-white text-sm flex items-center gap-2">
            <FaChevronLeft /> Back
          </Link>
          <div className="ml-auto font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 truncate hidden md:block">
            {course.attributes.title}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto pb-20">
            
            {lessons.length > 0 && currentLesson ? (
              <>
                <div key={currentLesson.id} className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 mb-8 flex flex-col">
                  
                  {currentLesson.attributes.isQuiz ? (
                    // 🛑 --- QUIZ --- (لو قررت تعمله في الباك إند بعدين)
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#13151d] w-full h-full absolute inset-0 z-10">
                      <FaQuestionCircle className="text-6xl text-amber-500 mb-6 mx-auto" />
                      <h2 className="text-3xl font-bold text-white mb-2">Quiz Module</h2>
                      <p className="text-slate-400 mb-8 max-w-md mx-auto">
                        This section is reserved for quizzes. (Update your Strapi backend to support quiz questions).
                      </p>
                    </div>
                  ) : (
                    // 🎥 --- VIDEO PLAYER (استبدلنا الصورة القديمة بالبلاير) ---
                    <div className="relative w-full h-full bg-black">
                      <ReactPlayer 
                        url={currentLesson.attributes.videoUrl} 
                        width="100%" 
                        height="100%" 
                        controls={true}
                        playing={true} // عشان يشتغل أول ما يفتح
                        style={{ position: 'absolute', top: 0, left: 0 }}
                      />
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6 mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                      {currentLesson.attributes.title}
                    </h1>
                    <p className="text-sm text-slate-400">
                      {currentLesson.attributes.isQuiz ? 'Knowledge Check' : `Lesson ${currentLessonIndex + 1} of ${lessons.length}`}
                    </p>
                  </div>

                  <button 
                    onClick={handleNext}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    {currentLessonIndex === lessons.length - 1 ? 'Finish Course' : 'Next Lesson'} <FaArrowRight />
                  </button>
                </div>

                {/* Description */}
                <div className="space-y-6 text-slate-300 leading-relaxed">
                  <h3 className="text-lg font-bold text-white">Lesson Details</h3>
                  <p>Welcome to <strong>{currentLesson.attributes.title}</strong>.</p>
                </div>
              </>
            ) : (
              <div className="text-white text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                لا توجد دروس متاحة حالياً.
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerPage;