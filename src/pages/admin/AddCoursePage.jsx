import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaArrowLeft, FaDollarSign, FaList, FaImage, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import CurriculumBuilder from "./CurriculumBuilder";

const AddCoursePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    level: 'Beginner',
    description: '',
    image: null
  });

  const [sections, setSections] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (sections.length === 0) {
      alert("Please add at least one section to the curriculum!");
      return;
    }

    setIsSubmitting(true);

    const courseData = {
      title: formData.title,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      level: formData.level,
      description: formData.description,
      instructor: "Admin User",
      sections: sections,   
      students: 0,
      rating: 5.0 
    };

    try {
      const submitData = new FormData();
      
      submitData.append('data', JSON.stringify(courseData));

      if (formData.image instanceof File) {
        submitData.append('files.image', formData.image, formData.image.name);
      }

      const response = await axios.post('https://futuredev-backend.onrender.com/api/courses', submitData);

      if (response.status === 200 || response.status === 201) {
        alert("Course Published Successfully! 🚀");
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error("Error adding course to Strapi:", error);
      alert("Failed to publish the course. Please check your connection or permissions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050511] pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="flex items-center gap-6 mb-10 border-b border-white/10 pb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-wide">Create New Course</h1>
            <p className="text-slate-400 font-light text-sm tracking-wide">Fill in the details to publish a new course to the platform.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
            <h3 className="text-xl font-medium tracking-wide text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
              <FaList className="text-pink-400 opacity-80" /> Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Course Title</label>
                <input 
                  type="text" 
                  name="title" 
                  onChange={handleChange} 
                  required
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider" 
                  placeholder="e.g. Advanced React & Tailwind" 
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Category</label>
                <select 
                  name="category" 
                  onChange={handleChange} 
                  required
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all tracking-wider appearance-none"
                >
                  <option value="" className="bg-[#050511] text-slate-300">Select Category</option>
                  <option value="Data Science" className="bg-[#050511] text-slate-300">Data Science</option>
                  <option value="Mobile App" className="bg-[#050511] text-slate-300">Mobile App</option>
                  <option value="Cyber Security" className="bg-[#050511] text-slate-300">Cyber Security</option>
                  <option value="DevOps" className="bg-[#050511] text-slate-300">DevOps</option>
                  <option value="Front-end" className="bg-[#050511] text-slate-300">Front-end</option>
                  <option value="Back-end" className="bg-[#050511] text-slate-300">Back-end</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Level</label>
                <select 
                  name="level" 
                  onChange={handleChange} 
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all tracking-wider appearance-none"
                >
                  <option value="Beginner" className="bg-[#050511] text-slate-300">Beginner</option>
                  <option value="Intermediate" className="bg-[#050511] text-slate-300">Intermediate</option>
                  <option value="Advanced" className="bg-[#050511] text-slate-300">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
            <h3 className="text-xl font-medium tracking-wide text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
              <FaDollarSign className="text-pink-400 opacity-80" /> Details & Pricing
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Price ($)</label>
                <input 
                  type="number" 
                  name="price" 
                  onChange={handleChange} 
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 tracking-wider" 
                  placeholder="e.g. 49.99 (Leave 0 for Free)" 
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-slate-300 mb-2 ml-1">Description</label>
                <textarea 
                  name="description" 
                  rows="4" 
                  onChange={handleChange} 
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all resize-none placeholder:text-slate-500/50 tracking-wider leading-relaxed" 
                  placeholder="Explain what students will learn in this course..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
            <h3 className="text-xl font-medium tracking-wide text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
              <FaImage className="text-pink-400 opacity-80" /> Course Thumbnail
            </h3>
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center relative hover:border-pink-400/50 hover:bg-white/5 transition-all group overflow-hidden">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-56 object-cover rounded-xl shadow-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaCloudUploadAlt className="text-3xl text-pink-400 opacity-80" />
                  </div>
                  <p className="text-slate-300 font-medium tracking-wide mb-1">Click to upload thumbnail</p>
                  <p className="text-slate-500 text-xs font-light">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
             <h3 className="text-xl font-medium tracking-wide text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
                <FaList className="text-pink-400 opacity-80" /> Curriculum Builder
             </h3>
             <CurriculumBuilder onCurriculumChange={setSections} />
          </div>

          <div className="flex justify-end pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`px-10 py-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium tracking-wide rounded-xl shadow-lg shadow-pink-500/20 transition-all flex items-center gap-3 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
            >
              {isSubmitting ? (
                <><FaSpinner className="animate-spin" /> Publishing...</>
              ) : (
                <><FaSave className="opacity-80" /> Publish Course</>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCoursePage;