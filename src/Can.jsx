
import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { RepeatWrapping } from 'three'
import canTextureBerries from './assets/03f0e17f-b502-474d-b8de-c6e7550ce8de.png'
import canTextureLemon from './assets/IKh72.jpg'
import canTextureOrange from './assets/bafbceb4-954e-4453-ae7a-86dc76db69bf.png'

const textureMap = {
    orange: canTextureOrange,
    lemon: canTextureLemon,
    berries: canTextureBerries,
}

export function Model({ textureKey = 'orange', ...props }) {
    const { nodes, materials } = useGLTF('/can.glb')
    const texture = useTexture(textureMap[textureKey] || canTextureOrange)

    if (texture) {
        texture.wrapS = RepeatWrapping
        texture.wrapT = RepeatWrapping
        texture.repeat.y = -1
        texture.needsUpdate = true
    }

    return (
        <group {...props} dispose={null}>
            <group
                position={[-0.064, -0.096, 0.144]}
                rotation={[-Math.PI / 2, 0, 0.401]}
                scale={[-0.01, -0.563, -1.636]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane002.geometry}>
                    <meshStandardMaterial map={texture} transparent />
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane002_1.geometry}
                    material={materials['Material.002']}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/can.glb')
useTexture.preload(canTextureOrange)
useTexture.preload(canTextureLemon)
useTexture.preload(canTextureBerries)
