import React, { useState, useEffect } from 'react';
// 👇 تعديل المسارات
import { coursesData } from '../../data/coursesData'; 
import CourseCard from '../../components/courses/CourseCard'; 
import { FaSearch, FaFilter, FaSortAmountDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CoursesPage = () => {
  const [courses, setCourses] = useState(coursesData);
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  useEffect(() => {
    let result = courses;

    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      result = result.filter(course => course.category === selectedCategory);
    }
    if (selectedLevel !== 'All') {
      result = result.filter(course => course.level === selectedLevel);
    }
    if (priceFilter === 'Free') {
      result = result.filter(course => course.price === 0);
    } else if (priceFilter === 'Paid') {
      result = result.filter(course => course.price > 0);
    }

    setFilteredCourses(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLevel, priceFilter, courses]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['All', 'Front-end', 'Back-end', 'Mobile App', 'Data Science', 'Cyber Security', 'DevOps'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <span className="text-purple-400 font-bold text-xs tracking-widest uppercase mb-2 block">Discover</span>
            <h1 className="text-4xl font-bold text-white">Explore Courses</h1>
            <p className="text-slate-400 mt-2">Find the perfect course to upgrade your skills.</p>
          </div>

          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search for courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#13151d] text-white border border-white/10 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="w-full lg:w-1/4 space-y-8 h-fit lg:sticky lg:top-28">
            <div className="bg-[#13151d]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <FaFilter className="text-purple-500 text-xs" /> Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-all flex justify-between items-center ${selectedCategory === cat ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {cat}
                    <span className={`text-xs ${selectedCategory === cat ? 'text-white/80' : 'text-slate-600'}`}>
                      {cat === 'All' ? courses.length : courses.filter(c => c.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#13151d]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5">
              <h3 className="text-white font-bold mb-4">Level & Price</h3>
              <div className="space-y-4">
                 <div className="flex flex-wrap gap-2">
                  {levels.map(lvl => (
                    <button key={lvl} onClick={() => setSelectedLevel(lvl)} className={`px-3 py-1.5 rounded-full text-xs border transition-all ${selectedLevel === lvl ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'border-white/10 text-slate-400 hover:border-white/30'}`}>{lvl}</button>
                  ))}
                </div>
                <div className="flex gap-2 bg-[#0a0a0a] p-1 rounded-lg border border-white/5">
                  {['All', 'Free', 'Paid'].map(price => (
                    <button key={price} onClick={() => setPriceFilter(price)} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${priceFilter === price ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}>{price}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="w-full lg:w-3/4">
            {currentItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {currentItems.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === 1 ? 'border-white/5 text-slate-600 cursor-not-allowed' : 'border-white/10 text-white hover:bg-white/10'}`}><FaChevronLeft size={12} /></button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i + 1} onClick={() => paginate(i + 1)} className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5'}`}>{i + 1}</button>
                    ))}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === totalPages ? 'border-white/5 text-slate-600 cursor-not-allowed' : 'border-white/10 text-white hover:bg-white/10'}`}><FaChevronRight size={12} /></button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
                <button onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedLevel('All'); setPriceFilter('All');}} className="mt-4 text-purple-400 hover:text-purple-300 underline font-medium">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;