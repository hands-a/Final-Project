import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTerminal } from 'react-icons/fa';

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
        <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-cyan-600/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-emerald-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <div className="text-center mb-14">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-3 block">Support</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Questions</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Everything you need to know about the product and billing. Can't find the answer? Please contact our friendly team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`glass-panel overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-cyan-500/30 shadow-[0_8px_24px_rgba(6,182,212,0.08)]' : 'border-zinc-800/50'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                    openIndex === index ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-zinc-800/60 border border-zinc-700/50 group-hover:border-zinc-600'
                  }`}>
                    <FaTerminal className={`text-xs transition-colors duration-300 ${openIndex === index ? 'text-cyan-400' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                  </div>
                  <span className={`font-semibold text-base transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                </div>
                {openIndex === index ? (
                  <FaChevronUp className="text-cyan-400 shrink-0 ml-4" />
                ) : (
                  <FaChevronDown className="text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0 ml-4" />
                )}
              </button>

              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6 pt-0 ml-12 border-l-2 border-cyan-500/20 pl-4 text-zinc-500 text-sm leading-relaxed">
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