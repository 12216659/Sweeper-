import React from 'react';
import { Users, Star, Award, ShieldCheck } from 'lucide-react';

export const TrustIndicators = () => {
  const stats = [
    { id: 1, name: 'Happy Customers', value: '10,000+', icon: Users },
    { id: 2, name: 'Average Rating', value: '4.9/5', icon: Star },
    { id: 3, name: 'Years Experience', value: '8+', icon: Award },
    { id: 4, name: 'Vetted Professionals', value: '500+', icon: ShieldCheck },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-100 relative z-20 -mt-12 mx-4 md:mx-auto max-w-5xl rounded-2xl shadow-xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 mb-4">
                <stat.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h4 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h4>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
