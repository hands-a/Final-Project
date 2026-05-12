import React, { useState } from 'react';
import { FaPlus, FaTrash, FaVideo, FaFileAlt, FaList } from 'react-icons/fa';

const CurriculumBuilder = ({ onCurriculumChange }) => {
  const [sections, setSections] = useState([]);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [newLesson, setNewLesson] = useState({ title: '', duration: '', type: 'video' });

  const addSection = (e) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    const newSection = {
      id: Date.now(),
      title: newSectionTitle,
      lessons: []
    };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    onCurriculumChange(updatedSections);
    setNewSectionTitle('');
  };

  const addLesson = (sectionId) => {
    if (!newLesson.title.trim()) return;
    
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: [...section.lessons, { ...newLesson, id: Date.now() }]
        };
      }
      return section;
    });

    setSections(updatedSections);
    onCurriculumChange(updatedSections);
    setNewLesson({ title: '', duration: '', type: 'video' });
    setActiveSectionId(null);
  };

  const deleteSection = (sectionId) => {
    const updated = sections.filter(s => s.id !== sectionId);
    setSections(updated);
    onCurriculumChange(updated);
  };

  return (
    <div className="mt-2 w-full">
      <div className="space-y-4 mb-8">
        {sections.map((section, index) => (
          <div key={section.id} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md shadow-sm">
            
            <div className="p-4 sm:p-5 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-4">
                <span className="bg-gradient-to-r from-pink-500 to-violet-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  Section {index + 1}
                </span>
                <h4 className="font-medium tracking-wide text-white">{section.title}</h4>
              </div>
              <button 
                type="button" 
                onClick={() => deleteSection(section.id)} 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border border-transparent hover:bg-red-500/10 hover:border-red-500/30 text-slate-500 hover:text-red-400 transition-all"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>

            <div className="p-4 sm:p-5">
              {section.lessons.length > 0 ? (
                <ul className="space-y-3 mb-5">
                  {section.lessons.map((lesson, idx) => (
                    <li key={lesson.id} className="flex justify-between items-center text-sm text-slate-300 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          {lesson.type === 'video' ? <FaVideo className="text-pink-400 text-xs" /> : <FaFileAlt className="text-violet-400 text-xs" />}
                        </div>
                        <span className="font-light tracking-wide text-white">{idx + 1}. {lesson.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold bg-black/20 px-2 py-1 rounded-md">
                        {lesson.duration} min
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500 mb-5 font-light tracking-wider italic text-center py-2">No lessons in this section yet.</p>
              )}

              {activeSectionId === section.id ? (
                <div className="bg-black/20 p-4 rounded-xl border border-white/5 animate-fadeIn">
                  <input 
                    type="text" 
                    placeholder="Lesson Title" 
                    className="w-full bg-transparent text-white p-3 rounded-lg mb-3 text-sm border border-white/10 outline-none focus:border-pink-400/50 focus:bg-white/5 transition-all placeholder:text-slate-500 tracking-wide"
                    value={newLesson.title}
                    onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                  />
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <input 
                      type="text" 
                      placeholder="Duration (e.g. 10:05)" 
                      className="w-full sm:w-1/2 bg-transparent text-white p-3 rounded-lg text-sm border border-white/10 outline-none focus:border-pink-400/50 focus:bg-white/5 transition-all placeholder:text-slate-500 tracking-wide"
                      value={newLesson.duration}
                      onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})}
                    />
                    <select 
                      className="w-full sm:w-1/2 bg-transparent text-white p-3 rounded-lg text-sm border border-white/10 outline-none focus:border-pink-400/50 focus:bg-white/5 transition-all appearance-none tracking-wide"
                      value={newLesson.type}
                      onChange={(e) => setNewLesson({...newLesson, type: e.target.value})}
                    >
                      <option value="video" className="bg-[#050511] text-slate-300">Video Lesson</option>
                      <option value="quiz" className="bg-[#050511] text-slate-300">Quiz Module</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => setActiveSectionId(null)} 
                      className="text-xs uppercase tracking-widest text-slate-400 hover:text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      onClick={() => addLesson(section.id)} 
                      className="text-xs uppercase tracking-widest font-bold bg-white/10 text-white border border-white/10 hover:border-white/30 px-6 py-2 rounded-lg transition-all"
                    >
                      Add Lesson
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  type="button"
                  onClick={() => setActiveSectionId(section.id)}
                  className="w-full py-3.5 border border-dashed border-white/20 text-slate-400 text-xs uppercase tracking-widest font-bold rounded-xl hover:border-pink-400/50 hover:text-pink-400 hover:bg-pink-400/5 transition-all flex justify-center items-center gap-2"
                >
                  <FaPlus /> Add Lesson
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          type="text" 
          placeholder="New Section Title (e.g. Introduction)"
          className="flex-1 bg-transparent text-white px-5 py-3.5 rounded-xl border border-white/10 outline-none focus:border-pink-400/50 focus:bg-white/5 transition-all placeholder:text-slate-500 tracking-wide text-sm"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
        />
        <button 
          type="button" 
          onClick={addSection}
          className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-medium tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <FaPlus className="text-xs opacity-70" /> Add Section
        </button>
      </div>
    </div>
  );
};

export default CurriculumBuilder;