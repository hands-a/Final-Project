import React, { useState } from 'react';
import { FaPlus, FaTrash, FaVideo, FaFileAlt } from 'react-icons/fa';

const CurriculumBuilder = ({ onCurriculumChange }) => {
  const [sections, setSections] = useState([]);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [newLesson, setNewLesson] = useState({ title: '', duration: '', type: 'video' });

  // إضافة سكشن جديد
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

  // إضافة درس جديد
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

  // حذف سكشن
  const deleteSection = (sectionId) => {
    const updated = sections.filter(s => s.id !== sectionId);
    setSections(updated);
    onCurriculumChange(updated);
  };

  return (
    <div className="bg-[#13151d] p-6 rounded-2xl border border-white/5 mt-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        📚 Course Curriculum
      </h3>

      <div className="space-y-4 mb-8">
        {sections.map((section, index) => (
          <div key={section.id} className="border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-white/5 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">Section {index + 1}</span>
                <h4 className="font-bold text-white">{section.title}</h4>
              </div>
              <button type="button" onClick={() => deleteSection(section.id)} className="text-slate-500 hover:text-red-400">
                <FaTrash />
              </button>
            </div>

            <div className="p-4 bg-[#0a0a0a]/50">
              {section.lessons.length > 0 ? (
                <ul className="space-y-2 mb-4">
                  {section.lessons.map((lesson, idx) => (
                    <li key={lesson.id} className="flex justify-between items-center text-sm text-slate-300 p-2 bg-white/5 rounded border border-white/5">
                      <div className="flex items-center gap-2">
                        {lesson.type === 'video' ? <FaVideo className="text-blue-400" /> : <FaFileAlt className="text-yellow-400" />}
                        <span>{idx + 1}. {lesson.title}</span>
                      </div>
                      <span className="text-xs text-slate-500">{lesson.duration} min</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500 mb-4 italic">No lessons in this section yet.</p>
              )}

              {activeSectionId === section.id ? (
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 animate-fade-in">
                  <input 
                    type="text" placeholder="Lesson Title" 
                    className="w-full bg-[#0a0a0a] text-white p-2 rounded mb-2 text-sm border border-white/10 outline-none"
                    value={newLesson.title}
                    onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                  />
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="text" placeholder="Duration (e.g. 10:05)" 
                      className="w-1/2 bg-[#0a0a0a] text-white p-2 rounded text-sm border border-white/10 outline-none"
                      value={newLesson.duration}
                      onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})}
                    />
                    <select 
                      className="w-1/2 bg-[#0a0a0a] text-white p-2 rounded text-sm border border-white/10 outline-none"
                      value={newLesson.type}
                      onChange={(e) => setNewLesson({...newLesson, type: e.target.value})}
                    >
                      <option value="video">Video</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setActiveSectionId(null)} className="text-xs text-slate-400 hover:text-white">Cancel</button>
                    <button type="button" onClick={() => addLesson(section.id)} className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500">Add</button>
                  </div>
                </div>
              ) : (
                <button 
                  type="button"
                  onClick={() => setActiveSectionId(section.id)}
                  className="w-full py-2 border border-dashed border-white/10 text-slate-400 text-xs rounded hover:border-purple-500 hover:text-purple-400 transition-colors flex justify-center items-center gap-2"
                >
                  <FaPlus /> Add Lesson
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="New Section Title (e.g. Introduction)"
          className="flex-1 bg-[#0a0a0a] text-white p-3 rounded-xl border border-white/10 outline-none focus:border-purple-500 transition-colors"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
        />
        <button 
          type="button" 
          onClick={addSection}
          className="bg-white/10 hover:bg-purple-600 text-white px-6 rounded-xl font-bold transition-colors"
        >
          Add Section
        </button>
      </div>
    </div>
  );
};

export default CurriculumBuilder;