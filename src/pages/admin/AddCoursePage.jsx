import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaArrowLeft, FaDollarSign, FaList, FaImage } from 'react-icons/fa';
// 👇 تأكد إن المسار ده صح والملفات دي موجودة
import { useCourses } from '../../context/CourseContext';
import CurriculumBuilder from "./CurriculumBuilder";
const AddCoursePage = () => {
  const navigate = useNavigate();
  const { addCourse } = useCourses();
  
  // State لتخزين البيانات
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    level: 'Beginner',
    description: '',
    image: null
  });

  // State لتخزين المنهج (السكاشن والدروس)
  const [sections, setSections] = useState([]);
  const [preview, setPreview] = useState(null);

  // دالة التعامل مع الكتابة
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // دالة رفع الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // التحقق من وجود دروس
    if (sections.length === 0) {
      alert("Please add at least one section to the curriculum!");
      return;
    }

    // تجهيز البيانات النهائية
    const newCourse = {
      title: formData.title,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      level: formData.level,
      description: formData.description,
      instructor: "Admin User",
      image: preview || "https://via.placeholder.com/300x200?text=No+Image",
      sections: sections, // 👈 إضافة المنهج للكورس
      students: 0,
      rating: 0
    };

    addCourse(newCourse);
    alert("Course Published Successfully! 🚀");
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors">
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Course</h1>
            <p className="text-slate-400">Fill in the details to publish a new course.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Basic Info */}
          <div className="bg-[#13151d] p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaList className="text-purple-500" /> Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-slate-300 mb-2 text-sm font-bold">Course Title</label>
                <input type="text" name="title" onChange={handleChange} required
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none" placeholder="e.g. Advanced React" />
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm font-bold">Category</label>
                <select name="category" onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none">
                  <option value="">Select Category</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm font-bold">Level</label>
                <select name="level" onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Pricing & Description */}
          <div className="bg-[#13151d] p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaDollarSign className="text-green-500" /> Details
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-slate-300 mb-2 text-sm font-bold">Price ($)</label>
                <input type="number" name="price" onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none" placeholder="49.99" />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm font-bold">Description</label>
                <textarea name="description" rows="4" onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none" placeholder="Course details..."></textarea>
              </div>
            </div>
          </div>

          {/* 3. Image Upload */}
          <div className="bg-[#13151d] p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaImage className="text-pink-500" /> Course Image
            </h3>
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center relative hover:border-purple-500 transition-colors">
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
              ) : (
                <div className="flex flex-col items-center">
                  <FaCloudUploadAlt className="text-4xl text-slate-400 mb-2" />
                  <p className="text-slate-400">Click to upload thumbnail</p>
                </div>
              )}
            </div>
          </div>

          {/* 4. Curriculum Builder */}
          {/* 👇 لازم المكون ده يكون شغال عشان الصفحة تفتح */}
          <CurriculumBuilder onCurriculumChange={setSections} />

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button type="submit" className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
              <FaSave /> Publish Course
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCoursePage;