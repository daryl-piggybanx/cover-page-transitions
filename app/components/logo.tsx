
import React, { useRef } from 'react'
import { useGLTF, MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import { Group, Mesh, SpotLight, TextureLoader } from 'three'
import type { ThreeElements, useLoader } from '@react-three/fiber'

type ModelProps = ThreeElements['group'] & {
  position?: [number, number, number]
  rotation?: [number, number, number]
  useDeviceControl?: boolean
}
export default function LogoGlass(props: ModelProps) {
  const group = useRef<Group>(null!)
  const light = useRef<SpotLight>(null!)
  const mesh = useRef<Mesh>(null!)
  const { nodes, materials } = useGLTF('/model/logo-glass-optimized.glb')
  
  console.log('nodes', nodes)
  console.log('materials', materials)
  
  // object notation for texture loading as recommended in 
  // https://r3f.docs.pmnd.rs/tutorials/loading-textures#using-usetexture
  const textureProps = useTexture({
    map: '/texture/penny-copper.png'
  })
  
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Bolt as Mesh).geometry}
        position={[0, 3.216, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.446}
      >
        <meshStandardMaterial 
          {...textureProps}
          metalness={0.8}
          roughness={0.2}
          transparent={false}
          opacity={1}
        />
      </mesh>
      <spotLight angle={0.5} penumbra={0.5} ref={light} castShadow intensity={5} shadow-mapSize={1024} shadow-bias={-0.001}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
      </spotLight>
    </group>
  )
}

useGLTF.preload('/model/logo-glass-optimized.glb')
useTexture.preload('/texture/penny-copper.png')
