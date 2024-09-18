import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Edges, MeshPortalMaterial, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

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
      mesh.current.rotation.x += delta * 0.5
      mesh.current.rotation.y += delta * 0.5
    }
  })

  return (
    <MeshPortalMaterial attach={`material-${index}`}>
      <ambientLight intensity={0.5} />
      <Environment preset="lobby" />
      <mesh castShadow receiveShadow rotation={new THREE.Euler().fromArray(rotation)}>
        <primitive object={nodes.Cube.geometry} />
        <meshStandardMaterial aoMapIntensity={1} aoMap={nodes.Cube.material.aoMap} color={bg} />
        <pointLight color={bg} intensity={2} position={[0, 0, 0]} distance={2} />
      </mesh>
      <mesh castShadow receiveShadow ref={mesh}>
        {children}
        <meshStandardMaterial color={bg} roughness={0.2} metalness={0.8} />
      </mesh>
    </MeshPortalMaterial>
  )
}
function RotatingBox() {
    const group = useRef<THREE.Group>(null)
  
    useFrame((state, delta) => {
      if (group.current) {
        group.current.rotation.y -= delta * 0.5
        group.current.rotation.x -= delta * 0.5
      }
    })
  
    return (
      <group ref={group}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <Edges />
          <Side rotation={[0, 0, 0]} bg="#ff7700" index={0}>
            <torusGeometry args={[0.65, 0.3, 64]} />
          </Side>
          <Side rotation={[0, Math.PI, 0]} bg="#00aaff" index={1}>
            <torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
          </Side>
          <Side rotation={[0, Math.PI / 2, Math.PI / 2]} bg="#22dd88" index={2}>
            <boxGeometry args={[1.15, 1.15, 1.15]} />
          </Side>
          <Side rotation={[0, Math.PI / 2, -Math.PI / 2]} bg="#00ffcc" index={3}>
            <octahedronGeometry />
          </Side>
          <Side rotation={[0, -Math.PI / 2, 0]} bg="#ff4444" index={4}>
            <icosahedronGeometry />
          </Side>
          <Side rotation={[0, Math.PI / 2, 0]} bg="#ff69b4" index={5}>
            <dodecahedronGeometry />
          </Side>
        </mesh>
      </group>
    )
  }
  
  interface RotatingCubeProps {
    className?: string;
  }
  
  const RotatingCube: React.FC<RotatingCubeProps> = ({ className }) => {
    return (
      <div className={`w-16 h-16 ${className}`}>
        <Canvas
          shadows
          camera={{ position: [-3, 4, 5], fov: 50 }}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
        
          <fog attach="fog" args={['#070710', 5, 18]} />
          <ambientLight intensity={0.2} />
          <RotatingBox />
         
        </Canvas>
      </div>
    )
  }
  
  export default RotatingCube