import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Technology {
  name: string
  icon: string
}

interface TechGridProps {
  technologies: Technology[]
}

export default function TechGrid({ technologies }: TechGridProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = {
    mobile: 4,
    tablet: 6,
    desktop: 12
  }
  
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return itemsPerPage.mobile
      if (window.innerWidth < 1024) return itemsPerPage.tablet
      return itemsPerPage.desktop
    }
    return itemsPerPage.desktop
  }

  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(getItemsPerPage())

  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerPage(getItemsPerPage())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = Math.ceil(technologies.length / currentItemsPerPage)

  const handlePagination = (direction: 'left' | 'right') => {
    setCurrentPage(prev => {
      if (direction === 'left') {
        return Math.max(prev - 1, 0)
      } else {
        return Math.min(prev + 1, totalPages - 1)
      }
    })
  }

  const visibleTechnologies = technologies.slice(
    currentPage * currentItemsPerPage,
    (currentPage + 1) * currentItemsPerPage
  )

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {visibleTechnologies.map((tech) => (
            
            <motion.div
              key={tech.name}
              className="flex flex-col items-center justify-center p-4 bg-navy-800 rounded-lg shadow-md"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
           >
              <div className="relative w-16 h-16 mb-2 z-10">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <span className="text-xs text-center text-white mt-2">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePagination('left')}
          className="bg-gray-400 p-2 rounded-full opacity-50 hover:opacity-100 transition-opacity hover:bg-yellow-400 duration-300 focus:outline-none disabled:opacity-30"
          disabled={currentPage === 0}
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={() => handlePagination('right')}
          className="bg-gray-400 p-2 rounded-full opacity-50 hover:opacity-100 transition-opacity hover:bg-yellow-400 duration-300 focus:outline-none disabled:opacity-30"
          disabled={currentPage === totalPages - 1}
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
      
      <div className="mt-4 flex justify-center">
        <div className="bg-gray-600 h-1 w-full max-w-md rounded-full overflow-hidden">
          <div 
            className="bg-yellow-400 h-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
