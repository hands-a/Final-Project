import React from 'react';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaCertificate, FaInfinity, FaStar, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';

const HomeContent = () => {

  // 1. بيانات قسم المميزات
  const features = [
    {
      id: 1,
      title: "Expert Instructors",
      desc: "Learn from industry professionals with years of real-world experience.",
      icon: <FaChalkboardTeacher />,
      color: "bg-purple-600",
      shadow: "shadow-purple-500/20"
    },
    {
      id: 2,
      title: "Verified Certificates",
      desc: "Earn recognized certificates to boost your career and showcase your skills.",
      icon: <FaCertificate />,
      color: "bg-blue-600",
      shadow: "shadow-blue-500/20"
    },
    {
      id: 3,
      title: "Lifetime Access",
      desc: "Study at your own pace with unlimited access to all course materials.",
      icon: <FaInfinity />,
      color: "bg-green-600",
      shadow: "shadow-green-500/20"
    }
  ];

  // 2. بيانات قسم آراء الطلاب (تم تغيير الاسم لـ Future Dev)
  const reviews = [
    {
      id: 1,
      name: "Rana Wael",
      role: "The best in the universe",
      text: "My support, my life, and everything I have and will have, to me you are everything in my life. I love you.",
      rating: 5
    },
    {
      id: 2,
      name: "Ahmed",
      role: "Data Scientist",
      text: "Best investment in my education. The platform is intuitive and the content is top-notch.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "UX Designer",
      text: "I love the flexibility and quality of courses. Highly recommend to anyone looking to upskill!",
      rating: 5
    }
  ];

  return (
    <div className="w-full bg-slate-50 py-20 overflow-hidden">
      
      <div className="container mx-auto px-6 lg:px-12">

        {/* --- القسم الأول: Why Choose Us --- */}
        <div className="text-center mb-16">
          <span className="text-purple-600 font-bold text-sm tracking-wider uppercase mb-2 block">Our Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Future Dev?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Everything you need to succeed in your learning journey is right here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200 border border-slate-100 hover:-translate-y-2 transition-transform duration-300 text-center group cursor-default">
              <div className={`w-16 h-16 mx-auto ${item.color} ${item.shadow} rounded-2xl flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>


        {/* --- القسم الثاني: Testimonials --- */}
        <div className="text-center mb-16">
           <span className="text-purple-600 font-bold text-sm tracking-wider uppercase mb-2 block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Students Say</h2>
          <p className="text-slate-500 text-lg">Join thousands of satisfied learners around the globe.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 relative group">
              {/* أيقونة اقتباس */}
              <FaQuoteLeft className="absolute top-6 left-6 text-purple-100/50 text-5xl -z-0 group-hover:text-purple-100 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="text-slate-600 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                      {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{review.name}</h4>
                    <p className="text-xs text-purple-600 font-medium">{review.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* --- القسم الثالث: CTA Banner --- */}
        <div className="w-full bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl shadow-purple-500/30 relative overflow-hidden">
          
          {/* دوائر ديكور خلفية */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-purple-100 text-lg mb-8 leading-relaxed">
              Join 50,000+ students already learning on <span className="font-bold text-white">Future Dev</span>. Start your free trial today and unlock your potential.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 bg-white text-violet-700 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-slate-50 hover:scale-105 transition-all duration-300"
            >
              Start Free Trial <FaArrowRight />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeContent;