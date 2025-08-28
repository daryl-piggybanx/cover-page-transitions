
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useState, useEffect } from "react";
import { OrbitControls, Text } from "@react-three/drei";

import Sword from "~/components/sword";
import AcrylicCase from "~/components/acrylic-case";
import FoggedGlassBolt from "~/components/fogged-glass-bolt";
import MetalBolt from "~/components/metal-bolt";

export default function AcrylicCase3D() {
  const [key, setKey] = useState(0)

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <Suspense fallback={<div className="text-white">Loading 3D model...</div>}>
        <Canvas 
          key={key}
          camera={{ position: [0, 5, 10], fov: 45 }}
          gl={{ 
            preserveDrawingBuffer: false,
            powerPreference: "default", // Use less aggressive GPU mode
            antialias: false,
            alpha: true,
            stencil: false,
            depth: true
          }}
        >
          <Text color="black" anchorX="center" anchorY="middle" position={[0, 1, 0]}>
            hello world!
          </Text>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
                {/* Front light */}
                <spotLight 
                  position={[0, 0, 15]} 
                  target-position={[0, 0, 0]}
                  intensity={150}
                  angle={Math.PI / 3}
                  penumbra={0.5}
                  distance={0}
                  castShadow
                />
                {/* Back light */}
                <spotLight 
                  position={[0, 0, -15]} 
                  target-position={[0, 0, 0]}
                  intensity={100}
                  angle={Math.PI / 3}
                  penumbra={0.5}
                  distance={0}
                />
                {/* Side lights */}
                <spotLight 
                  position={[15, 0, 0]} 
                  target-position={[0, 0, 0]}
                  intensity={75}
                  angle={Math.PI / 3}
                  penumbra={0.5}
                  distance={0}
                />
                <spotLight 
                  position={[-15, 0, 0]} 
                  target-position={[0, 0, 0]}
                  intensity={75}
                  angle={Math.PI / 3}
                  penumbra={0.5}
                  distance={0}
                />
          <MetalBolt />
          <OrbitControls enableDamping={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
