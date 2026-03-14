import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPlayCircle, FaCheckCircle, FaArrowLeft, FaListUl } from 'react-icons/fa';

// 💡 1. الدالة السحرية: بتطلع الـ ID بتاع الفيديو من أي لينك يوتيوب مهما كان شكله
const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  
  // بنضيف rel=0 عشان مايجيبش فيديوهات قنوات تانية في النهاية
  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : '';
};

const CoursePlayerPage = () => {
  const { id } = useParams(); // رقم الكورس
  
  // 💡 داتا وهمية للتجربة (هتستبدلها بالداتا اللي جاية من الـ API بتاعك)
  const courseData = {
    title: "Advanced React & Tailwind CSS",
    sections: [
      {
        id: 1,
        title: "Getting Started",
        lessons: [
          { id: 101, title: "Introduction to the course", duration: "05:20", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
          { id: 102, title: "Setting up the environment", duration: "12:15", url: "https://youtu.be/tgbNymZ7vqY" },
        ]
      },
      {
        id: 2,
        title: "Core Concepts",
        lessons: [
          { id: 201, title: "Understanding State & Props", duration: "18:40", url: "https://www.youtube.com/watch?v=O570R2wH1yE" },
          { id: 202, title: "Glassmorphism UI Design", duration: "22:10", url: "https://www.youtube.com/watch?v=1rIExx5D2-s" },
        ]
      }
    ]
  };

  // 💡 2. الـ State اللي بيحفظ الدرس اللي شغال حالياً
  const [activeLesson, setActiveLesson] = useState(null);

  // أول ما الصفحة تفتح، بنشغل أول درس في أول سكشن تلقائياً
  useEffect(() => {
    if (courseData.sections.length > 0 && courseData.sections[0].lessons.length > 0) {
      setActiveLesson(courseData.sections[0].lessons[0]);
    }
  }, []);

  if (!activeLesson) return <div className="min-h-screen bg-[#050511] text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#050511] pt-28 pb-12 px-4 lg:px-8 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* --- الجانب الأيسر: شاشة العرض (Video Player) --- */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-all">
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-light text-white tracking-wide truncate">{courseData.title}</h1>
          </div>

          {/* 💡 3. الـ Video Player (Iframe) */}
          <div className="w-full aspect-video bg-black/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative">
            <iframe
              className="w-full h-full absolute top-0 left-0"
              src={getYouTubeEmbedUrl(activeLesson.url)}
              title={activeLesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* تفاصيل الدرس الحالي */}
          <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-medium text-white mb-2 tracking-wide">{activeLesson.title}</h2>
            <p className="text-pink-400 text-xs font-bold uppercase tracking-widest">Duration: {activeLesson.duration}</p>
          </div>
        </div>

        {/* --- الجانب الأيمن: قائمة الدروس (Curriculum Sidebar) --- */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white/0 backdrop-blur-xl border border-white/10 rounded-3xl h-[calc(100vh-140px)] flex flex-col shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden lg:sticky lg:top-28">
            
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center gap-3">
              <FaListUl className="text-pink-400" />
              <h3 className="text-lg font-medium text-white tracking-wide">Course Content</h3>
            </div>

            {/* سكرول قائمة الدروس */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {courseData.sections.map((section, sIdx) => (
                <div key={section.id}>
                  <h4 className="text-slate-300 text-[11px] font-bold uppercase tracking-widest mb-3 px-2">
                    Section {sIdx + 1}: {section.title}
                  </h4>
                  
                  <div className="space-y-2">
                    {section.lessons.map((lesson, lIdx) => {
                      const isActive = activeLesson.id === lesson.id;
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full text-left p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 border
                            ${isActive 
                              ? 'bg-pink-500/10 border-pink-500/30 shadow-[0_0_15px_rgba(244,114,182,0.1)]' 
                              : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                            }`}
                        >
                          <div className={`mt-0.5 ${isActive ? 'text-pink-400' : 'text-slate-500'}`}>
                            {isActive ? <FaPlayCircle className="text-lg animate-pulse" /> : <FaCheckCircle className="text-lg opacity-50" />}
                          </div>
                          
                          <div className="flex-1">
                            <p className={`text-sm font-medium tracking-wide leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                              {lIdx + 1}. {lesson.title}
                            </p>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1 inline-block">
                              {lesson.duration}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CoursePlayerPage;