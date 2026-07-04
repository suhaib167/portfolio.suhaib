'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function ESP32Model() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  // Using a basic geometry as placeholder since we don't have the actual GLB
  return (
    <group ref={meshRef}>
      {/* PCB board */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2, 1.2, 0.08]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* ESP32 chip */}
      <mesh position={[0, 0.2, 0.05]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.06]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0.8, 0.5, 0.06]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.8, 0.05, 0.02]} />
        <meshStandardMaterial color="#c0a060" metalness={1} roughness={0.2} />
      </mesh>
      {/* GPIO pins */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-0.8 + i * 0.16, -0.65, 0.05]}>
          <boxGeometry args={[0.06, 0.15, 0.06]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.3} />
        </mesh>
      ))}
      {/* LED */}
      <mesh position={[0.4, 0.55, 0.06]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function FallbackModel() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#34d399" wireframe />
    </mesh>
  );
}

export function ThreeDModel() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} shadows dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <pointLight position={[-3, 3, 3]} intensity={0.6} color="#34d399" />
        <Suspense fallback={<FallbackModel />}>
          <ESP32Model />
        </Suspense>
        <Environment preset="city" />
        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
          far={1}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}