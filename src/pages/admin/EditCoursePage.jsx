import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 💡 غيرنا الـ Context بـ Axios
import CurriculumBuilder from './CurriculumBuilder'; 
import { FaSave, FaArrowLeft, FaList, FaImage, FaSpinner } from "react-icons/fa";

const EditCoursePage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // الحالة (State) لتخزين البيانات
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Development');
  const [level, setLevel] = useState('Beginner');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // File object لو المستخدم اختار صورة جديدة
  const [imagePreview, setImagePreview] = useState(null);
  const [sections, setSections] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // عشان زرار الحفظ

  // 1. تحميل بيانات الكورس من Strapi عند فتح الصفحة
  useEffect(() => {
    axios.get(`http://localhost:1337/api/courses/${id}?populate=*`)
      .then((response) => {
        const item = response.data.data;
        if (!item) {
          navigate('/admin/dashboard');
          return;
        }

        const attr = item.attributes || item;

        setTitle(attr.title || '');
        setCategory(attr.category || 'Development');
        setLevel(attr.level || 'Beginner');
        setPrice(attr.price || '');
        // لو عندك حقل للدروس
        // setSections(attr.curriculum || []); 
        
        // التعامل مع الصورة الجاية من السيرفر
        if (attr.image?.url) {
          setImagePreview(`http://localhost:1337${attr.image.url}`);
        } else if (attr.image?.data?.attributes?.url) {
          setImagePreview(`http://localhost:1337${attr.image.data.attributes.url}`);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course for edit:", error);
        navigate('/admin/dashboard'); // لو الكورس مش موجود ارجع للوحة التحكم
      });
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // عرض الصورة مؤقتاً قبل الرفع
    }
  };

  // 2. دالة حفظ التعديلات في Strapi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      let imageId = null;

      // أ. لو المستخدم اختار صورة جديدة (File)، نرفعها الأول لـ Strapi
      if (image instanceof File) {
        const formData = new FormData();
        formData.append('files', image);
        
        const uploadResponse = await axios.post('http://localhost:1337/api/upload', formData);
        imageId = uploadResponse.data[0].id; // ناخد الـ ID بتاع الصورة المرفوعة
      }

      // ب. نجهز البيانات اللي هتتحدث
      const courseData = {
        title,
        category,
        level,
        price: parseFloat(price) || 0,
        // sections: sections, // لو هتحفظ المنهج هنا
      };

      // لو رفعنا صورة جديدة، نربطها بالكورس
      if (imageId) {
        courseData.image = imageId;
      }

      // ج. نبعت أمر التعديل (PUT) لـ Strapi
      await axios.put(`http://localhost:1337/api/courses/${id}`, {
        data: courseData
      });

      // د. نرجع للوحة التحكم بعد النجاح
      navigate('/admin/dashboard');

    } catch (error) {
      console.error("Error updating course:", error);
      alert("حدث خطأ أثناء حفظ التعديلات. تأكد من تشغيل السيرفر.");
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center pt-24">
        <FaSpinner className="text-pink-500 text-5xl animate-spin mb-4" />
        <h2 className="text-white text-xl font-light tracking-widest uppercase">Loading Course...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-10 border-b border-white/10 pb-8">
          <button 
            onClick={() => navigate('/admin/dashboard')} 
            className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-wide">Edit Course</h1>
            <p className="text-slate-400 font-light text-sm tracking-wide">Update your course content and details.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Left Column: Basic Info & Curriculum --- */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] space-y-6">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Course Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider"
                  placeholder="e.g. Advanced React Patterns"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all tracking-wider appearance-none"
                  >
                    <option className="bg-[#050511] text-slate-300">Development</option>
                    <option className="bg-[#050511] text-slate-300">Design</option>
                    <option className="bg-[#050511] text-slate-300">Business</option>
                    <option className="bg-[#050511] text-slate-300">Marketing</option>
                    <option className="bg-[#050511] text-slate-300">Data Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Level</label>
                  <select 
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all tracking-wider appearance-none"
                  >
                    <option className="bg-[#050511] text-slate-300">Beginner</option>
                    <option className="bg-[#050511] text-slate-300">Intermediate</option>
                    <option className="bg-[#050511] text-slate-300">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Price ($)</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
              <h3 className="text-xl font-medium tracking-wide text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
                <FaList className="text-pink-400 opacity-80" /> Course Curriculum
              </h3>
              <CurriculumBuilder onCurriculumChange={setSections} />
            </div>

          </div>

          {/* --- Right Column: Image & Actions --- */}
          <div className="space-y-8">
            
            <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-center">
              <h3 className="text-xl font-medium tracking-wide text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
                <FaImage className="text-pink-400 opacity-80" /> Course Thumbnail
              </h3>
              
              <div className="relative w-full aspect-video bg-white/5 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center overflow-hidden group hover:border-pink-400/50 hover:bg-white/10 transition-all cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover shadow-lg" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <FaImage className="text-4xl mb-3 opacity-80 group-hover:text-pink-400 transition-colors" />
                    <span className="text-xs font-light tracking-widest uppercase">Upload Image</span>
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSaving}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium tracking-wide rounded-xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <FaSpinner className="animate-spin" /> : <><FaSave className="opacity-80" /> Save Changes</>}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;