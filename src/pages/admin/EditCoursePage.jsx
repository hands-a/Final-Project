import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../../context/CourseContext';
import CurriculumBuilder from './CurriculumBuilder'; // استدعاء من نفس الفولدر
import { FaCloudUploadAlt, FaSave, FaArrowLeft, FaDollarSign, FaList, FaImage } from "react-icons/fa";

const EditCoursePage = () => {
  const { id } = useParams(); // بنجيب رقم الكورس من الرابط
  const navigate = useNavigate();
  const { courses, updateCourse } = useCourses();

  // الحالة (State) لتخزين البيانات
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Development');
  const [level, setLevel] = useState('Beginner');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sections, setSections] = useState([]);

  // تحميل بيانات الكورس عند فتح الصفحة
  useEffect(() => {
    const courseToEdit = courses.find(c => c.id === parseInt(id));
    if (courseToEdit) {
      setTitle(courseToEdit.title);
      setCategory(courseToEdit.category);
      setLevel(courseToEdit.level);
      setPrice(courseToEdit.price);
      setSections(courseToEdit.sections || []);
      
      // التعامل مع الصورة
      if (courseToEdit.image) {
        setImage(courseToEdit.image);
        setImagePreview(typeof courseToEdit.image === 'string' ? courseToEdit.image : URL.createObjectURL(courseToEdit.image));
      }
    } else {
      // لو الكورس مش موجود، ارجع للداشبورد
      navigate('/admin/dashboard');
    }
  }, [id, courses, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedCourseData = {
      title,
      category,
      level,
      price: parseFloat(price),
      image,
      sections,
      rating: 4.8, // نحتفظ بالتقييم أو نجيبه من القديم
      students: 0  // أو نجيب العدد الحقيقي
    };

    updateCourse(parseInt(id), updatedCourseData);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin/dashboard')} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Edit Course</h1>
            <p className="text-slate-400 text-sm">Update your course content and details.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Title & Price */}
            <div className="bg-[#13151d] p-6 rounded-2xl border border-white/5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Course Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                  placeholder="e.g. Advanced React Patterns"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                  >
                    <option>Development</option>
                    <option>Design</option>
                    <option>Business</option>
                    <option>Marketing</option>
                    <option>Data Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Level</label>
                  <select 
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Price ($)</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="number" 
                    required
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 pl-10 text-white focus:border-purple-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Curriculum Builder */}
            <div className="bg-[#13151d] p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <FaList className="text-purple-500" />
                <h3 className="text-xl font-bold">Course Curriculum</h3>
              </div>
              
              {/* استدعاء المكون اللي بنيناه قبل كده */}
              <CurriculumBuilder sections={sections} setSections={setSections} />
            </div>

          </div>

          {/* Right Column: Image & Actions */}
          <div className="space-y-6">
            
            <div className="bg-[#13151d] p-6 rounded-2xl border border-white/5 text-center">
              <label className="block text-sm font-bold text-slate-400 mb-4 text-left">Course Thumbnail</label>
              
              <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden group hover:border-purple-500 transition-colors cursor-pointer">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    <FaImage className="text-3xl mb-2" />
                    <span className="text-xs">Upload Image</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
            >
              <FaSave /> Save Changes
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;