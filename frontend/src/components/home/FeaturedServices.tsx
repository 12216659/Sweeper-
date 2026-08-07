import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 'deep-cleaning',
    title: 'Deep Home Cleaning',
    description: 'Complete top-to-bottom intensive cleaning for your entire home.',
    price: 149,
    duration: '4-6 hrs',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    color: 'from-orange-500 to-indigo-600',
    popular: true
  },
  {
    id: 'kitchen-cleaning',
    title: 'Kitchen Cleaning',
    description: 'Deep removal of tough grease, stains, and cabinet organizing.',
    price: '89',
    duration: '2-3 hrs',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'monthly-maid',
    title: 'Monthly Maid Services',
    description: 'Enjoy hassle-free daily home cleaning with trained and background-verified professionals.',
    price: '5,999/mo',
    duration: 'Daily',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    color: 'from-orange-500 to-cyan-500',
    popular: true
  },
  {
    id: 'bathroom-cleaning',
    title: 'Bathroom Cleaning',
    description: 'Thorough sanitization, tile scrubbing, and fixture polishing.',
    price: 49,
    duration: '1-2 hrs',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    color: 'from-sky-500 to-orange-500',
  },
  {
    id: 'sofa-cleaning',
    title: 'Sofa Cleaning',
    description: 'Shampooing and deep extraction of dirt, stains, and allergens.',
    price: 59,
    duration: '1-2 hrs',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1512212621149-107ffe572d2f?w=800&q=80',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'pest-control',
    title: 'Pest Control',
    description: 'Eliminate roaches, ants, and termites with eco-friendly solutions.',
    price: 129,
    duration: '2-3 hrs',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1628178652438-6b801a6b0c20?w=800&q=80',
    color: 'from-orange-500 to-red-600',
    popular: true
  },
  {
    id: 'move-in',
    title: 'Move In/Out Cleaning',
    description: 'Make your old or new home spotless for the perfect transition.',
    price: 199,
    duration: '5-8 hrs',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    color: 'from-orange-500 to-cyan-600',
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export const FeaturedServices = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-500 font-semibold text-sm mb-4"
          >
            <Sparkles className="w-4 h-4" /> Our Expertise
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-6 tracking-tight"
          >
            Premium Services for a <span className="text-orange-500">Pristine Home</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Select from our highly-rated, professional services. We use eco-friendly products and advanced equipment to deliver perfection.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              variants={item}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 border border-slate-100 group relative"
            >
              {service.popular && (
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-500 shadow-sm flex items-center gap-1">
                  🔥 Most Popular
                </div>
              )}
              
              <div className="relative h-56 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} mix-blend-multiply opacity-20 group-hover:opacity-40 transition-opacity z-10`} />
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#111827] group-hover:text-orange-500 transition-colors">{service.title}</h3>
                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" /> {service.rating}
                  </div>
                </div>
                
                <p className="text-slate-500 mb-6 line-clamp-2">{service.description}</p>
                
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Starting At</p>
                    <p className="text-2xl font-extrabold text-[#111827]">{service.id === 'monthly-maid' ? '₹' : '$'}{service.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Duration</p>
                    <p className="flex items-center text-sm font-medium text-slate-600"><Clock className="w-4 h-4 mr-1 text-slate-400" /> {service.duration}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => navigate(`/services/${service.id}`)} 
                    variant="outline" 
                    className="flex-1 rounded-xl h-12 border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500"
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => navigate(`/book?service=${service.id}`)} 
                    className="flex-1 rounded-xl h-12 bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md shadow-orange-500/30 hover:scale-105 transition-transform"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Button 
            onClick={() => navigate('/services')} 
            variant="ghost" 
            className="text-orange-500 hover:bg-orange-50 font-bold text-lg rounded-full px-8 py-6 h-auto"
          >
            Explore All Services <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

      </div>
    </section>
  );
};
