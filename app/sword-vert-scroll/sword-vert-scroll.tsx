import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import SwordVertScrollScene from "../components/scenes/sword-vert-scroll";
import Sword from "~/components/sword";
import { Environment, PerspectiveCamera, Text } from "@react-three/drei";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { motion, useScroll, useTransform, useMotionValueEvent, useInView, useMotionValue, useSpring  } from "motion/react";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SwordVertScroll() {
    const [key, setKey] = useState(0)
    const mainRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<HTMLDivElement>(null)


    // useGSAP(() => {
    //     if (!mainRef.current || !sceneRef.current) return

    //     const tl = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: mainRef.current,
    //             start: "top top",
    //             end: "bottom bottom",
    //             scrub: true,
    //             onUpdate: (self) => {
    //                 console.log('Scroll progress:', self.progress)
    //             }
    //         }
    //     })
        
    //     // Oscillate from center to left, then to right, then back to center
    //     tl.to(sceneRef.current, {
    //         x: '-25vw',
    //         ease: "none",
    //         duration: 1
    //     })
    //     .to(sceneRef.current, {
    //         x: '25vw',
    //         ease: "none",
    //         duration: 2
    //     })
    //     .to(sceneRef.current, {
    //         x: '0vw',
    //         ease: "none",
    //         duration: 1
    //     })
    // }, { scope: mainRef })

  return (
    <main ref={mainRef} className="overflow-x-hidden bg-[#191919]">
      <Suspense
        fallback={
          <div className="fixed inset-0 grid place-items-center bg-black text-white">
            Loading...
          </div>
        }
      >
        <section className="relative grid place-items-center h-screen">
          <p className="text-white text-center absolute top-[5%] mx-4 w-fit text-8xl font-bold">
            BANXCALIBUR
          </p>
          <p className="text-white text-center absolute bottom-[5%] mx-4 w-fit text-5xl font-bold">
            KNIGHTS OF THE ROUND TABLE
          </p>

          <div ref={sceneRef} className="fixed top-0 left-0 h-screen w-screen text-white pointer-events-none">
            <Canvas 
            key={key}
            gl={{ 
                preserveDrawingBuffer: false,
                powerPreference: "default", // Use less aggressive GPU mode
                antialias: false,
                alpha: true,
                stencil: false,
                depth: true
            }}
            >
                <PerspectiveCamera makeDefault position={[0, 1, 10]} fov={45} near={0.1} far={1000} />
                <ambientLight intensity={0.3} />
                {/* <Environment preset="studio" /> */}
                <directionalLight position={[10, 10, 5]} intensity={1} />
                {/* Front light */}
                <spotLight 
                  position={[0, 5, 15]} 
                  target-position={[0, 5, 0]}
                  intensity={150}
                  angle={Math.PI / 3}
                  penumbra={0.5}
                  distance={0}
                  castShadow
                />
                {/* Back light */}
                <spotLight 
                  position={[0, 5, -15]} 
                  target-position={[0, 5, 0]}
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
                <Sword 
                  position={[0, -1, 5]} 
                  rotation={[0, -0.1, 0]} 
                  scale={5} 
                  rotationSpeed={0.2}
                />
            </Canvas>
          </div>
        </section>

        <section className=" relative flex items-center justify-evenly h-sc">
          <p className="w-[50%] border-0 border-red-700"></p>

          <p className="text-white w-[50%] text-center px-4 text-4xl font-semibold">
            Effortlessly scroll, zoom, and navigate with the re-engineered
            Digital Crown, now more precise than ever.
          </p>
        </section>

        <section className=" relative flex items-center justify-evenly h-screen">
          <p className="text-white order-1 w-[50%] text-center px-4 text-4xl font-semibold">
            Built for adventure, the rugged straps are as tough as you are,
            ready for any challenge.
          </p>
          <p className="w-[50%] order-2"></p>
        </section>

        <section className=" relative flex items-center justify-evenly h-screen">
          <p className="w-[50%] border-0 border-red-700"></p>

          <p className="text-white w-[50%] text-center px-4 text-4xl font-semibold">
            The brightest display ever on an Apple Watch, so you can see it
            clearly even under the harshest sun.
          </p>
        </section>
      </Suspense>
    </main>
  )
}