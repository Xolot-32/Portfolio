import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedTitleProps {
  text: string
  className?: string
  highlight?: string
  variant?: 'fade' | 'slide' | 'bounce' | 'wave' | 'hover'
  isVisible?: boolean
}

const letterVariants = {
  fade: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  },
  slide: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  bounce: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  },
  wave: {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [-14, 0, -14],
      transition: {
        delay: i * 0.02,
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      },
    }),
  },
  hover: {
    initial: { y: 0 },
    animate: { y: 0 },
    hover: { y: -10, color: '#3B82F6', transition: { duration: 0.2 } },
  },
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  className = '',
  highlight = '',
  variant = 'fade',
  isVisible = true,
}) => {
  const words = text.split(' ')
  const letters = text.split('')

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.h1
          className={`text-4xl font-bold ${className}`}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ staggerChildren: 0.1 }}
        >
          {variant === 'hover' ? (
            letters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants.hover}
                whileHover="hover"
                style={{ display: 'inline-block', cursor: 'default' }}
                className={`${letter === ' ' ? 'mr-2' : ''} ${
                  highlight.includes(letter.toLowerCase()) ? 'text-blue-500' : ''
                }`}
              >
                {letter}
              </motion.span>
            ))
          ) : variant === 'wave' ? (
            letters.map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants.wave}
                style={{ display: 'inline-block' }}
                className={`${letter === ' ' ? 'mr-2' : ''} ${
                  highlight.includes(letter.toLowerCase()) ? 'text-blue-500' : ''
                }`}
              >
                {letter}
              </motion.span>
            ))
          ) : (
            words.map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                className="inline-block mr-2"
                variants={letterVariants[variant]}
              >
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={`${word}-${charIndex}`}
                    className={highlight.includes(char.toLowerCase()) ? 'text-blue-500' : ''}
                    variants={letterVariants[variant]}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            ))
          )}
        </motion.h1>
      )}
    </AnimatePresence>
  )
}

export default AnimatedTitle