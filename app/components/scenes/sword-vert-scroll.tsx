import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'
import Sword from '../sword'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

export default function SwordVertScrollScene() {
    return (
        <>
            <Environment preset="city" />
            <ambientLight intensity={0.3} />
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
          <Sword position={[0, 0, 0]} rotation={[0, -0.1, 0]} scale={5} />
          {/* <OrbitControls enableDamping={false} /> */}
        </>
    )
}