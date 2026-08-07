import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, Calendar, MapPin, CheckCircle, Shield, Star, Clock, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const services = [
    { id: 'deep-cleaning', name: 'Deep Home Cleaning' },
    { id: 'sofa-cleaning', name: 'Sofa Cleaning' },
    { id: 'bathroom', name: 'Bathroom Cleaning' },
    { id: 'pest-control', name: 'Pest Control' },
  ];

  const stats = [
    { label: 'Happy Customers', value: '10,000+' },
    { label: 'Bookings Completed', value: '5,000+' },
    { label: 'Average Rating', value: '4.9★' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-zinc-900">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-zinc-900 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" 
          alt="Professional Cleaning" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white/90 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>India's #1 Premium Cleaning Platform</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight"
            >
              Professional Home <br/>Cleaning Services <br/><span className="text-orange-500">At Your Doorstep</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-white/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Trusted cleaners, verified professionals, and affordable prices. Experience the luxury of a pristine home today.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <div className="flex items-center gap-2 text-white/90 font-medium">
                <CheckCircle className="w-5 h-5 text-[#22C55E]" /> Verified Staff
              </div>
              <div className="flex items-center gap-2 text-white/90 font-medium">
                <Shield className="w-5 h-5 text-orange-400" /> 100% Secure
              </div>
              <div className="flex items-center gap-2 text-white/90 font-medium">
                <Clock className="w-5 h-5 text-yellow-400" /> Instant Booking
              </div>
            </motion.div>

            {/* Live Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8 border-t border-white/20 pt-8"
            >
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Quick Booking Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl shadow-black/20 relative">
              
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
                <Star className="w-3 h-3 fill-current" /> Save 20% Today
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">Book a Service</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-white/80 mb-2">What do you need help with?</label>
                  <div className="relative">
                    <div 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-slate-700 shadow-inner cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <span className={selectedService ? 'text-slate-700' : 'text-slate-400'}>
                          {selectedService ? services.find(s => s.id === selectedService)?.name : 'Select a service...'}
                        </span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Custom Dropdown Menu */}
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                      >
                        <div className="max-h-48 overflow-y-auto">
                          {services.map((service) => (
                            <div
                              key={service.id}
                              onClick={() => {
                                setSelectedService(service.id);
                                setIsDropdownOpen(false);
                              }}
                              className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-slate-700 font-medium transition-colors border-b border-slate-50 last:border-none flex items-center gap-2"
                            >
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                              {service.name}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">When do you need it?</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                    <DatePicker 
                      selected={selectedDate} 
                      onChange={(date) => setSelectedDate(date)} 
                      placeholderText="Select a date"
                      className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-none outline-none focus:ring-2 focus:ring-orange-500 text-slate-700 shadow-inner"
                      wrapperClassName="w-full"
                      dateFormat="MMMM d, yyyy"
                      minDate={new Date()}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Where?</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Enter your city or zip code"
                      className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-none outline-none focus:ring-2 focus:ring-orange-500 text-slate-700 shadow-inner"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/book')}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] mt-4"
                >
                  See Prices & Book Now
                </Button>
                
                <p className="text-center text-xs text-white/60 mt-4">No credit card required. Free cancellation.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
