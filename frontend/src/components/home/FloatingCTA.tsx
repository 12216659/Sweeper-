import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FloatingCTA = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past the hero section (approx 500px)
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-4"
        >
          {/* WhatsApp Button */}
          <button 
            onClick={() => window.open('https://wa.me/919515141919', '_blank')}
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform relative group"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Chat with us
            </span>
          </button>

          {/* Persistent Book Now Button (Mobile Only, or hidden on desktop if desired) */}
          <button 
            onClick={() => navigate('/book')}
            className="md:hidden w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-110 transition-transform relative group"
          >
            <Calendar className="w-6 h-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
