'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function BotHead() {
  const headRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.3;
      headRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
    }
  });

  return (
    <group>
      {/* Antenna */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1} />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.1, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.5]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.3}
          emissive="#10b981"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.15, 0.26]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.15, 1.15, 0.26]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
      </mesh>

      {/* Mouth (LED strip) */}
      <mesh position={[0, 0.95, 0.26]}>
        <boxGeometry args={[0.2, 0.03, 0.02]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
      </mesh>

      {/* Glow */}
      <pointLight ref={glowRef} position={[0, 1.1, 0.8]} color="#10b981" intensity={1} distance={3} />
    </group>
  );
}

function BotBody() {
  return (
    <group>
      {/* Neck */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.2]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.35]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.7}
          roughness={0.3}
          emissive="#10b981"
          emissiveIntensity={0.03}
        />
      </mesh>

      {/* Chest LED */}
      <mesh position={[0, 0.5, 0.18]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1} />
      </mesh>

      {/* Vent lines */}
      {[-0.12, 0, 0.12].map((x, i) => (
        <mesh key={i} position={[x, 0.3, 0.18]}>
          <boxGeometry args={[0.08, 0.01, 0.01]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function BotArms() {
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const swing = Math.sin(clock.getElapsedTime() * 0.8) * 0.2;
    if (leftArmRef.current) leftArmRef.current.rotation.z = swing;
    if (rightArmRef.current) rightArmRef.current.rotation.z = -swing;
  });

  return (
    <group>
      {/* Left arm */}
      <group position={[-0.4, 0.6, 0]}>
        <mesh ref={leftArmRef} position={[-0.15, -0.2, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.15, -0.45, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Right arm */}
      <group position={[0.4, 0.6, 0]}>
        <mesh ref={rightArmRef} position={[0.15, -0.2, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.15, -0.45, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function BotScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#10b981" />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group scale={1.8} position={[0, -0.2, 0]}>
          <BotHead />
          <BotBody />
          <BotArms />
        </group>
      </Float>

      {/* Ground ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <ringGeometry args={[0.6, 0.75, 64]} />
        <meshStandardMaterial
          color="#10b981"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export default function ThreeDModel() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <BotScene />
      </Canvas>
    </div>
  );
}
