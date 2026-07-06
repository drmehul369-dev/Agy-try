"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DnaHologram() {
  const pointsRef1 = useRef<THREE.Points>(null);
  const pointsRef2 = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate DNA coordinates
  const { positions1, positions2, connections } = useMemo(() => {
    const count = 100;
    const pos1 = new Float32Array(count * 3);
    const pos2 = new Float32Array(count * 3);
    const lineCoords: number[] = [];

    const radius = 1.8;
    const height = 6;
    const turns = 4;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * height - height / 2;
      const angle = (i / count) * turns * Math.PI * 2;

      // Strand 1
      const x1 = radius * Math.cos(angle);
      const z1 = radius * Math.sin(angle);
      pos1[i * 3] = x1;
      pos1[i * 3 + 1] = t;
      pos1[i * 3 + 2] = z1;

      // Strand 2 (180 deg phase shift)
      const x2 = radius * Math.cos(angle + Math.PI);
      const z2 = radius * Math.sin(angle + Math.PI);
      pos2[i * 3] = x2;
      pos2[i * 3 + 1] = t;
      pos2[i * 3 + 2] = z2;

      // Base pairs (every 4th element to not overcrowd)
      if (i % 3 === 0) {
        lineCoords.push(x1, t, z1);
        lineCoords.push(x2, t, z2);
      }
    }

    return {
      positions1: pos1,
      positions2: pos2,
      connections: new Float32Array(lineCoords),
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotSpeed = 0.25;

    if (pointsRef1.current) {
      pointsRef1.current.rotation.y = time * rotSpeed;
    }
    if (pointsRef2.current) {
      pointsRef2.current.rotation.y = time * rotSpeed;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time * rotSpeed;
    }
  });

  return (
    <group scale={[1, 1, 1]}>
      {/* Strand 1 points */}
      <points ref={pointsRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions1, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          color="#4F8CFF"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Strand 2 points */}
      <points ref={pointsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions2, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          color="#00E5A8"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Base pair connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4F8CFF"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sz[i] = Math.random() * 0.05 + 0.02;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.03;
      pointsRef.current.rotation.x = time * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#ffffff"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HologramScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4F8CFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E5A8" />
        <DnaHologram />
        <ParticleField />
      </Canvas>
    </div>
  );
}
