import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaPlayCircle,
  FaCheckCircle,
  FaArrowLeft,
  FaListUl,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

// دالة ذكية لاستخراج الـ ID من أي لينك يوتيوب
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

  const [courseData, setCourseData] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCourseAndLessons = async () => {
      try {
        // 1. نجيب الكورسات الأول
        const coursesRes = await axios.get(`http://localhost:1337/api/courses?populate=*`);
        const allCourses = coursesRes.data.data;

        // ندور على الكورس بتاعنا
        const courseItem = allCourses.find(
          (c) => c.id.toString() === id.toString() || c.documentId === id
        );

        if (!courseItem) throw new Error("الكورس ده مش موجود أو مش Publish");

        const courseAttr = courseItem.attributes || courseItem;
        const courseTitle = courseAttr.title;

        let formattedLessons = [];

        // 💡 2. الحل العبقري: بما إنك مش رابطهم بـ Relation، هنروح ندور في الـ Lesson بالاسم!
        try {
          const lessonsRes = await axios.get(`http://localhost:1337/api/lessons?filters[title][$eq]=${courseTitle}`);
          const lessonsData = lessonsRes.data.data;

          if (lessonsData && lessonsData.length > 0) {
            // لقينا الدرس اللي اسمه زي اسم الكورس!
            const lessonItem = lessonsData[0];
            const lAttr = lessonItem.attributes || lessonItem;
            
            formattedLessons = [
              {
                id: lessonItem.documentId || lessonItem.id,
                title: lAttr.title || courseTitle,
                duration: lAttr.duration || "00:00",
                url: lAttr.videoUrl || null, // 👈 ده اللي هيجيب اللينك من الـ Lesson!
              }
            ];
          }
        } catch (lessonError) {
          console.log("لم يتم العثور على درس بهذا الاسم، أو الصلاحيات مغلقة.");
        }

        // لو ملقاش درس في الـ Lesson Collection يطابق الاسم، يحط رسالة فاضية
        if (formattedLessons.length === 0) {
          formattedLessons = [{
            id: 999,
            title: courseTitle,
            duration: "00:00",
            url: null,
          }];
        }

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
        setLoading(false);

      } catch (error) {
        console.error("Fetch error:", error);
        setErrorMessage(error.message);
        setLoading(false);
      }
    };

    fetchCourseAndLessons();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center">
        <FaSpinner className="text-pink-500 text-5xl animate-spin mb-4" />
        <h2 className="text-white text-xl font-light tracking-widest uppercase">
          Loading Player...
        </h2>
      </div>
    );
  }

  if (errorMessage || !courseData || !activeLesson) {
    return (
      <div className="min-h-screen bg-[#050511] text-white flex flex-col items-center justify-center px-4">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-6" />
        <h2 className="text-3xl font-light mb-4 text-center">
          Oops! Something went wrong.
        </h2>
        <p className="text-slate-400 mb-8 text-center">{errorMessage}</p>
        <Link
          to="/my-courses"
          className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
        >
          Back to My Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050511] pt-28 pb-12 px-4 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* --- Video Player --- */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Link
              to="/my-courses"
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-all"
            >
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-light text-white tracking-wide truncate">
              {courseData.title}
            </h1>
          </div>

          <div className="w-full aspect-video bg-black/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative flex items-center justify-center">
            {/* عرض الفيديو لو اللينك موجود وسليم */}
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

          <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-medium text-white mb-2 tracking-wide">
              {activeLesson.title}
            </h2>
            <p className="text-pink-400 text-xs font-bold uppercase tracking-widest">
              Duration: {activeLesson.duration}
            </p>
          </div>
        </div>

        {/* --- Curriculum Sidebar --- */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white/0 backdrop-blur-xl border border-white/10 rounded-3xl h-[calc(100vh-140px)] flex flex-col shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden lg:sticky lg:top-28">
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center gap-3">
              <FaListUl className="text-pink-400" />
              <h3 className="text-lg font-medium text-white tracking-wide">
                Course Content
              </h3>
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
                            ${
                              isActive
                                ? "bg-pink-500/10 border-pink-500/30 shadow-[0_0_15px_rgba(244,114,182,0.1)]"
                                : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                            }`}
                        >
                          <div
                            className={`mt-0.5 ${isActive ? "text-pink-400" : "text-slate-500"}`}
                          >
                            {isActive ? (
                              <FaPlayCircle className="text-lg animate-pulse" />
                            ) : (
                              <FaCheckCircle className="text-lg opacity-50" />
                            )}
                          </div>

                          <div className="flex-1">
                            <p
                              className={`text-sm font-medium tracking-wide leading-snug line-clamp-2 ${isActive ? "text-white" : "text-slate-300"}`}
                            >
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