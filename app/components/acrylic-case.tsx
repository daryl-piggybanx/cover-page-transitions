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
  const { nodes, materials } = useGLTF('/model/acrylic-case.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0.03, 1.962, -0.009]}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cube151 as Mesh).geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cube151_1 as Mesh).geometry}
          material={materials.Acrylic}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cube151_2 as Mesh).geometry}
          material={materials['Transparent Glossy Plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cube151_3 as Mesh).geometry}
          material={materials['Hot glue']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/model/acrylic-case.glb')