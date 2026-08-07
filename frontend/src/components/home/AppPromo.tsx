import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Play, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AppPromo = () => {
  return (
    <section className="py-24 bg-zinc-900 overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V0H40V40H0ZM39 1H1V39H39V1Z" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 bg-white/10 backdrop-blur-lg border border-white/20 rounded-[40px] p-8 md:p-16">
          
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-semibold text-sm mb-6"
            >
              <Smartphone className="w-4 h-4" /> Mobile App Coming Soon
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
            >
              Book faster with the <br/><span className="text-orange-500">Sweepers App</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80 mb-10 max-w-lg mx-auto lg:mx-0"
            >
              Manage your bookings, track your cleaner in real-time, and get exclusive app-only discounts. Scan the QR code to get notified when we launch!
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button className="bg-black text-white hover:bg-slate-900 h-14 px-6 rounded-xl flex items-center gap-3 w-full sm:w-auto">
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[10px] leading-tight text-slate-300">Download on the</div>
                  <div className="text-sm font-bold leading-tight">App Store</div>
                </div>
              </Button>
              <Button className="bg-black text-white hover:bg-slate-900 h-14 px-6 rounded-xl flex items-center gap-3 w-full sm:w-auto">
                <Play className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-[10px] leading-tight text-slate-300">GET IT ON</div>
                  <div className="text-sm font-bold leading-tight">Google Play</div>
                </div>
              </Button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative flex justify-center lg:justify-end"
          >
            {/* Phone Mockup Placeholder */}
            <div className="w-[300px] h-[600px] bg-slate-900 rounded-[50px] border-[12px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-7 bg-slate-800 rounded-b-3xl mx-16 z-20"></div>
              
              <div className="flex-1 bg-white p-6 relative">
                <div className="h-16 w-full bg-slate-100 rounded-xl mb-4 animate-pulse"></div>
                <div className="h-40 w-full bg-zinc-900 rounded-xl mb-6 shadow-lg shadow-orange-500/30"></div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse"></div>
                </div>
                
                {/* QR Code Graphic */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white p-3 rounded-xl shadow-xl border border-slate-100">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://sweepers.com/app`} alt="QR Code" className="w-24 h-24" />
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-500 rounded-full blur-3xl opacity-50 -z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
