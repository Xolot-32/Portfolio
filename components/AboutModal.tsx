import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import AnimatedText from './AnimatedText';

interface AboutModalProps {
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-navy-950 bg-opacity-95 backdrop-blur-lg flex items-center justify-center z-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="w-full max-w-3xl bg-gradient-to-br from-navy-900 to-navy-950 rounded-2xl shadow-2xl overflow-hidden border border-teal-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-4">
          <Button
            className="absolute top-4 right-4 p-2 bg-transparent hover:bg-blue-600/20 text-yellow-300"
            variant="ghost"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="flex flex-col items-center mb-1">
            <Image
              src="/perfil.png"
              alt="Tu Nombre"
              width={80}
              height={80}
              className="rounded-full mb-1 border-2 border-yellow-400"
            />
            <AnimatedText
              text="Luis Daniel Duran Xolot"
              className="text-2xl font-serif text-white mb-1"
            />
         
          </div>
          
          <div className="space-y-1 text-gray-300">
          
      
            <p className="leading-relaxed">
              <AnimatedText
                text="Soy egresado del Instituto Politécnico Nacional, especialista en Acúsica y Media Processing con una trayectoria en el ámbito tecnológico que abarca:"
                className="mb-2"
              />
             

              <ul className="list-disc list-inside space-y-1 pl-1">
              <p className="leading-relaxed"></p>
                <li><AnimatedText text="Control de calidad de contenido multimedia." /></li>
                <li><AnimatedText text="Programación de aplicaciones móviles, web y de escritorio." /></li>
                <li><AnimatedText text="Participación en eventos internacionales de ciencia, tecnología y arte." /></li>
                <li><AnimatedText text="Producción, grabación, edición y mezcla de audio." /></li>
              </ul>
            </p>
            <p className="leading-relaxed">
              <AnimatedText
                text="Actualmente, mi enfoque principal es:"
                className="font-medium text-gray-200 mb-1"
              />
              
              <ul className="list-disc list-inside space-y-1 pl-1">
              <p className="leading-relaxed"></p>
                
                <li><AnimatedText text="Investigación y desarrollo sobre el uso responsable de inteligencia artificial en proyectos multimedia." /></li>
                <li><AnimatedText text="Diseño sonoro para videojuegos y cortometrajes." /></li>
                <li><AnimatedText text="Verificación de estándares para distribución de contenido." /></li>
            
              </ul>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutModal;