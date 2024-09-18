import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const createLines = useCallback((width: number, height: number) => {
    const newLines: Line[] = [];
    const gridSize = 50;
    
    for (let y = 0; y < height; y += gridSize) {
      newLines.push({ x1: 0, y1: y, x2: width, y2: y });
    }
    
    for (let x = 0; x < width; x += gridSize) {
      newLines.push({ x1: x, y1: 0, x2: x, y2: height });
    }
    
    return newLines;
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setLines(createLines(dimensions.width, dimensions.height));
      setIsReady(true);
    }
  }, [dimensions, createLines]);

  useEffect(() => {
    if (!isReady || !ref.current) return;

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

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
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