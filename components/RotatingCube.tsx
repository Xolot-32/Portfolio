import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Edges, MeshPortalMaterial, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion-3d'
import { GroupProps, Object3DProps } from '@react-three/fiber'

interface SimpleRotatingBoxProps {
  onInteraction: () => void;
}

const SimpleRotatingBox: React.FC<SimpleRotatingBoxProps> = ({ onInteraction }) => {
  const group = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.rotation.x -= delta * 0.05;
    }
  });

  return (
    <motion.group
      ref={group as React.RefObject<Object3DProps['ref']>}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      position={[0, 0.2, 0]}
      onPointerDown={onInteraction}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#4182e4" />
      </mesh>
    </motion.group>
  );
};

interface SideProps {
  rotation: [number, number, number];
  bg: string;
  children: React.ReactNode;
  index: number;
}

function Side({ rotation, bg, children, index }: SideProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const { nodes } = useGLTF('/aobox-transformed.glb') as any

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x -= delta * 0.3
      mesh.current.rotation.y -= delta * 0.3
    }
  })

  return (
    <MeshPortalMaterial attach={`material-${index}`}>
      <ambientLight intensity={1.5} />
      <Environment preset="studio" />
      <mesh castShadow receiveShadow rotation={new THREE.Euler().fromArray(rotation)}>
        <primitive object={nodes.Cube.geometry} />
        <meshPhysicalMaterial
          color={bg}
          metalness={1.2}
          roughness={0.05}
          envMapIntensity={0.7}
          side={THREE.FrontSide} 
        />
       <pointLight color={bg} intensity={0.5} position={[0, 0, 0]} distance={50} />
      </mesh>
      <mesh castShadow receiveShadow ref={mesh}>
        {children}
        <meshStandardMaterial color={bg} roughness={0.05} metalness={1.4} />
      </mesh>
    </MeshPortalMaterial>
  )
}

interface ComplexRotatingBoxProps {
  onInteractionEnd: () => void;
}

const ComplexRotatingBox: React.FC<ComplexRotatingBoxProps> = ({ onInteractionEnd }) => {
  const group = useRef<GroupProps>(null)
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useFrame((state, delta) => {
    if (group.current && group.current.rotation instanceof THREE.Euler) {
      group.current.rotation.y += delta * 0.2
      group.current.rotation.x -= delta * 0.1
    }
  })

  return (
    <>
      <motion.group
        ref={group as React.RefObject<GroupProps>}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        position={[0, 0.2, 0]}
        onPointerUp={onInteractionEnd}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <Edges color="#000000" lineWidth={0} />
          <Side rotation={[0, 0, 0]} bg="#34A400" index={0}>
            <boxGeometry args={[1]} />
          </Side>
          <Side rotation={[0, Math.PI, 0]} bg="#66660F" index={1}>
            <sphereGeometry args={[0.7]} />
          </Side>
          <Side rotation={[0, Math.PI / 2, Math.PI / 2]} bg="#DE0000" index={2}>
            <tetrahedronGeometry args={[1]} />
          </Side>
          <Side rotation={[0, Math.PI / 2, -Math.PI / 2]} bg="#F0F416" index={3}>
            <octahedronGeometry args={[0.8]} />
          </Side>
          <Side rotation={[0, -Math.PI / 2, 0]} bg="#2A61CA" index={4}>
            <icosahedronGeometry args={[0.8]} />
          </Side>
          <Side rotation={[0, Math.PI / 2, 0]} bg="#9B42D9" index={5}>
            <dodecahedronGeometry args={[0.8]} />
          </Side> 
        </mesh>
      </motion.group>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.6} />
      </mesh>
    </>
  );
};

interface RotatingCubeProps {
  className?: string;
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ className }) => {
  const [isComplex, setIsComplex] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteractionStart = useCallback(() => {
    setIsComplex(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleInteractionEnd = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsComplex(false);
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [6, 0, 6], fov: 25 }}
        style={{
          position: 'absolute',
          top: -60,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        {isComplex ? (
          <ComplexRotatingBox onInteractionEnd={handleInteractionEnd} />
        ) : (
          <SimpleRotatingBox onInteraction={handleInteractionStart} />
        )}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={isComplex}
          enableDamping={true}
          dampingFactor={0.1}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 24}
          maxPolarAngle={Math.PI * 3 / 2}
        />
      </Canvas>
    </div>
  );
};

export default RotatingCube;