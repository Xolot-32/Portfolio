import React, { ReactNode, ReactElement } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedSectionProps<T> {
  children: ReactElement<T> | ReactElement<T>[]
  id: string
}

function AnimatedSection<T extends { isVisible?: boolean }>({ children, id }: AnimatedSectionProps<T>) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center"
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...child.props, isVisible: isInView })
        }
        return child
      })}
    </motion.section>
  )
}

export default AnimatedSection