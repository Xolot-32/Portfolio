import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  return (
    <AnimatePresence>
      <span className={className}>
        {text.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.01 }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </AnimatePresence>
  );
};

export default AnimatedText;