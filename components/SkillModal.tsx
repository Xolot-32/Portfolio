import React from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedText from './AnimatedText';  
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface SkillModalProps {
  skill: {
    icon: React.ElementType;
    title: string;
    description: string;
    longDescription: string;
    image: string | StaticImageData;
  };
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
 
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose, onNext, onPrevious }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className="w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-gray-500 to-blue-200 rounded-lg blur opacity-90"
            animate={{
              background: [
                "linear-gradient(0deg, #031191, #36409e, #6d708f)",
                "linear-gradient(90deg, #031191, #36409e, #6d708f)",
                "linear-gradient(180deg, #031191, #36409e, #6d708f)",
                "linear-gradient(270deg, #031191, #36409e, #6d708f)",
                "linear-gradient(360deg, #031191, #36409e, #6d708f)",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
            }}
          />
          <Card className="relative text-white shadow-xl border-hidden overflow-hidden">
            <Image
              src={typeof skill.image === 'string' ? skill.image : skill.image.src}
              alt={`Fondo de ${skill.title}`}
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
            <Button
              className="absolute top-2 right-2 p-2 bg-gray-700 opacity-70 hover:bg-yellow-400 text-yellow-400 hover:text-gray-700 z-20"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <X className="h-6 w-6" />
            </Button>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-navy-800 rounded-full mr-4">
                  <skill.icon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-blue-400">{skill.title}</h2>
              </div>
              <AnimatedText 
                text={skill.longDescription}
                className="text-sm text-gray-200 text-center font-mono"
              />
              
              <div className="flex justify-between mt-6">
              <Button
    onClick={(e) => {
      e.stopPropagation();
      onPrevious();
    }}
    className="bg-gray-700 p-2 rounded-full opacity-50 hover:opacity-100 hover:bg-yellow-400 transition-opacity duration-300 focus:outline-none"
    aria-label="Habilidad anterior"
  >
    <ChevronLeft className="w-6 h-6 text-white" />
  </Button>

  <Button
    onClick={(e) => {
      e.stopPropagation();
      onNext();
    }}
    className="bg-gray-700 p-2 rounded-full opacity-50 hover:opacity-100 hover:bg-yellow-400 transition-opacity duration-300 focus:outline-none"
    aria-label="Siguiente habilidad"
  >
    <ChevronRight className="w-6 h-6 text-white" />
  </Button>

              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillModal;