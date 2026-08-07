import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

export const PricingPreview = () => {
  return (
    <section className="py-24 bg-slate-900 text-white relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">No hidden fees, no surprises. Just straightforward pricing for a cleaner home.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-2">Standard Clean</h3>
            <p className="text-slate-400 mb-6">Perfect for regular maintenance.</p>
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-extrabold">$80</span>
              <span className="text-slate-400 ml-2">/ starting</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['Dusting and wiping', 'Vacuuming and mopping', 'Bathroom sanitation', 'Kitchen surfaces'].map((item, i) => (
                <li key={i} className="flex items-center text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/book" className="block w-full">
              <Button variant="outline" className="w-full h-12 text-md border-slate-600 bg-slate-800 text-white hover:bg-slate-700 hover:text-white">Book Standard</Button>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-b from-orange-500 to-zinc-800 rounded-3xl p-8 border border-orange-500 relative transform md:-translate-y-4 shadow-2xl">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Deep Clean</h3>
            <p className="text-orange-100 mb-6">For a thorough, top-to-bottom clean.</p>
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-extrabold">$150</span>
              <span className="text-orange-200 ml-2">/ starting</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['Everything in Standard', 'Inside appliances', 'Baseboards and blinds', 'Deep scrubbing'].map((item, i) => (
                <li key={i} className="flex items-center text-orange-50">
                  <Check className="w-5 h-5 text-green-300 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/book" className="block w-full">
              <Button className="w-full h-12 text-md bg-white text-zinc-900 hover:bg-slate-100 hover:text-zinc-900">Book Deep Clean</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
