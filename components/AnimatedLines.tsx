import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 0.5,
    transition: {
      pathLength: { delay: i * 0.05, type: "spring", duration: 1.5, bounce: 0 },
      opacity: { delay: i * 0.05, duration: 0.01 }
    }
  })
};

const AnimatedLines: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [lines, setLines] = useState<Line[]>([]);
  const [isReady, setIsReady] = useState(false);
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const newLines: Line[] = [];
      const gridSize = 50;
      
      // Líneas horizontales
      for (let y = 0; y < dimensions.height; y += gridSize) {
        newLines.push({ x1: 0, y1: y, x2: dimensions.width, y2: y });
      }
      
      // Líneas verticales
      for (let x = 0; x < dimensions.width; x += gridSize) {
        newLines.push({ x1: x, y1: 0, x2: x, y2: dimensions.height });
      }
      
      setLines(newLines);
      setIsReady(true);
    }
  }, [dimensions]);

  useEffect(() => {
    if (!isReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, isReady]);

  if (!isReady) return null;

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        initial="hidden"
        animate={controls}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      >
        {lines.map((line, index) => (
          <motion.line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#4182e4"
            strokeWidth="1"
            variants={draw}
            custom={index * 0.01}
          />
        ))}
      </motion.svg>
    </div>
  );
}

export default AnimatedLines;