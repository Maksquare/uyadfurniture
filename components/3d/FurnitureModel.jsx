'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

const DRACO_URL = 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/';

export default function FurnitureModel({ modelPath, customColor }) {
  const { scene } = useGLTF(modelPath, DRACO_URL);
  const modelRef = useRef(null);

  useFrame((state) => {
    if (!modelRef.current) return;
    
    // ✅ FIX: Use state.clock.elapsedTime directly instead of calling getElapsedTime()
    const elapsedTime = state.clock.elapsedTime;
    
    // Stabilized, ultra-smooth interactive float
    modelRef.current.position.y = Math.sin(elapsedTime / 1.8) / 18;
  });

  useEffect(() => {
    if (customColor) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.color.set(customColor);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [customColor, scene]);

  return <primitive ref={modelRef} object={scene} scale={1.2} />;
}