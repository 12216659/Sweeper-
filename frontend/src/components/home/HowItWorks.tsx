import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, CalendarCheck, Home, CheckCircle } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      icon: MousePointerClick,
      title: "Choose Service",
      description: "Select from our wide range of premium cleaning services."
    },
    {
      icon: CalendarCheck,
      title: "Book Online",
      description: "Pick a date, time, and tell us your location. It takes 60 seconds."
    },
    {
      icon: Home,
      title: "Pro Arrives",
      description: "Our background-verified professional arrives fully equipped."
    },
    {
      icon: CheckCircle,
      title: "Spotless Home",
      description: "Enjoy your pristine, germ-free home with 100% satisfaction."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            How it <span className="text-orange-500">Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Getting a perfectly clean home has never been this easy. Follow these four simple steps.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-slate-100 rounded-full -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50 group-hover:border-orange-500 group-hover:-translate-y-2 transition-all duration-300 relative">
                  <step.icon className="w-10 h-10 text-orange-500" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#22C55E] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 max-w-[250px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
