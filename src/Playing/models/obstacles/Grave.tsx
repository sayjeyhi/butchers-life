import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { RigidBody } from '@react-three/rapier';
import { useGame } from '../../../_hooks/useGame.tsx';
import { useCollectOnCollide } from '../../hooks/useCollectOnCollide.ts';

export function Grave(props: JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: number }) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials } = useGLTF('/models/grave-21.glb');

  const { 'position-x': posX, 'position-y': posY, 'position-z': posZ, ...rest } = props;
  useMoveItemOnRoad({
    ref: group.current!,
    rigidBody: rigid.current!,
    name: 'grave',
    initialObjectPosX: posX,
    initialObjectPosY: posY,
    initialObjectPosZ: posZ,
  });

  useCollectOnCollide({ ref: group.current, isColloid: props.isCollected });

  const { status } = useGame();

  if (status === 'idle') {
    return null;
  }

  return (
    <RigidBody
      ref={rigid}
      type="dynamic"
      colliders="cuboid"
      linearDamping={12}
      lockRotations
      sensor
      userData={{
        isEnemy: true,
        type: 'grave',
        damage: 70,
      }}
    >
      <group {...rest} ref={group} dispose={null}>
        <group position={[0.101, 1.532, -0.793]} rotation={[-0.069, 0, 0]} scale={0.22}>
          <mesh castShadow receiveShadow geometry={nodes.Cube110.geometry} material={materials['Material.012']} />
          <mesh castShadow receiveShadow geometry={nodes.Cube110_1.geometry} material={materials['kelelawar.003']} />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/grave-21.glb');
