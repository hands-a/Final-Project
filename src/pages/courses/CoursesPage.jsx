import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import CourseCard from '../../components/courses/CourseCard'; 
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';

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

  // 👈 الحل السحري هنا: ظبطنا استقبال الداتا عشان يشتغل مع أي إصدار لـ Strapi
  useEffect(() => {
    axios.get('http://localhost:1337/api/courses?populate=*')
      .then((response) => {
        const formattedCourses = response.data.data.map((item) => {
          
          // لو Strapi قديم هياخد attributes، لو جديد هياخد item مباشر
          const attr = item.attributes || item; 
          
          const { title, category, level, price, instructor, rating, lessons, image } = attr;
          
          // تظبيط الصورة عشان تتوافق مع التحديث الجديد
          let imageUrl = 'https://via.placeholder.com/400x200?text=No+Image';
          if (image) {
            if (image.url) { // الإصدار الجديد
              imageUrl = `http://localhost:1337${image.url}`;
            } else if (image.data?.attributes?.url) { // الإصدار القديم
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

  // الفلترة 
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

  // Pagination Logic
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
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center pt-28">
        <FaSpinner className="text-purple-500 text-5xl animate-spin mb-4" />
        <h2 className="text-white text-xl font-bold">Loading courses...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
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
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4 space-y-8 h-fit lg:sticky lg:top-28">
            
            {/* Categories Filter */}
            <div className="bg-[#13151d]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <FaFilter className="text-purple-500 text-xs" /> Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-all flex justify-between items-center ${
                      selectedCategory === cat 
                        ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {cat}
                    <span className={`text-xs ${selectedCategory === cat ? 'text-white/80' : 'text-slate-600'}`}>
                      {cat === 'All' 
                        ? courses.length 
                        : courses.filter(c => c.category === cat).length
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Level & Price Filter */}
            <div className="bg-[#13151d]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5">
              <h3 className="text-white font-bold mb-4">Level & Price</h3>
              <div className="space-y-4">
                 <div className="flex flex-wrap gap-2">
                  {levels.map(lvl => (
                    <button 
                      key={lvl} 
                      onClick={() => setSelectedLevel(lvl)} 
                      className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                        selectedLevel === lvl 
                          ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-sm' 
                          : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 bg-[#0a0a0a] p-1 rounded-lg border border-white/5">
                  {['All', 'Free', 'Paid'].map(price => (
                    <button 
                      key={price} 
                      onClick={() => setPriceFilter(price)} 
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                        priceFilter === price 
                          ? 'bg-white/10 text-white shadow-sm border border-white/5' 
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
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === 1 ? 'border-white/5 text-slate-600 cursor-not-allowed' : 'border-white/10 text-white hover:bg-white/10'}`}
                    >
                      <FaChevronLeft size={12} />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i + 1} 
                        onClick={() => paginate(i + 1)} 
                        className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                          currentPage === i + 1 
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                            : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => paginate(currentPage + 1)} 
                      disabled={currentPage === totalPages} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === totalPages ? 'border-white/5 text-slate-600 cursor-not-allowed' : 'border-white/10 text-white hover:bg-white/10'}`}
                    >
                      <FaChevronRight size={12} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-500">
                  <FaSearch size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
                <p className="text-slate-400 mb-6">We couldn't find any courses matching your filters.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedLevel('All'); setPriceFilter('All');}} 
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold transition-all shadow-lg shadow-purple-600/20"
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