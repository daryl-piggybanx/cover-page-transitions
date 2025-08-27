
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
  const { nodes, materials } = useGLTF('/model/piggy-sword.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.372, 0]} scale={[0.034, 0.196, 0.027]}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder001 as Mesh).geometry}
          material={materials['Dark Brown Leather']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder001_1 as Mesh).geometry}
          material={materials['Scratched metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder001_2 as Mesh).geometry}
          material={materials['Gold metal (Imperfections)']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder001_3 as Mesh).geometry}
          material={materials['Old Gold.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder001_4 as Mesh).geometry}
          material={materials['Light Gold Metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder001_5 as Mesh).geometry}
          material={materials['Lightly soiled black metal']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/model/piggy-sword.glb')
