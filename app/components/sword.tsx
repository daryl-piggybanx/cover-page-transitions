
import React, { useRef, Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'
import { useFrame, useThree } from '@react-three/fiber'
import { Group, Mesh } from 'three'

type ModelProps = ThreeElements['group'] & {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  rotationSpeed?: number
}

function SwordModel(props: ModelProps) {
  const { nodes, materials } = useGLTF('/model/piggy-sword.glb')
  const { rotationSpeed = 0.2 } = props
  const { viewport } = useThree()

  const ref = useRef<Group>(null)

  useFrame((state, delta) => {
    if (ref.current && rotationSpeed !== 0) {
      ref.current.rotation.y += rotationSpeed * delta

      // oscillate
      ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.9
    }
  })
  return (
    <group {...props} dispose={null} ref={ref} scale={viewport.width / 3}>
      <group position={[0, 0.372, 0]} scale={[0.034, -0.196, 0.027]}>
        <mesh
          geometry={(nodes.Cylinder001 as Mesh).geometry}
          material={materials['Dark Brown Leather']}
        />
        <mesh
          geometry={(nodes.Cylinder001_1 as Mesh).geometry}
          material={materials['Scratched metal']}
        />
        <mesh
          geometry={(nodes.Cylinder001_2 as Mesh).geometry}
          material={materials['Gold metal (Imperfections)']}
        />
        <mesh
          geometry={(nodes.Cylinder001_3 as Mesh).geometry}
          material={materials['Old Gold.002']}
        />
        <mesh
          geometry={(nodes.Cylinder001_4 as Mesh).geometry}
          material={materials['Light Gold Metal']}
        />
        <mesh
          geometry={(nodes.Cylinder001_5 as Mesh).geometry}
          material={materials['Lightly soiled black metal']}
        />
      </group>
    </group>
  )
}

export default function Sword(props: ModelProps) {
  return (
    <Suspense fallback={
      <mesh {...props}>
        <boxGeometry args={[0.1, 0.5, 0.02]} />
        <meshStandardMaterial />
      </mesh>
    }>
      <SwordModel {...props} />
    </Suspense>
  )
}

useGLTF.preload('/model/piggy-sword.glb')
