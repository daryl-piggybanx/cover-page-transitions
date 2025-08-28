import React, { useRef } from 'react'
import {  useGLTF, useTexture } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'
import { Mesh } from 'three'
import { useControls } from 'leva'

type ModelProps = ThreeElements['group'] & {
  position?: [number, number, number]
  rotation?: [number, number, number]
  useDeviceControl?: boolean
}

export default function MetalBolt(props: ModelProps) {
  const { nodes, materials } = useGLTF('/model/fogged-glass-bolt.glb')
  const textureProps = useTexture({
    map: '/texture/decorative-glass.png'
  })
  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Bolt as Mesh).geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial 
          {...textureProps}
          metalness={0.5}
          roughness={0.2}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/model/fogged-glass-bolt.glb')
useTexture.preload('/texture/decorative-glass.png')
