import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AnimatedLogo: React.FC = () => {
  return (
    
    <div className="relative w-12 h-12">
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 526.36401 477.03693"
      initial="hidden"
      animate="visible"
      className="w-full h-full"
    > 
      <g transform="translate(-91.423882,-253.5866)">
        {/* Parte superior (blanca) */}
        <motion.path
          d="M 312.32408,254.29303 L 497.87767,584.55178 L 291.61277,584.66663 L 252.04899,655.38029 L 617.26698,655.43727 L 394.46457,254.0866 L 312.32408,254.29303 z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { 
              pathLength: 1, 
              opacity: 1,
              transition: { 
                duration: 2, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }
            }
          }}
        />
        
        {/* Parte izquierda (gris) */}
        <motion.path
          d="M 312.31392,254.26591 L 91.923882,655.37223 L 132.32998,728.10322 L 315.16759,396.77318 L 417.193,584.66155 L 498.0052,584.66155 L 312.31392,254.26591 z"
          fill="#7d7e7c"
          stroke="#000000"
          strokeWidth="1"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { 
              pathLength: 1, 
              opacity: 1,
              transition: { 
                duration: 2, 
                ease: "easeInOut",
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }
          }}
        />
        
        {/* Parte inferior (negra) */}
        <motion.path
          d="M 315.20979,396.83568 L 355.50104,471.05493 L 251.87272,655.43409 L 617.28788,655.62366 L 578.81741,730.12352 L 132.3464,728.07665 L 315.20979,396.83568 z"
          fill="#000000"
          stroke="#000000"
          strokeWidth="1"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { 
              pathLength: 1, 
              opacity: 1,
              transition: { 
                duration: 2, 
                ease: "easeInOut",
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }
          }}
        />
      </g>
      </motion.svg>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >

       
        
        <Image 
          src="/xolot.png" 
          alt="Logo" 
          width={90} 
          height={90} 
          className="object-contain"
        />
      </motion.div>
    </div>
  );
};

export default AnimatedLogo;