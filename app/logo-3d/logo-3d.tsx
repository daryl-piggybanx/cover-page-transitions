import LogoGlass from "~/components/logo";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

export default function Logo3D() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
    <Suspense fallback={<div className="text-white">Loading 3D model...</div>}>
    <Canvas 
    camera={{ position: [0, 0, 20], fov: 45, rotation: [Math.PI / 12, 0, 0] }}
    shadows
    >
      {/* <ambientLight intensity={0.5} /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      <directionalLight position={[10, 10, 10]} intensity={10} />
      <LogoGlass position={[0, 0, 0]} rotation={[0, -0.1, 0]} scale={1} />
      <OrbitControls />
    </Canvas>
    </Suspense>
    </div>
  );
}