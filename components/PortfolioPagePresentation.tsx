import React, { memo, useState } from 'react';
import dynamic from 'next/dynamic'
import { motion, useAnimation, useInView, AnimatePresence, useScroll } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skill } from '@/types'
import { Playfair_Display, Montserrat } from 'next/font/google'
import { Instagram, Twitter,Send,Linkedin } from 'lucide-react';
import { portfolioItems, musicLinks } from './PortfolioData';
import AnimatedLogo from './AnimatedLogo';
import { SKILLS } from '@/constants'
import AboutModal from './AboutModal';
import VimeoVideo from './VimeoVideo';
import WebProjectItem from './WebProjectItem';
import ResponsiveTabs from './ResponsiveTabs';
import P5Sketch from './P5Sketch'; 
import MusicPlayer from './MusicPlayer';



// Importaciones dinámicas para componentes pesados
const InteractiveBackground_2 = dynamic(() => import('./InteractiveBackground_2'), { ssr: false })
const TechCarousel = dynamic(() => import('./TechCarousel'), { ssr: false })
const RotatingCube_2 = dynamic(() => import('./RotatingCube_2'), { ssr: false })
const SkillModal = dynamic(() => import('./SkillModal'))
const SectionDivider = dynamic (() => import('./SectionDivider')) 
const AnimatedText = dynamic (() => import('./AnimatedText')) 
const AnimatedTitle = dynamic (() => import('./AnimatedTitle')) 
const AnimatedSection = dynamic (() => import('./AnimatedSection'))
const AnimatedLines = dynamic (() => import('./AnimatedLines'))








const playfair = Playfair_Display({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})
const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' })


const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
    animate={{
      y: [0, 10, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <div className="w-6 h-10 border-2 border-white rounded-full p-1">
      <div className="w-1 h-3 bg-white rounded-full mx-auto" />
    </div>
  </motion.div>
);


interface PortfolioPagePresentationProps {
    activeSection: string
    scrollY: number
    selectedSkill: Skill | null
    showHomeText: boolean
    skills: Skill[]
    technologies: any[] 
    scrollToSection: (sectionId: string, event: React.MouseEvent<HTMLAnchorElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    setSelectedSkill: (skill: Skill | null) => void
    setShowHomeText: (show: boolean) => void
    selectedSkillIndex: number | null;
    setSelectedSkillIndex: (index: number | null) => void;
    handleNextSkill: () => void;
    handlePreviousSkill: () => void;
    memoizedNavItems: {
      leftNav: React.ReactNode;
      rightNav: React.ReactNode;
     
    };
  }
  const PortfolioPagePresentation: React.FC<PortfolioPagePresentationProps> =  ({
    activeSection,
    scrollY,
    selectedSkill,
    showHomeText,
    skills,
    technologies,
    memoizedNavItems,
    scrollToSection,
    handleSubmit,
    setSelectedSkill,
    setShowHomeText,
    selectedSkillIndex,
  setSelectedSkillIndex,
  handleNextSkill,
  handlePreviousSkill,
  }) => {
    const { scrollYProgress } = useScroll()
    const controls = useAnimation()
    const textControls = useAnimation()
  
    const fadeInUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }
  
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }
  
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }
    const [showAbout, setShowAbout] = useState(false);
    
    const tabs = [
      { value: "subtitles", label: "Postproducción y subtitulaje" },
      { value: "soundDesign", label: "Diseño sonoro" },
      { value: "creativeCode", label: "Código Creativo" },
      { value: "music", label: "Música" },
      { value: "pages", label: "Páginas" }
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].value);
  
 
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 bg-opacity-80"
            style={{ 
              scaleX: scrollYProgress,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '5px',
              background: 'bg-gray-800',
              transformOrigin: '50%',
              zIndex: 9999
            }}
          />
          <AnimatePresence>
        {showAbout && (
          <AboutModal onClose={() => setShowAbout(false)} />
        )}
      </AnimatePresence>
    <div className="fixed flex flex-col min-h-screen inset-0 z-0 w-full h-full overflow-hidden">
      
      {/* aqui van los fondos animados */}
    
      <InteractiveBackground_2/>
      
      </div>
      
      <header className="fixed top-0 left-0 right-0  bg-opacity-80 backdrop-blur-sm  z-50">
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <nav className="flex-1 flex justify-center md:space-x-4 sm:justify-start" aria-label="Navegación izquierda">
              {memoizedNavItems.leftNav}
            </nav>
         
            
            <div className="flex-shrink-0 mx-2 sm:mx-4">
  <Link
    href="#"
    onClick={(e) => scrollToSection("home", e)}
    aria-label="Ir al inicio"
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatedLogo />
    </motion.div>
  </Link>
</div>
            
            <nav className="flex-1 flex justify-center md:space-x-4 sm:justify-end" aria-label="Navegación derecha">
              {memoizedNavItems.rightNav}
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 pt-16 relative bg-gray-900 bg-opacity-10 z-10">
        <h1 className="sr-only">Pagina de D'Xolot</h1>
       
        <div className="absolute top-80 left-8 w-full flex mb-2">
        <AnimatedLines />
   
  </div>
       {/* BLueprint---

    
       */}
       
        {/* Home Section */}

        <motion.section 
  id="home"
  className="w-full min-h-screen flex items-center backdrop-blur-sm justify-center py-12 md:py-24 lg:py-32 relative overflow-hidden"
  aria-labelledby="home-title"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }}
  transition={{ duration: 0.5 }}
  onMouseDown={() => setShowHomeText(false)}
  onMouseUp={() => setShowHomeText(true)}
  onMouseLeave={() => setShowHomeText(true)}
  onTouchStart={() => setShowHomeText(false)}
  onTouchEnd={() => setShowHomeText(true)}
>
  
  
  {/* Elementos decorativos
  
  
  
  */}
  <motion.div 
  className="absolute inset-0 z-0"
  initial={{ opacity: 0, scale: 0.9, y: -20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ 
    duration: 1.5, 
    ease: "easeOut",
    delay: 0.5,
    opacity: { duration: 2 },
    scale: { duration: 1.8, ease: "easeInOut" },
    y: { duration: 1.2, ease: "easeOut" }
  }}
>
  <motion.div
  >
    <RotatingCube_2 className='items-center space-y-4 sm:space-y-0 sm:space-x-8' />
  </motion.div>
</motion.div>
  
  <motion.div 
    className="absolute top-10 left-8 text-4xl"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 0.5, x: 0 }}
    transition={{ delay: 1 }}
  >

  </motion.div>

  

  {/* Indicador de desplazamiento */}
  <ScrollIndicator />
  {/* Número de sección */}
  
 
 
  <motion.div 
    className="absolute top-80 left-8 text-4xl font-bold text-white opacity-60"
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 0.5, x: 0 }}
    transition={{ delay: 1 }}
  >
   
   <AnimatedText 
                text={'01'}
                className="text-xl text-gray-200 text-center font-mono"
              />
  

  </motion.div>


  <AnimatePresence>
    {showHomeText && (
      <motion.div 
        className="absolute inset-x-0 bottom-1/4 z-10 w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="mx-auto max-w-4xl items-center space-y-4 text-center"
            animate={textControls}
          >
            <div className="text-center p-1">
              <motion.p
                className={`${montserrat.className} text-gray-200 text-sm md:text-base uppercase tracking-widest mb-2`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Multimedia Engineer
              </motion.p>
              <motion.h1 
                className={`${playfair.className} uppercase mx-auto text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white`}
                style={{ 
                  WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                  textShadow: "0 0 20px rgba(255,255,255,0.5)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Daniel Xolot
              </motion.h1>
              <motion.p 
                className={`${montserrat.className} uppercase mx-auto max-w-[700px] text-yellow-400 text-sm md:text-base tracking-widest mt-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                Digital Content Quality Assurance
                
              </motion.p>
              <motion.div 
                className="mt-8 flex space-x-4 justify-center flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
>
              <Link href="/LDDX_CV_2024.pdf" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 mb-2 sm:mb-0"
                >
                  Ver CV
                </Button>
              </Link>
              <Link href="https://wa.me/5538756511" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition-all duration-300 mb-2 sm:mb-0"
                >
                  <Send className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
              </Link>
              <motion.div>
          
            <Button
                variant="outline"
                className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-gray-900 transition-all duration-300 mb-2 sm:mb-0"
                onClick={() => setShowAbout(true)}

              >
                Sobre mi
              </Button>
             
            </motion.div>
              
            </motion.div>
            
            </div>
          </motion.div>


        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.section>

<SectionDivider
 filter="invert(90%) contrast(200%) brightness(100%) hue-rotate(66deg)" />



<AnimatedLines />
<motion.section
          id="skills"
          className="w-full min-h-screen flex items-center backdrop-blur-sm justify-center py-24 md:py-24 lg:py-32 relative overflow-hidden"
          aria-labelledby="skills-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.5 }}
        >
          
        <div className="container mx-auto px-8 md:px-6">
       
        
        <AnimatedSection id="skills">
        <AnimatedTitle
        text="S k i l l s"
        variant="fade"
        className={`${playfair.className} text-3xl text-gray-300 opacity-80 font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center text-white`}
     
        
      />
      </AnimatedSection>
     

          <motion.div
            className="fixedcols grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
            variants={containerVariants}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="aspect-auto"
                variants={itemVariants}
                onClick={() => setSelectedSkillIndex(index)}
              >
                <motion.div
                 className="relative group h-full"
                 initial="rest"
                 animate="rest"
    
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => setSelectedSkill(skill)}
                  aria-haspopup="dialog"

                >
        <Card className="h-full bg-navy-800 hover:bg-navy-900 transition-colors duration-300 bg-opacity-70 cursor-pointer border border-blue-500/20">
                  <CardContent className="flex flex-col items-center justify-between p-6 h-full">
                <motion.div
                className='mb-4'
                        animate={{
                          scale: [1, 1.2, 1],
                          transition: {
                            duration: 2,
                            repeat: 3,
                            repeatType: "reverse",
                          },
                        }}
                      >
                        
                        <div className="relative bg-navy-900 hover:bg-gray-900 rounded-full p-2 flex items-center justify-center">
        <skill.icon className="h-12 w-12 text-blue-500 group-hover:text-yellow-400  transition-colors duration-900" aria-hidden="true"/>
      </div>
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-200 mb-2 text-center">{skill.title}</h3>
                     
                      <AnimatedText
                    text={skill.description}
                    className="text-lg text-blue-500 hover:text-yellow-400 text-center font-serif"
                  />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
      {selectedSkillIndex !== null && (
      <SkillModal
        skill={SKILLS[selectedSkillIndex]}
        onClose={() => setSelectedSkillIndex(null)}
        onNext={handleNextSkill}
        onPrevious={handlePreviousSkill}
      />
    )}

      </AnimatePresence>


      <SectionDivider
 filter="invert(90%) contrast(200%) brightness(100%) hue-rotate(66deg)" />


<AnimatedLines />
<motion.section
      id="portfolio"
      className="w-full min-h-screen flex items-center backdrop-blur-sm justify-center py-24 md:py-24 lg:py-32 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection id="portfolio">
          <AnimatedTitle
            text="P o r t a f o l i o"
            variant="fade"
            className={`${playfair.className} text-3xl opacity-80 text-gray-300 font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center text-white`}
          />
        </AnimatedSection>
  
        <Tabs value={activeTab} className="w-full">
          <ResponsiveTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          <TabsContent value="subtitles">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.subtitles.map((item, index) => (
                <VimeoVideo
                  key={index}
                  videoId={item.videoId}
                  title={item.title}
                  description={item.description}
                  logoSrc={item.logoSrc}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="soundDesign">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.soundDesign.map((item, index) => (
                <VimeoVideo
                  key={index}
                  videoId={item.videoId}
                  title={item.title}
                  description={item.description}
                  logoSrc={item.logoSrc}
                  
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creativeCode">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.creativeCode.map((item, index) => (
            <P5Sketch
              key={index}
              src={item.src}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </TabsContent>

          <TabsContent value="music">
          <MusicPlayer 
  songs={portfolioItems.music}
  sunoLink={musicLinks.suno}
  soundcloudLink={musicLinks.soundcloud}
  udioLink={musicLinks.udio}
/>
      </TabsContent>

          <TabsContent value="pages">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.pages.map((item, index) => (
                <WebProjectItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  projectUrl={item.projectUrl}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.section>
<SectionDivider filter="invert(90%) contrast(200%) brightness(100%) hue-rotate(66deg)" />
<AnimatedLines />
        <motion.section
         id="technologies"
         className="w-full min-h-screen flex items-center backdrop-blur-sm justify-center py-24 md:py-24 lg:py-32 relative overflow-hidden"
         initial="hidden"
       whileInView="visible"
       viewport={{ once: true, margin: "-100px" }}
       variants={{
         hidden: { opacity: 0 },
         visible: { opacity: 1 },
       }}
       transition={{ duration: 0.5 }}
       >
         <div className="container mx-auto px-4 md:px-6 z-10">
         
         <AnimatedSection id="tecnologies">
         <AnimatedTitle
         text="Tecnologías"
         variant="fade"
         className={`${playfair.className} text-3xl text-gray-300 opacity-80 font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center text-white`}
        />
       </AnimatedSection>
       
          <TechCarousel technologies={technologies} />
        
   
        </div>
      </motion.section>
      
      <SectionDivider filter="invert(90%) contrast(200%) brightness(100%) hue-rotate(66deg)" />
      <AnimatedLines />

        <motion.section
  id="contact"
  className="w-full min-h-screen flex flex-grow items-center justify-center backdrop-blur-sm py-1 md:py-1 lg:py-4 relative overflow-hidden"
  aria-labelledby="contact-title"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }}
  transition={{ duration: 2 }}
>

<div className="container px-4 md:px-6 py-2 flex-grow flex flex-col items-center justify-start">
    <AnimatedSection id="contact">
      <AnimatedTitle
        text="C o n t a c t o"
        variant="slide"
        className={`${playfair.className} text-3xl text-gray-300 opacity-70 font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center text-white`}
        />

</AnimatedSection>
    <Card className="max-w-md w-full ">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Tu correo electrónico
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="tu@email.com"
                      required
                      className="mt-1"
                      aria-describedby="email-error"
                    />
                     <p id="email-error" className="mt-2 text-sm text-red-600 hidden">
                      Por favor, introduce un correo electrónico válido.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Escribe tu mensaje aquí..."
                      required
                      className="mt-1"
                      aria-describedby="message-error"
                    />
                    <p id="message-error" className="mt-2 text-sm text-red-600 hidden">
                      Por favor, introduce un mensaje.
                    </p>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600">
                    Fuera de servicio...
                  
                  </Button>
                </form>

                <div className="relative space-x-8 p-8 justify-center  tooltip">
                <Link href="https://t.me/DanielXolot" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 mb-2 sm:mb-0"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Telegram
                </Button>
              </Link>
            </div>

              </CardContent>
              
            </Card>
           
         </div>

        </motion.section>
      

      </main>
      <motion.footer
    className="w-full py-3 bg-[#040b1f] text-white border-t border-gray-800 z-10"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          
          <div className="relative mr-4 tooltip">
          <Link href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </Link>
            <span className="tooltip-text">Instagram</span>
          </div>

          <div className="flex ">
          <div className="relative mr-4 tooltip">
            <Link href="https://x.com/d_xolot?t=gzP-0aUif4YwuBxXUA1qBQ&s=09" aria-label="Twitter">
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </Link>
            <span className="tooltip-text">X</span>
            </div>

            <div className="relative mr-4 tooltip">
            <Link href="https://www.linkedin.com/in/daniel-duran-xolot-0a986b177?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" aria-label="Linkedin">
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </Link>
            <span className="tooltip-text">Linkedin</span>
            </div>
            
            <div className="relative  tooltip">
            <Link href="https://t.me/DanielXolot" aria-label="Telegram">
              <Send className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </Link>
            <span className="tooltip-text">Telegram</span>
            </div>
          
          </div>
        </div>
        
        
        
        <p className="text-xs text-gray-500">
          2024 COPYRIGHT | DANIEL XOLOT | ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
  </motion.footer>
    </div>
  )
    }

export default PortfolioPagePresentation