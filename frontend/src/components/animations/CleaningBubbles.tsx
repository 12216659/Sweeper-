import React from 'react';
import { motion } from 'framer-motion';

export const CleaningBubbles = () => {
  // Generate random bubbles
  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 20, // 20px to 60px
    x: Math.random() * 100, // 0 to 100vw
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10, // 10s to 20s
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{ 
            y: '100vh', 
            x: `${bubble.x}vw`, 
            opacity: 0,
            scale: 0.5 
          }}
          animate={{ 
            y: '-20vh', 
            x: `${bubble.x + (Math.random() * 20 - 10)}vw`, // slight horizontal drift
            opacity: [0, 0.6, 0.8, 0],
            scale: [0.5, 1, 1.2, 0.8]
          }}
          transition={{ 
            duration: bubble.duration, 
            repeat: Infinity, 
            delay: bubble.delay,
            ease: "linear"
          }}
          style={{
            width: bubble.size,
            height: bubble.size,
          }}
          className="absolute rounded-full border border-white/40 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)] backdrop-blur-[2px] bg-white/10"
        />
      ))}
      {/* Add some sparkling stars */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 180 }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "easeInOut" 
          }}
          className="absolute text-white/50"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};
