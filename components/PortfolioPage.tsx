import React, {memo, useEffect, useState, useCallback, useMemo } from 'react'
import { Skill } from '@/types'
import { SKILLS, TECHNOLOGIES } from '@/constants'
import PortfolioPagePresentation from './PortfolioPagePresentation'
import { motion } from "framer-motion"
import Link from "next/link"
import { NAV_ITEMS } from '@/constants'
import Script from 'next/script'


const MemoizedPortfolioPagePresentation = memo(PortfolioPagePresentation);





const PortfolioPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const [showHomeText, setShowHomeText] = useState(true)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number | null>(null);
  <Script src="https://www.youtube.com/iframe_api" strategy="beforeInteractive" />
      
  

  const handleNextSkill = useCallback(() => {
    setSelectedSkillIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return (prevIndex + 1) % SKILLS.length;
    });
  }, []);
  
  const handlePreviousSkill = useCallback(() => {
    setSelectedSkillIndex((prevIndex) => {
      if (prevIndex === null) return SKILLS.length - 1;
      return (prevIndex - 1 + SKILLS.length) % SKILLS.length;
    });
  }, []);


  const handleScroll = useCallback(() => {
    const sections = ["home", "skills", "portfolio", "technologies", "contact"]
    const scrollPosition = window.scrollY
    setScrollY(scrollPosition)

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
          setActiveSection(section)
          break
        }
      }
    }
  }, [])

  const scrollToSection = useCallback((sectionId: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const message = formData.get('message')
    
    console.log(`Enviando email a ld.duran.x@gmail.com\nDe: ${email}\nMensaje: ${message}`)
    
    e.currentTarget.reset()
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const memoizedNavItems = useMemo(() => {
    const middleIndex = Math.ceil(NAV_ITEMS.length / 2);
    const leftItems = NAV_ITEMS.slice(0, middleIndex);
    const rightItems = NAV_ITEMS.slice(middleIndex);

    const createNavGroup = (items) => (
      <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12">

        {items.map((item) => (
          <motion.div 
            key={item.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              className={`relative flex flex-col items-center justify-center p-2 text-xs sm:text-sm md:text-base font-medium transition-colors duration-200
                ${activeSection === item.href.slice(1)
                  ? 'text-blue-500'
                  : 'text-gray-300 hover:text-yellow-400'
                } uppercase tracking-wider`}
              href={item.href}
              onClick={(e) => scrollToSection(item.href.slice(1), e)}
              aria-current={activeSection === item.href.slice(1) && 'page'}

            >
              <item.icon className="w-6 h-6 mb-1" aria-hidden="true" />
              <span className="hidden sm:inline-block text-[10px] md:text-xs">{item.name}</span>
              {activeSection === item.href.slice(1) && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                  layoutId="underline"
                />
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    );

    return {
      leftNav: createNavGroup(leftItems),
      rightNav: createNavGroup(rightItems)
    };
  }, [activeSection, scrollToSection]);
  

  return (
    <MemoizedPortfolioPagePresentation
      activeSection={activeSection}
      scrollY={scrollY}
      selectedSkill={selectedSkill}
      showHomeText={showHomeText}
      skills={SKILLS}
      technologies={TECHNOLOGIES}
      memoizedNavItems={memoizedNavItems}
      scrollToSection={scrollToSection}
      handleSubmit={handleSubmit}
      setSelectedSkill={setSelectedSkill}
      setShowHomeText={setShowHomeText}
      selectedSkillIndex={selectedSkillIndex}
      setSelectedSkillIndex={setSelectedSkillIndex}
      handleNextSkill={handleNextSkill}
      handlePreviousSkill={handlePreviousSkill}
    />
  )
}

export default PortfolioPage