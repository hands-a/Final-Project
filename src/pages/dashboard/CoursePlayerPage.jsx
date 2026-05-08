import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useStudent } from '../../context/StudentContext'; 
import {
  FaPlayCircle,
  FaCheckCircle,
  FaArrowLeft,
  FaListUl,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  try {
    let videoId = null;
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get("v");
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("youtube.com/embed/")[1]?.split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : null;
  } catch (error) {
    return null;
  }
};

const CoursePlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCourseProgress } = useStudent(); 
  const [courseData, setCourseData] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCompleted, setIsCompleted] = useState(false); 

  useEffect(() => {
    let isMounted = true; 

    const fetchCourseAndLessons = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch courses first
        const coursesRes = await axios.get(`http://localhost:1337/api/courses?populate=*`);
        if (!isMounted) return;
        
        const allCourses = coursesRes.data.data;
        const courseItem = allCourses.find(
          (c) => c.id.toString() === id.toString() || c.documentId === id
        );

        if (!courseItem) throw new Error("Course not found or not published yet.");

        const courseAttr = courseItem.attributes || courseItem;
        const courseTitle = courseAttr.title;

        let formattedLessons = [];

        // 2. Fetch specific lessons
        try {
          const lessonsRes = await axios.get(`http://localhost:1337/api/lessons?filters[title][$eq]=${courseTitle}`);
          const lessonsData = lessonsRes.data.data;

          if (lessonsData && lessonsData.length > 0) {
            const lessonItem = lessonsData[0];
            const lAttr = lessonItem.attributes || lessonItem;
            
            formattedLessons = [
              {
                id: lessonItem.documentId || lessonItem.id,
                title: lAttr.title || courseTitle,
                duration: lAttr.duration || "00:00",
                url: lAttr.videoUrl || null, 
              }
            ];
          }
        } catch (lessonError) {
          console.log("Lessons fetch error (handled gracefully):", lessonError);
        }

        if (formattedLessons.length === 0) {
          formattedLessons = [{
            id: 999,
            title: courseTitle,
            duration: "00:00",
            url: null,
          }];
        }

        if (isMounted) {
          setCourseData({
            title: courseTitle,
            sections: [
              {
                id: 1,
                title: "Course Content",
                lessons: formattedLessons,
              },
            ],
          });
          setActiveLesson(formattedLessons[0]);
        }

      } catch (error) {
        console.error("Fetch error:", error);
        if (isMounted) setErrorMessage(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourseAndLessons();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCompleteCourse = () => {
    if (updateCourseProgress) {
      updateCourseProgress(id, 100); 
      setIsCompleted(true);
      
      setTimeout(() => {
        navigate('/my-courses');
      }, 1500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center text-slate-300">
        <FaSpinner className="text-pink-500 text-5xl animate-spin mb-4" />
        <h2 className="text-white text-xl font-light tracking-widest uppercase">
          Loading Player...
        </h2>
      </div>
    );
  }

  if (errorMessage || !courseData || !activeLesson) {
    return (
      <div className="min-h-screen bg-[#050511] text-white flex flex-col items-center justify-center px-4 relative z-10">
        <div className="glass-panel p-12 text-center max-w-lg">
          <FaExclamationTriangle className="text-yellow-500 text-6xl mb-6 mx-auto opacity-80" />
          <h2 className="text-3xl font-light mb-4 text-center tracking-wide">Oops! Something went wrong.</h2>
          <p className="text-slate-400 mb-8 text-center font-light leading-relaxed">{errorMessage}</p>
          <Link to="/my-courses" className="btn-primary px-8 py-3.5 w-fit mx-auto">
            Back to My Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050511] pt-28 pb-12 px-4 lg:px-8 relative overflow-hidden text-slate-300">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* --- Video Player Section --- */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          <div className="flex items-center gap-4">
            <Link to="/my-courses" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-all">
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-light text-white tracking-wide truncate">
              {courseData.title}
            </h1>
          </div>

          <div className="w-full aspect-video glass-panel !p-0 bg-black/50 overflow-hidden relative flex items-center justify-center">
            {activeLesson.url && getYouTubeEmbedUrl(activeLesson.url) ? (
              <iframe
                className="w-full h-full absolute top-0 left-0"
                src={getYouTubeEmbedUrl(activeLesson.url)}
                title={activeLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="text-slate-500 font-light tracking-widest uppercase flex flex-col items-center">
                <FaPlayCircle className="text-4xl mb-3 opacity-50" />
                <span>No Video Linked Yet</span>
              </div>
            )}
          </div>

          <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-medium text-white mb-2 tracking-wide">
                {activeLesson.title}
              </h2>
              <p className="text-pink-400 text-xs font-bold uppercase tracking-widest">
                Duration: {activeLesson.duration}
              </p>
            </div>
            
            <button 
              onClick={handleCompleteCourse}
              disabled={isCompleted}
              className={`px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all border ${
                isCompleted 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30 cursor-not-allowed' 
                  : 'bg-white/5 text-white border-white/20 hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-400'
              }`}
            >
              <FaCheckCircle className={isCompleted ? 'animate-pulse' : ''} /> 
              {isCompleted ? 'Course Completed!' : 'Mark as Completed'}
            </button>
          </div>
        </div>

        {/* --- Sidebar (Course Content) --- */}
        <div className="w-full lg:w-1/3">
          <div className="glass-panel h-[calc(100vh-140px)] flex flex-col overflow-hidden lg:sticky lg:top-28 !p-0">
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center gap-3">
              <FaListUl className="text-pink-400" />
              <h3 className="text-lg font-medium text-white tracking-wide">Course Content</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {courseData.sections.map((section, sIdx) => (
                <div key={section.id || sIdx}>
                  <h4 className="text-slate-300 text-[11px] font-bold uppercase tracking-widest mb-3 px-2">
                    {section.title}
                  </h4>

                  <div className="space-y-2">
                    {section.lessons.map((lesson, lIdx) => {
                      const isActive = activeLesson.id === lesson.id;

                      return (
                        <button
                          key={lesson.id || lIdx}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full text-left p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 border
                            ${isActive ? "bg-pink-500/10 border-pink-500/30 shadow-[0_0_15px_rgba(244,114,182,0.1)]" : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"}
                          `}
                        >
                          <div className={`mt-0.5 ${isActive ? "text-pink-400" : "text-slate-500"}`}>
                            {isActive ? <FaPlayCircle className="text-lg animate-pulse" /> : <FaCheckCircle className="text-lg opacity-50" />}
                          </div>

                          <div className="flex-1">
                            <p className={`text-sm font-medium tracking-wide leading-snug line-clamp-2 ${isActive ? "text-white" : "text-slate-300"}`}>
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