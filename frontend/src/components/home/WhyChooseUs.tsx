import React from 'react';
import { ShieldCheck, Leaf, Clock, HeartHandshake } from 'lucide-react';

export const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Fully Insured & Vetted',
      description: 'Every cleaner undergoes a strict background check and is fully insured for your peace of mind.',
      icon: ShieldCheck,
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      title: 'Eco-Friendly Products',
      description: 'We use non-toxic, safe cleaning products that are tough on dirt but gentle on your family and pets.',
      icon: Leaf,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Always on Time',
      description: 'We respect your schedule. Our professionals arrive exactly when they say they will.',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: '100% Satisfaction',
      description: 'If you are not entirely happy with our work, we will come back and re-clean for free.',
      icon: HeartHandshake,
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Sweepers is the <br/> Number One Choice</h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              We don't just clean homes, we care for them. Our commitment to excellence, transparency, and customer satisfaction sets us apart from the rest.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1974&auto=format&fit=crop" 
              alt="Cleaning professional" 
              className="rounded-3xl shadow-xl w-full object-cover h-80"
            />
          </div>
          
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {reasons.map((reason, i) => (
              <div key={i} className="flex flex-col">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${reason.bg}`}>
                  <reason.icon className={`w-7 h-7 ${reason.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{reason.title}</h3>
                <p className="text-slate-500">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
