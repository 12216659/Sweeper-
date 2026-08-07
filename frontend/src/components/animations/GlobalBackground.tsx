import React from 'react';
import { motion } from 'framer-motion';

export const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-50">
      {/* Subtle abstract floating blobs for other pages */}
      <motion.div 
        animate={{ 
          y: [0, -50, 0], 
          x: [0, 30, 0],
          rotate: [0, 10, 0] 
        }} 
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-orange-100/40 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
          y: [0, 40, 0], 
          x: [0, -40, 0],
          rotate: [0, -10, 0] 
        }} 
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-emerald-100/30 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
          y: [0, -30, 0], 
          scale: [1, 1.1, 1] 
        }} 
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-sky-100/30 rounded-full blur-[120px]"
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  );
};
