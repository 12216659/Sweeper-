import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Do I need to be home during the cleaning?',
      answer: 'No, you do not need to be home. You can leave a key, provide a door code, or let the cleaners in and leave. We just need access to your home.'
    },
    {
      question: 'Are your cleaners insured and background checked?',
      answer: 'Yes, every Sweepers professional undergoes a rigorous multi-step background check and is fully insured and bonded.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'You can cancel or reschedule for free up to 24 hours before your booking. Cancellations within 24 hours may incur a small fee.'
    },
    {
      question: 'Do I need to provide cleaning supplies?',
      answer: 'No! Our professionals bring their own eco-friendly, industry-grade cleaning supplies and equipment.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-lg">Everything you need to know about the product and billing.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-slate-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-slate-900 text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 bg-white text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
