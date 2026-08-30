/**
 * CoursePlayerPage.jsx
 *
 * Renders the video player and lesson sidebar for a single enrolled course.
 *
 * PORTFOLIO VERSION: Course data (title, lessons, video URLs) is resolved from
 * the static coursesData.js. The /learn/:id route uses the course's numeric id.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Original API implementation (commented out for portfolio):
 * Course and lesson data was fetched from Strapi:
 *
 *   const coursesRes = await axios.get(
 *     `https://futuredev-backend.onrender.com/api/courses?populate=*`
 *   );
 *   const lessonsRes = await axios.get(
 *     `https://futuredev-backend.onrender.com/api/lessons
 *      ?filters[course][id][$eq]=${courseId}&populate=*`
 *   );
 *
 * Progress was persisted to the enrollment record via:
 *   await axios.put(
 *     `https://futuredev-backend.onrender.com/api/enrollments/${enrollmentId}`,
 *     { data: { progress: newProgress } }
 *   );
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { coursesData } from "../../data/coursesData";
import { useStudent } from '../../context/StudentContext';
import {
  FaPlayCircle,
  FaCheckCircle,
  FaArrowLeft,
  FaListUl,
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
  const [activeLesson, setActiveLesson] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Resolve course from static data
  const courseEntry = coursesData.find(c =>
    String(c.id) === String(id) ||
    String(c.strapiId) === String(id) ||
    c.documentId === id
  );

  const courseData = courseEntry
    ? {
        title: courseEntry.title,
        sections: [
          {
            id: 1,
            title: "Course Content",
            lessons: (courseEntry.lessons || []).map(l => ({
              id: l.id,
              title: l.title,
              duration: l.duration || "N/A",
              url: l.videoUrl || null,
            })),
          },
        ],
      }
    : null;

  useEffect(() => {
    if (courseData && courseData.sections[0].lessons.length > 0) {
      setActiveLesson(courseData.sections[0].lessons[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (!courseData || !activeLesson) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4 relative z-10">
        <div className="glass-panel p-12 text-center max-w-lg">
          <FaExclamationTriangle className="text-amber-400 text-6xl mb-6 mx-auto opacity-80" />
          <h2 className="text-3xl font-normal mb-4 text-center tracking-wide">Course Not Found</h2>
          <p className="text-zinc-500 mb-8 text-center font-normal leading-relaxed">
            We couldn't find this course. Please go back to your courses.
          </p>
          <Link to="/my-courses" className="btn-primary px-8 py-3.5 w-fit mx-auto">
            Back to My Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-28 pb-12 px-4 lg:px-8 relative overflow-hidden text-zinc-300">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row gap-8">

        <div className="w-full lg:w-2/3 flex flex-col gap-6">

          <div className="flex items-center gap-4">
            <Link to="/my-courses" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-zinc-300 hover:text-white transition-all">
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-normal text-white tracking-wide truncate">
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
              />
            ) : (
              <div className="text-zinc-500 font-normal tracking-widest uppercase flex flex-col items-center">
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
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                Duration: {activeLesson.duration}
              </p>
            </div>

            <button
              onClick={handleCompleteCourse}
              disabled={isCompleted}
              className={`px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all border ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 cursor-not-allowed'
                  : 'bg-white/5 text-white border-white/20 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400'
              }`}
            >
              <FaCheckCircle className={isCompleted ? 'animate-pulse' : ''} />
              {isCompleted ? 'Course Completed!' : 'Mark as Completed'}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="glass-panel h-[calc(100vh-140px)] flex flex-col overflow-hidden lg:sticky lg:top-28 !p-0">
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center gap-3">
              <FaListUl className="text-cyan-400" />
              <h3 className="text-lg font-medium text-white tracking-wide">Course Content</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {courseData.sections.map((section, sIdx) => (
                <div key={section.id || sIdx}>
                  <h4 className="text-zinc-300 text-xs font-bold uppercase tracking-widest mb-3 px-2">
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
                            ${isActive
                              ? "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                              : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                            }
                          `}
                        >
                          <div className={`mt-0.5 ${isActive ? "text-cyan-400" : "text-zinc-500"}`}>
                            {isActive
                              ? <FaPlayCircle className="text-lg animate-pulse" />
                              : <FaCheckCircle className="text-lg opacity-50" />
                            }
                          </div>

                          <div className="flex-1">
                            <p className={`text-sm font-medium tracking-wide leading-snug line-clamp-2 ${isActive ? "text-white" : "text-zinc-300"}`}>
                              {lIdx + 1}. {lesson.title}
                            </p>
                            <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold mt-1 inline-block">
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