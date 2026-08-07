import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Clock, DollarSign, ArrowLeft, Star, ShieldCheck } from 'lucide-react';
import * as Icons from 'lucide-react';

export const ServiceDetails = () => {
  const { id } = useParams();

  const { data: service, isLoading, isError } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/v1/services/${id}`);
      if (!response.ok) throw new Error('Failed to fetch service');
      const result = await response.json();
      return result.data.service;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
        <Link to="/services">
          <Button variant="outline"><ArrowLeft className="mr-2 w-4 h-4"/> Back to Services</Button>
        </Link>
      </div>
    );
  }

  // Dynamically render icon
  const IconComponent = Icons[service.iconUrl as keyof typeof Icons] || Icons.Sparkles;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.imageUrl || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop'} 
            alt={service.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 backdrop-blur-md mb-8 border border-orange-500/30">
             <IconComponent className="w-10 h-10 text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{service.name}</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            {service.description}
          </p>
          <Link to="/book">
            <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-orange-500/20 hover:scale-105 transition-transform">
              Book this Service
            </Button>
          </Link>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Left Content */}
            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">What's Included?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.includedItems?.map((item: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mr-3 mt-0.5" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                  {(!service.includedItems || service.includedItems.length === 0) && (
                    <p className="text-slate-500">Includes complete premium cleaning for this category.</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">The Sweepers Guarantee</h2>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6">
                  <ShieldCheck className="w-12 h-12 text-orange-500 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">100% Satisfaction</h3>
                    <p className="text-slate-500">
                      We're not happy until you're happy. If you're not completely satisfied with our {service.name.toLowerCase()} service, we'll return and reclean for free.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar (Pricing Card) */}
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 sticky top-28">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Service Summary</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center pb-6 border-b border-slate-100">
                    <div className="flex items-center text-slate-600">
                      <DollarSign className="w-5 h-5 mr-3 text-green-500" />
                      <span className="font-medium">Starting Price</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-900">${service.basePrice}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-6 border-b border-slate-100">
                    <div className="flex items-center text-slate-600">
                      <Clock className="w-5 h-5 mr-3 text-orange-500" />
                      <span className="font-medium">Est. Duration</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900">~{service.durationMinutes} mins</span>
                  </div>

                  <div className="flex justify-between items-center pb-2">
                    <div className="flex items-center text-slate-600">
                      <Star className="w-5 h-5 mr-3 text-yellow-400 fill-current" />
                      <span className="font-medium">Avg Rating</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900">4.9/5</span>
                  </div>
                </div>

                <Link to="/book" className="block w-full">
                  <Button className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white">Book Now</Button>
                </Link>
                <p className="text-center text-xs text-slate-400 mt-4">No credit card required until service is complete.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
