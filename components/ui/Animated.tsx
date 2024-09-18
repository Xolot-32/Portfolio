import React from 'react'
import { motion } from 'framer-motion'

export const AnimatedSection: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)

export const AnimatedTitle: React.FC<{ text: string; variant: 'fade' | 'slide'; className?: string }> = ({ text, variant, className }) => {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slide: {
      initial: { x: -20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
  }

  return (
    <motion.h2
      className={className}
      variants={variants[variant]}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.h2>
  )
}