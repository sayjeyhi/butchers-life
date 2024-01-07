import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useGame } from '../../../_hooks/useGame.tsx';
import { Explosion } from '../../effects/Explosion.tsx';
import { useCollectOnCollideEnemy } from '../../hooks/useCollectOnCollideEnemy.ts';

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

  useCollectOnCollideEnemy({ ref: group.current, isColloid: props.isCollected });

  const { status } = useGame();

  if (status === 'idle') {
    return null;
  }

  return (
    <RigidBody
      ref={rigid}
      type="dynamic"
      colliders={false}
      linearDamping={12}
      lockRotations
      sensor
      userData={{
        type: 'grave',
        damage: 25,
        itemId: props.itemId,
      }}
    >
      <CuboidCollider args={[0.09, 0.179, 0.2]} />
      {props.isCollected ? <Explosion scale={0.1} /> : null}
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
