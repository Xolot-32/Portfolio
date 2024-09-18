import * as THREE from 'three'
import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, Environment } from '@react-three/drei'
import { randFloat } from 'three/src/math/MathUtils';

interface FloatingSphereProps {
  index: number;
  z: number;
  speed: number;
}

const FloatingSphere: React.FC<FloatingSphereProps> = ({ index, z, speed }) => {
  const ref = useRef<THREE.Mesh>(null)
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])

  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 2),
    x: THREE.MathUtils.randFloatSpread(2),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI
  })

  useFrame((state, dt) => {
    if (ref.current && dt < 0.1) {
      ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
      ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
      if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
    }
  })

  return (
    <Sphere ref={ref} args={[0.14]}>
      <meshStandardMaterial color="gray" emissive="#4F46E5" emissiveIntensity={1} roughness={0.5} />
    </Sphere>
  )
}

interface DynamicBackgroundProps {
  speed?: number;
  count?: number;
  depth?: number;
  scrollY?: number;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ speed = 1, count = 80, depth = 80, scrollY = 0 }) => {
    const spheres = useMemo(() => {
      return Array.from({ length: count }, (_, i) => {
        const z = Math.round(Math.sqrt(0.5 - Math.pow(i / count - 1, 2)) * depth)
        return <FloatingSphere key={i} index={i} z={z} speed={speed + scrollY * 0.002} />
      })
    }, [count, depth, speed, scrollY])
  
    return (
      <Canvas
        className="absolute inset-0 z-0 "
        style={{ mixBlendMode: 'screen' }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 20, near: 0.1, far: depth + 15 }}
      >
        <color attach="white" args={['rgba(0,0,0,0)']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={1} />
        {spheres}
        <Environment preset="studio" />
      </Canvas>
    )
  }
  


export default DynamicBackground