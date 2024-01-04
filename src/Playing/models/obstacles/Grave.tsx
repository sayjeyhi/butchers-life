import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { RigidBody } from '@react-three/rapier';

export function Grave(props: JSX.IntrinsicElements['group']) {
  const group = useRef(null);
  const { nodes, materials } = useGLTF('/models/grave-21.glb');

  useMoveItemOnRoad({ ref: group.current! });

  return (
    <RigidBody colliders="trimesh" type="fixed">
      <group {...props} ref={group} dispose={null}>
        <group position={[0.101, 1.532, -0.793]} rotation={[-0.069, 0, 0]} scale={0.22}>
          <mesh castShadow receiveShadow geometry={nodes.Cube110.geometry} material={materials['Material.012']} />
          <mesh castShadow receiveShadow geometry={nodes.Cube110_1.geometry} material={materials['kelelawar.003']} />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/grave-21.glb');
