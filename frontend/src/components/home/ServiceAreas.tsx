import React from 'react';
import { MapPin } from 'lucide-react';

export const ServiceAreas = () => {
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cities We Serve</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-12">
          We are rapidly expanding across the country. Check if Sweepers is available in your area.
        </p>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {cities.map((city) => (
            <div key={city} className="bg-white border border-slate-200 rounded-full px-6 py-3 flex items-center shadow-sm hover:border-orange-300 hover:shadow-md transition-all cursor-default">
              <MapPin className="w-4 h-4 text-orange-500 mr-2" />
              <span className="font-medium text-slate-700">{city}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
