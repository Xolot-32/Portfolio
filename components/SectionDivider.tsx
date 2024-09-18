import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  fromColor?: string;
  toColor?: string;
  filter?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  fromColor = 'rgba(84, 87, 92, 1)',  
  toColor = 'rgba(84, 87, 92, 0)',
  filter = 'blur(10px)'
}) => {
  return (
    <motion.div 
      className="relative h-16 w-full overflow-hidden"
      style={{
        backdropFilter: filter,
        WebkitBackdropFilter: filter,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom,
              ${fromColor} 0%,
              ${toColor} 25%,
              ${fromColor} 50%,
              ${toColor} 75%,
              ${fromColor} 100%
            )
          `,
          backgroundSize: '100% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '0% 100%'],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 10,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(255,255,255,0.1) 0%, transparent 70%),
            radial-gradient(circle at 20% 70%, rgba(255,255,255,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)
          `,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </motion.div>
  );
};

export default SectionDivider;