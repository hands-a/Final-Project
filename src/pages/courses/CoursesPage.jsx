import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import CourseCard from '../../components/courses/CourseCard'; 
import { FaFilter, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  const [filteredCourses, setFilteredCourses] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const categories = [
    'All', 
    'Data Science', 
    'Mobile App', 
    'Cyber Security',
    'DevOps',
    'Front-end'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    axios.get('http://localhost:1337/api/courses?populate=*')
      .then((response) => {
        const formattedCourses = response.data.data.map((item) => {
          const attr = item.attributes || item; 
          
          const { title, category, level, price, instructor, rating, lessons, image } = attr;
          
          let imageUrl = 'https://via.placeholder.com/400x200?text=No+Image';
          if (image) {
            if (image.url) { 
              imageUrl = `http://localhost:1337${image.url}`;
            } else if (image.data?.attributes?.url) { 
              imageUrl = `http://localhost:1337${image.data.attributes.url}`;
            }
          }
          
          return {
            id: item.id || item.documentId,
            title: title || "بدون عنوان",
            category: category || "All",
            level: level || "Beginner",
            price: price || 0,
            instructor: instructor || "Unknown",
            rating: rating || 0,
            lessons: lessons || 0,
            image: imageUrl
          };
        });

        setCourses(formattedCourses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses from Strapi:", error);
        setLoading(false);
      });
  }, []);

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
      result = result.filter(course => course.price === 0 || course.price === "Free"); 
    } else if (priceFilter === 'Paid') {
      result = result.filter(course => course.price > 0 && course.price !== "Free");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center pt-28">
        <FaSpinner className="text-pink-500 text-5xl animate-spin mb-4" />
        <h2 className="text-white text-xl font-bold tracking-widest uppercase">Loading courses...</h2>
      </div>
    );
  }

  return (
    // Background Space Theme
// هتبقى كده
<div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <span className="text-pink-400 font-bold text-xs tracking-widest uppercase mb-2 block">Discover</span>
            <h1 className="text-4xl font-light text-white tracking-wide">Explore Courses</h1>
            <p className="text-slate-400 text-sm mt-2 font-light">Find the perfect course to upgrade your skills.</p>
          </div>

          <div className="relative w-full md:w-96 group">
            {/* Pure Glass Search Input */}
            <input 
              type="text" 
              placeholder="Search for courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-white border border-white/10 rounded-xl px-6 py-3 focus:outline-none focus:bg-white/5 focus:border-pink-400/50 transition-all placeholder:text-slate-500/50 text-sm tracking-wide"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4 space-y-8 h-fit lg:sticky lg:top-28">
            
            {/* Categories Filter (Pure Glass) */}
            <div className="bg-white/0 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
              <h3 className="text-white font-light text-lg mb-5 flex items-center gap-2 tracking-wide">
                <FaFilter className="text-pink-400 text-sm" /> Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all flex justify-between items-center ${
                      selectedCategory === cat 
                        ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium shadow-lg shadow-pink-500/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white bg-transparent border border-transparent hover:border-white/5'
                    }`}
                  >
                    {cat}
                    <span className={`text-xs ${selectedCategory === cat ? 'text-white/90' : 'text-slate-500'}`}>
                      {cat === 'All' 
                        ? courses.length 
                        : courses.filter(c => c.category === cat).length
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Level & Price Filter (Pure Glass) */}
            <div className="bg-white/0 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
              <h3 className="text-white font-light text-lg mb-5 tracking-wide">Level & Price</h3>
              <div className="space-y-6">
                
                {/* Levels */}
                <div className="flex flex-wrap gap-2">
                  {levels.map(lvl => (
                    <button 
                      key={lvl} 
                      onClick={() => setSelectedLevel(lvl)} 
                      className={`px-4 py-2 rounded-xl text-xs transition-all border ${
                        selectedLevel === lvl 
                          ? 'bg-gradient-to-r from-pink-500 to-violet-600 border-transparent text-white shadow-lg shadow-pink-500/20 font-medium' 
                          : 'bg-transparent border-white/10 text-slate-400 hover:border-white/30 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                {/* Price Toggle */}
                <div className="flex gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
                  {['All', 'Free', 'Paid'].map(price => (
                    <button 
                      key={price} 
                      onClick={() => setPriceFilter(price)} 
                      className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                        priceFilter === price 
                          ? 'bg-white/10 text-white shadow-sm border border-white/10' 
                          : 'text-slate-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Courses Grid */}
          <div className="w-full lg:w-3/4">
            {currentItems.length > 0 ? (
              <>
                {/* ملاحظة: تأكد إن 컴بوننت الـ CourseCard نفسه
                  متوافق مع الثيم الزجاجي عشان الشكل يكمل!
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {currentItems.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button 
                      onClick={() => paginate(currentPage - 1)} 
                      disabled={currentPage === 1} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === 1 ? 'border-white/5 text-slate-600 cursor-not-allowed bg-transparent' : 'border-white/10 text-white hover:bg-white/5 bg-transparent'}`}
                    >
                      <FaChevronLeft size={12} />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i + 1} 
                        onClick={() => paginate(i + 1)} 
                        className={`w-10 h-10 rounded-full text-sm transition-all ${
                          currentPage === i + 1 
                            ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold shadow-lg shadow-pink-500/20 border-none' 
                            : 'bg-transparent border border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => paginate(currentPage + 1)} 
                      disabled={currentPage === totalPages} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === totalPages ? 'border-white/5 text-slate-600 cursor-not-allowed bg-transparent' : 'border-white/10 text-white hover:bg-white/5 bg-transparent'}`}
                    >
                      <FaChevronRight size={12} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State (Pure Glass) */
              <div className="text-center py-24 bg-white/0 backdrop-blur-xl rounded-3xl border border-white/10 border-dashed flex flex-col items-center justify-center shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <h3 className="text-2xl font-light text-white mb-2 tracking-wide">No courses found</h3>
                <p className="text-slate-400 mb-8 font-light text-sm">We couldn't find any courses matching your filters.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedLevel('All'); setPriceFilter('All');}} 
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;