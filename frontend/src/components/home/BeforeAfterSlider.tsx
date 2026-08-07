import React from 'react';
import { motion } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Sparkles } from 'lucide-react';

export const BeforeAfterSlider = () => {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-6"
            >
              <Sparkles className="w-4 h-4" /> Transformation
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
            >
              See the <span className="text-orange-500">Sweepers</span> Difference
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 max-w-lg"
            >
              Drag the slider to see how our professional deep cleaning turns a messy, stained room into a pristine, spotless sanctuary.
            </motion.p>

            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <li className="flex items-center gap-3 font-medium text-slate-700">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">1</div>
                Advanced stain removal
              </li>
              <li className="flex items-center gap-3 font-medium text-slate-700">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">2</div>
                Eco-friendly chemical treatments
              </li>
              <li className="flex items-center gap-3 font-medium text-slate-700">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">3</div>
                99.9% germ elimination
              </li>
            </motion.ul>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full max-w-2xl"
          >
            <div className="p-2 bg-white rounded-[32px] shadow-2xl shadow-orange-500/20 border border-slate-100">
              <div className="rounded-[24px] overflow-hidden relative">
                <ReactCompareSlider
                  className="h-[400px] md:h-[500px] w-full"
                  itemOne={
                    <ReactCompareSliderImage 
                      src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop" 
                      alt="Before Cleaning" 
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage 
                      src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop" 
                      alt="After Cleaning" 
                    />
                  }
                />
                
                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider pointer-events-none">
                  BEFORE
                </div>
                <div className="absolute top-4 right-4 bg-emerald-500/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider pointer-events-none">
                  AFTER
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
