'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

export default function SceneCanvas({ children, autoRotate = false }) {
  return (
    <motion.div
      className="relative z-20 h-full min-h-[350px] w-full md:min-h-[500px]"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
    >
      <Canvas dpr={[1, 2]} camera={{ fov: 40, position: [0, 0, 4.5] }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.0} />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} />
        <pointLight position={[0, -3, 2]} intensity={0.4} />
        <Environment preset="apartment" />
        <fog attach="fog" args={['#f8f5f0', 10, 30]} />
        <Suspense fallback={null}>
          <group position={[0, -0.2, 0]}>{children}</group>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate={autoRotate} autoRotateSpeed={1.0} enableDamping={true} dampingFactor={0.04} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </motion.div>
  );
}