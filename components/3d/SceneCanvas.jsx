'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

export default function SceneCanvas({ children, autoRotate = false }) {
  return (
    <div className="relative z-20 h-full min-h-[350px] w-full md:min-h-[500px]">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ fov: 40, position: [0, 0, 4.5] }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
      >
        {/* Soft atmospheric lighting wrapper */}
        <ambientLight intensity={0.8} />
        
        {/* Directional Key Lights ensuring crisp definition without hard flickering floor shadows */}
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        <pointLight position={[0, -3, 2]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <group position={[0, -0.2, 0]}>
            {children}
          </group>
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          autoRotate={autoRotate}
          autoRotateSpeed={1.0}
          enableDamping={true} // Makes drag rotations incredibly buttery smooth
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 1.8} 
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}