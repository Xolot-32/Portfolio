import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mesh, SphereGeometry, MeshPhongMaterial } from 'three';
import { randFloat, randInt } from 'three/src/math/MathUtils';


const AnimatedSphere = () => {
  const meshRef = useRef<Mesh>(null!);
  const { viewport } = useThree();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotación
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      // Interpolación del movimiento del mouse
      const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
      const smoothFactor = 0.1; // Controla la suavidad del movimiento
      meshRef.current.position.x = lerp(meshRef.current.position.x, mousePosition.x * viewport.width / 2, smoothFactor);
      meshRef.current.position.y = lerp(meshRef.current.position.y, mousePosition.y * viewport.height / 2, smoothFactor);

      // Cambiar tamaño según el scroll
      const scrollFactor = 0.5 + scrollY * 0.0005;
      meshRef.current.scale.setScalar(scrollFactor);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 6]} />
      <meshPhongMaterial color="#FFFF00" wireframe />
    </mesh>
  );
};

const InteractiveBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 ">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
};

export default InteractiveBackground;
