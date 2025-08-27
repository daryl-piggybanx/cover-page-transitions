
import React, { useRef } from 'react'
import { useGLTF, MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import { Mesh, TextureLoader } from 'three'
import type { ThreeElements, useLoader } from '@react-three/fiber'

type ModelProps = ThreeElements['group'] & {
  position?: [number, number, number]
  rotation?: [number, number, number]
  useDeviceControl?: boolean
}
export default function LogoGlass(props: ModelProps) {
  const { nodes, materials } = useGLTF('/model/logo-glass-optimized.glb')
  
  console.log('nodes', nodes)
  console.log('materials', materials)
  
  // object notation for texture loading as recommended in 
  // https://r3f.docs.pmnd.rs/tutorials/loading-textures#using-usetexture
  const textureProps = useTexture({
    map: '/texture/penny-copper.png'
  })
  
  return (
    <group {...props} dispose={null}>
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
    </group>
  )
}

useGLTF.preload('/model/logo-glass-optimized.glb')
useTexture.preload('/texture/penny-copper.png')
