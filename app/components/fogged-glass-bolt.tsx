import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'
import { Mesh } from 'three'

type ModelProps = ThreeElements['group'] & {
  position?: [number, number, number]
  rotation?: [number, number, number]
  useDeviceControl?: boolean
}

export function Model(props: ModelProps) {
  const { nodes, materials } = useGLTF('/model/fogged-glass-bolt.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Bolt as Mesh).geometry}
        material={materials['Glass Imperfecftions Clear Misted']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/model/fogged-glass-bolt.glb')
