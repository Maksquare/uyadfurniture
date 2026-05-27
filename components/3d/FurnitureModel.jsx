'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const DRACO_URL = 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/';

export default function FurnitureModel({ modelPath, customColor }) {
  const { scene } = useGLTF(modelPath, DRACO_URL);
  const modelRef = useRef(null);
  const targetColor = useRef(new THREE.Color(customColor));
  const currentColor = useRef(new THREE.Color(customColor));

  useEffect(() => {
    if (customColor) targetColor.current.set(customColor);
  }, [customColor]);

  useFrame((state) => {
    if (!modelRef.current) return;
    const t = state.clock.elapsedTime;
    modelRef.current.position.y = Math.sin(t / 1.8) / 18;
    modelRef.current.rotation.y += 0.0008;
    currentColor.current.lerp(targetColor.current, 0.06);
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.color.copy(currentColor.current);
        child.material.needsUpdate = true;
      }
    });
  });

  return <primitive ref={modelRef} object={scene} scale={1.2} />;
}