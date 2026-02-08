import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPlayCircle, FaCheckCircle, FaChevronLeft, FaListUl, FaQuestionCircle, FaTrophy, FaArrowRight } from 'react-icons/fa';

const CoursePlayerPage = () => {
  const { id } = useParams();
  const [activeLesson, setActiveLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  // --- محاكاة منهج الكورس (دروس + كويزات) ---
  const curriculum = [
    { id: 1, title: "Introduction to the Course", type: "video", duration: "05:20" },
    { id: 2, title: "Setting up the Environment", type: "video", duration: "12:15" },
    { id: 3, title: "Your First Component", type: "video", duration: "08:45" },
    { id: 4, title: "Chapter 1 Quiz", type: "quiz", questions: 3 }, // 👈 ده كويز
    { id: 5, title: "Understanding State", type: "video", duration: "15:30" },
  ];

  return (
    <div className="h-screen bg-[#0a0a0a] flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#13151d]">
        <Link to="/my-courses" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <FaChevronLeft /> Back to Dashboard
        </Link>
        <h1 className="text-white font-bold hidden md:block">React.js Masterclass - Chapter 1</h1>
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
          85%
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* --- 1. Sidebar (Lesson List) --- */}
        <div className="w-80 bg-[#0f1119] border-r border-white/10 overflow-y-auto hidden lg:block">
          <div className="p-4">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Course Content</h3>
            <div className="space-y-1">
              {curriculum.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => { setActiveLesson(idx); setShowQuiz(lesson.type === 'quiz'); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    activeLesson === idx 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {lesson.type === 'quiz' ? <FaQuestionCircle /> : <FaPlayCircle />}
                  <div className="flex-1">
                    <p className="text-sm font-semibold line-clamp-1">{lesson.title}</p>
                    <p className="text-xs opacity-60">{lesson.type === 'quiz' ? `${lesson.questions} Questions` : lesson.duration}</p>
                  </div>
                  {idx < activeLesson && <FaCheckCircle className="text-green-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- 2. Main Content (Video or Quiz) --- */}
        <div className="flex-1 overflow-y-auto bg-[#0a0a0a] relative">
          
          {showQuiz ? (
            // --- Quiz Interface ---
            <div className="max-w-3xl mx-auto py-12 px-6">
              <QuizComponent />
            </div>
          ) : (
            // --- Video Player Interface ---
            <div className="flex flex-col h-full">
              <div className="aspect-video bg-black relative flex items-center justify-center">
                 {/* Fake Video Player */}
                 <div className="text-center">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
                      <FaPlayCircle className="text-5xl text-white" />
                    </div>
                    <p className="text-slate-400">Video Placeholder for: <span className="text-white font-bold">{curriculum[activeLesson].title}</span></p>
                 </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{curriculum[activeLesson].title}</h2>
                <p className="text-slate-300 leading-relaxed">
                  In this lesson, we will explore the core concepts required to build this feature. 
                  Make sure to check the resources tab for the source code.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// --- 3. The Quiz Component (نظام الكويزات) ---
const QuizComponent = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What is the primary purpose of React.js?",
      options: ["Database Management", "Building UI", "Server Side Logic", "Operating System"],
      correct: 1
    },
    {
      question: "Which hook is used to manage state?",
      options: ["useEffect", "useContext", "useState", "useReducer"],
      correct: 2
    },
    {
      question: "JSX stands for?",
      options: ["Java Super Extension", "JavaScript XML", "JSON Xylophone", "Java Syntax"],
      correct: 1
    }
  ];

  const handleAnswer = (optionIdx) => {
    if (optionIdx === questions[currentQ].correct) {
      setScore(score + 1);
    }

    const nextQ = currentQ + 1;
    if (nextQ < questions.length) {
      setCurrentQ(nextQ);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="bg-[#13151d] border border-white/10 p-10 rounded-3xl text-center animate-fadeIn">
        <FaTrophy className="text-6xl text-amber-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
        <p className="text-slate-400 mb-8">You scored <span className="text-purple-400 font-bold text-xl">{score} / {questions.length}</span></p>
        <button 
          onClick={() => { setShowResult(false); setCurrentQ(0); setScore(0); }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#13151d] border border-white/10 p-8 rounded-3xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white">Question {currentQ + 1} <span className="text-slate-500 text-sm">/ {questions.length}</span></h2>
        <div className="text-xs font-bold bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full">Single Choice</div>
      </div>

      <h3 className="text-xl text-slate-200 mb-8 font-medium">{questions[currentQ].question}</h3>

      <div className="space-y-4">
        {questions[currentQ].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="w-full text-left p-4 rounded-xl border border-white/5 bg-black/20 hover:bg-purple-600/20 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all group"
          >
            <span className="inline-block w-6 h-6 rounded-full border border-slate-600 group-hover:border-purple-400 mr-3 align-middle"></span>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoursePlayerPage;