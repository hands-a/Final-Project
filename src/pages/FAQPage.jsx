import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';

const faqs = [
  {
    question: "Do I get a certificate after completing a course?",
    answer: "Yes! Once you complete 100% of the course lectures and assignments, you will automatically receive a certificate of completion that you can download and share on LinkedIn."
  },
  {
    question: "Is there a time limit to finish the course?",
    answer: "No, you have lifetime access to the course. You can learn at your own pace and come back to the content whenever you want."
  },
  {
    question: "What is the refund policy?",
    answer: "We offer a 14-day money-back guarantee. If you are not satisfied with the course content for any reason, you can request a full refund within the first 14 days."
  },
  {
    question: "Can I watch the courses on mobile?",
    answer: "Absolutely! Our platform is fully responsive and works perfectly on smartphones, tablets, and desktops."
  },
  {
    question: "How do I contact the instructor for help?",
    answer: "Each course has a dedicated Q&A section where you can post your questions. The instructor and our support team monitor these discussions regularly."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-pink-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-purple-500 font-bold tracking-widest uppercase text-sm">Support</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Questions</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about the product and billing. Can’t find the answer you’re looking for? Please chat to our friendly team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-[#13151d] border ${openIndex === index ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : 'border-white/5'} rounded-2xl overflow-hidden transition-all duration-300`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
              >
                <div className="flex items-center gap-4">
                  <FaQuestionCircle className={`text-xl transition-colors ${openIndex === index ? 'text-purple-500' : 'text-slate-600 group-hover:text-purple-400'}`} />
                  <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                </div>
                {openIndex === index ? (
                  <FaChevronUp className="text-purple-500" />
                ) : (
                  <FaChevronDown className="text-slate-500 group-hover:text-white transition-colors" />
                )}
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0 ml-11 border-l-2 border-white/5 pl-4 text-slate-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;