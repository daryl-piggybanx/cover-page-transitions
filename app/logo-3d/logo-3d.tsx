
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, SoftShadows, Stats } from "@react-three/drei";
import { useRef } from "react";

import LogoGlass from "~/components/logo";
import AcrylicCase from "~/components/acrylic-case";
import Sword from "~/components/sword";
import FoggedGlassBolt from "~/components/fogged-glass-bolt";
import type { DirectionalLight } from "three";
import { useControls } from 'leva'

import MetalBolt from "~/components/metal-bolt";

export default function Logo3D() {
  const lightRef = useRef<DirectionalLight>(null!)
  
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
    <Suspense fallback={<div className="text-white">Loading 3D model...</div>}>
    <h1 className="text-black text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      Hello
    </h1>
    <Canvas 
    shadows="basic" 
    camera={{ position: [0, 0, 20], fov: 45, rotation: [Math.PI / 12, 0, 0] }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight 
        ref={lightRef}
        position={[10, 10, 10]} 
        target-position={[0, 0, 0]}
        intensity={8}
        castShadow
      />
      <directionalLight
        position={[-10, 10, -10]} 
        target-position={[0, 0, 0]}
        intensity={8}
        castShadow
      />
      <FoggedGlassBolt position={[0, 0, 0]} rotation={[0, -0.1, 0]} scale={1} useDeviceControl={true} />
      <SoftShadows samples={25} />
      <OrbitControls />
    </Canvas>
    </Suspense>
    </div>
  );
}