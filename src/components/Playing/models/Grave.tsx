import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { SCROLL_SPEED } from '../../../App.js';

export function Grave(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/grave-21.glb');

  useFrame((_, delta) => {
    group.current.position.z -= SCROLL_SPEED * delta;
  });

  return (
    <group {...props} ref={group} dispose={null}>
      <group position={[0.101, 1.532, -0.793]} rotation={[-0.069, 0, 0]} scale={0.22}>
        <mesh castShadow receiveShadow geometry={nodes.Cube110.geometry} material={materials['Material.012']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube110_1.geometry} material={materials['kelelawar.003']} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/grave-21.glb');
