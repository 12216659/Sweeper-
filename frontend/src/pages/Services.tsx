import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Service {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  durationMinutes: number;
  includedItems: string[];
  iconUrl?: string;
  imageUrl?: string;
  packages?: any[];
}

const fetchServices = async (): Promise<Service[]> => {
  const response = await fetch('http://localhost:8000/api/v1/services');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const result = await response.json();
  return result.data.services;
};

export const Services = () => {
  const { data: services, isLoading, isError } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices
  });

  return (
    <div className="py-20 bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium text-orange-500 bg-orange-50 rounded-full border border-orange-100">
            Our Full Catalog
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Professional Services</h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            From basic house cleaning to specialized deep cleaning and pest control. Everything you need to maintain a perfect home, backed by our 100% satisfaction guarantee.
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg max-w-lg mx-auto">
            Failed to load services. Please ensure the backend is running.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services?.map((service) => {
            const IconComponent = Icons[service.iconUrl as keyof typeof Icons] || Icons.Sparkles;
            
            return (
              <Card key={service._id} className="flex flex-col hover:shadow-2xl transition-all duration-300 border-none shadow-md bg-white group rounded-3xl overflow-hidden">
                <div className="h-40 w-full bg-slate-100 relative overflow-hidden">
                  <img 
                    src={service.imageUrl || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop'} 
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-2 rounded-xl shadow-sm">
                    <IconComponent className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                
                <CardHeader className="pt-6 pb-4">
                  <CardTitle className="text-xl text-slate-900 leading-tight group-hover:text-orange-500 transition-colors">{service.name}</CardTitle>
                  <CardDescription className="text-slate-500 mt-2 line-clamp-2">{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-6 text-sm font-medium text-slate-700">
                    <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg text-green-700 border border-green-100">
                      <DollarSign className="w-4 h-4" />
                      <span>{service.basePrice}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-lg text-orange-600 border border-orange-100">
                      <Clock className="w-4 h-4" />
                      <span>{service.durationMinutes}m</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2.5">
                    {(service.includedItems && service.includedItems.length > 0 
                      ? service.includedItems 
                      : (service.packages?.[0]?.features || []))
                      .slice(0,3).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                    {(service.includedItems?.length > 3 || (service.packages?.[0]?.features?.length || 0) > 3) && (
                      <li className="text-xs font-medium text-slate-400 pl-6">
                        + {Math.max((service.includedItems?.length || 0), (service.packages?.[0]?.features?.length || 0)) - 3} more items
                      </li>
                    )}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-0 pb-6 px-6">
                  <Link to={`/services/${service._id}`} className="block w-full">
                    <Button className="w-full h-12 rounded-xl group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
