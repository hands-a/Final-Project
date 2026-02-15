import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coursesData } from '../../data/coursesData';
import { useStudent } from '../../context/StudentContext';
import { 
  FaPlay, FaCheckCircle, FaChevronLeft, FaListUl, 
  FaRegCircle, FaTrophy, FaQuestionCircle, FaArrowRight, FaRedo 
} from 'react-icons/fa';

// 🔥 1. خرجنا البيانات بره عشان تكون ثابتة وماتعملش مشاكل في الذاكرة
const COURSE_LESSONS_MOCK = [
  { id: 1, title: "Introduction & Setup", duration: "5:00", type: "video" },
  { id: 2, title: "Understanding React Components", duration: "12:30", type: "video" },
  { 
    id: 3, 
    title: "Core Concepts Quiz", 
    duration: "5 mins", 
    type: "quiz",
    questions: [
      { text: "What is React?", options: ["A Database", "A Library", "A Server"], correct: 1 },
      { text: "What is JSX?", options: ["JavaScript XML", "Java Syntax", "JSON X"], correct: 0 },
      { text: "Which hook manages state?", options: ["useEffect", "useState", "useContext"], correct: 1 },
    ]
  }, 
  { id: 4, title: "Props & State", duration: "08:45", type: "video" },
  { id: 5, title: "Final Project Build", duration: "15:20", type: "video" },
];

const CoursePlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enrolledCourses, updateProgress } = useStudent();

  // تحويل الـ id لرقم لضمان التوافق
  const courseId = parseInt(id);
  const isEnrolled = enrolledCourses.some(c => c.id === courseId);
  const course = coursesData.find(c => c.id === courseId);

  // States
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  
  // Quiz States
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentLesson = COURSE_LESSONS_MOCK[currentLessonIndex];

  // --- Logic ---

  // حماية المسار
  useEffect(() => {
    if (!course) return;
    if (!isEnrolled) {
      navigate(`/courses/${courseId}`);
    }
  }, [courseId, isEnrolled, course, navigate]);

  // التحكم في السايدبار
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth > 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔥 إصلاح جذري: تصفير الكويز أوتوماتيك لما رقم الدرس يتغير
  useEffect(() => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLessonIndex]);

  // 🔥 الدالة المصلحة للانتقال (Safe Navigation + 100% Fix)
  const handleNext = () => {
    const isLastLesson = currentLessonIndex === COURSE_LESSONS_MOCK.length - 1;

    try {
      if (isLastLesson) {
        // ✅ الحالة الأولى: ده آخر درس (Finish Course)
        // لازم نبعت 100 صريحة عشان نقفل الكورس
        if (updateProgress) {
          updateProgress(courseId, 100);
        }

        // ندي فرصة صغيرة للحفظ وبعدين نعرض الرسالة
        setTimeout(() => {
          if (window.confirm("🎉 Congratulations! You have completed the course 100%.\nGo to your Dashboard?")) {
            navigate('/my-courses');
          }
        }, 100);

      } else {
        // ✅ الحالة الثانية: لسه في دروس (Next Lesson)
        const nextIndex = currentLessonIndex + 1;
        const total = COURSE_LESSONS_MOCK.length;
        
        // حساب النسبة للدرس اللي خلص
        // مثلاً: خلصت الدرس 1 من 5، يبقى خلصت 20%
        const progress = Math.round((nextIndex / total) * 100);
        
        if (updateProgress) {
          updateProgress(courseId, progress);
        }
        
        // انتقل للدرس التالي
        setCurrentLessonIndex(nextIndex);
      }
    } catch (error) {
      console.error("Progress update failed", error);
    }
  };

  const handleAnswer = (optionIndex) => {
    if (optionIndex === currentLesson.questions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
    const nextQ = currentQuestion + 1;
    if (nextQ < currentLesson.questions.length) {
      setCurrentQuestion(nextQ);
    } else {
      setShowResult(true);
    }
  };

  if (!course) return <div className="text-white text-center pt-40">Loading...</div>;

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
          {COURSE_LESSONS_MOCK.map((lesson, index) => (
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
                {lesson.type === 'quiz' ? <FaQuestionCircle className={currentLessonIndex === index ? "text-amber-400" : "text-slate-500"} /> : 
                 (index < currentLessonIndex ? <FaCheckCircle className="text-green-500" /> : <FaRegCircle />)
                }
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${currentLessonIndex === index ? 'text-white' : 'text-slate-400'}`}>
                  {index + 1}. {lesson.title}
                </p>
                <span className="text-[10px] text-slate-600 flex items-center gap-1 uppercase tracking-wide mt-1">
                   {lesson.type === 'quiz' ? 'Quiz • ' : 'Video • '} {lesson.duration}
                </span>
              </div>
            </button>
          ))}
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
            {course.title}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto pb-20">
            
            {/* 🔥 KEY PROP: يضمن إعادة تحميل المنطقة دي عند تغيير الدرس */}
            <div key={currentLesson.id} className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 mb-8 flex flex-col">
              
              {currentLesson.type === 'quiz' ? (
                // 🛑 --- QUIZ ---
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#13151d] w-full h-full absolute inset-0 z-10">
                  {!quizStarted ? (
                    <div className="animate-fadeIn">
                      <FaQuestionCircle className="text-6xl text-amber-500 mb-6 mx-auto" />
                      <h2 className="text-3xl font-bold text-white mb-2">Quiz Time!</h2>
                      <p className="text-slate-400 mb-8 max-w-md mx-auto">
                        This quiz contains {currentLesson.questions.length} questions.
                      </p>
                      <button 
                        onClick={() => setQuizStarted(true)}
                        className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all hover:scale-105"
                      >
                        Start Quiz
                      </button>
                    </div>
                  ) : showResult ? (
                    <div className="animate-fadeIn w-full max-w-md">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                         <FaTrophy className="text-4xl text-green-500" />
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
                      <p className="text-slate-400 mb-6">
                        You scored <span className="text-white font-bold text-xl">{score}</span> out of <span className="text-white font-bold text-xl">{currentLesson.questions.length}</span>
                      </p>
                      
                      <div className="flex gap-4 justify-center">
                        <button 
                          onClick={() => {
                            setQuizStarted(false);
                            setCurrentQuestion(0);
                            setScore(0);
                            setShowResult(false);
                          }}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl flex items-center gap-2"
                        >
                          <FaRedo /> Retry
                        </button>
                        <button 
                          onClick={handleNext}
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center gap-2"
                        >
                          {currentLessonIndex === COURSE_LESSONS_MOCK.length - 1 ? 'Finish' : 'Next Lesson'} <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-lg text-left animate-fadeIn">
                      <div className="flex justify-between text-xs text-slate-400 mb-4 uppercase tracking-wider">
                        <span>Question {currentQuestion + 1} of {currentLesson.questions.length}</span>
                        <span>Score: {score}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-6">
                        {currentLesson.questions[currentQuestion].text}
                      </h3>
                      <div className="space-y-3">
                        {currentLesson.questions[currentQuestion].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className="w-full p-4 text-left bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/50 rounded-xl text-slate-300 hover:text-white transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // 🎥 --- VIDEO ---
                <div className="relative w-full h-full group cursor-pointer bg-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-20 h-20 bg-purple-600/90 hover:bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-600/40 transition-transform hover:scale-110 z-10 backdrop-blur-sm">
                        <FaPlay className="text-white text-2xl ml-1" />
                     </div>
                  </div>
                  <img src={course.image} alt="Lesson Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                     <div className="h-full bg-purple-500" style={{ width: '35%' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {currentLesson.title}
                </h1>
                <p className="text-sm text-slate-400">
                  {currentLesson.type === 'quiz' ? 'Knowledge Check' : `Lesson ${currentLessonIndex + 1} of ${COURSE_LESSONS_MOCK.length}`}
                </p>
              </div>

              {(!quizStarted || showResult || currentLesson.type !== 'quiz') && (
                <button 
                  onClick={handleNext}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  {currentLessonIndex === COURSE_LESSONS_MOCK.length - 1 ? 'Finish Course' : 'Next Lesson'} <FaArrowRight />
                </button>
              )}
            </div>

            {/* Description */}
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-white">Lesson Details</h3>
              <p>Welcome to <strong>{currentLesson.title}</strong>.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerPage;