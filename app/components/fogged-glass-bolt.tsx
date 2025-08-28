import React, { useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, useTexture } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'
import { Mesh } from 'three'
import { useControls } from 'leva'

type ModelProps = ThreeElements['group'] & {
  position?: [number, number, number]
  rotation?: [number, number, number]
  useDeviceControl?: boolean
}

export default function FoggedGlassBolt(props: ModelProps) {
  const { nodes, materials } = useGLTF('/model/fogged-glass-bolt.glb')
  const textureProps = useTexture({
    map: '/texture/decorative-glass.png'
  })

  const transmissionMaterial = useControls({
    thickness: { value: 0.2, min: 0.0, max: 3, step: 0.05 },
    roughness: { value: 0.0, min: 0.0, max: 1.0, step: 0.01 },
    transmission: { value: 0.7, min: 0.0, max: 1.0, step: 0.01 },
    ior: { value: 0.4, min: 0.0, max: 3.0, step: 0.1 },
    chromaticAberration: { value: 0.2, min: 0.0, max: 1.0, step: 0.1 },
    backside: { value: true },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationColor: '#ffffff',
    color: '#ff8989',
    bg: '#839681'
  })
  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Bolt as Mesh).geometry}
        // material={materials['Glass Imperfecftions Clear Misted']}
        rotation={[Math.PI / 2, 0, 0]}
      >
        {/* <meshStandardMaterial 
          {...textureProps}
          metalness={0.5}
          roughness={0.2}
          transparent={true}
          opacity={0.5}
        /> */}
        <MeshTransmissionMaterial {...transmissionMaterial} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/model/fogged-glass-bolt.glb')
useTexture.preload('/texture/decorative-glass.png')
