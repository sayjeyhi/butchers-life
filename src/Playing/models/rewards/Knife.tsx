import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { RigidBody } from '@react-three/rapier';
import { useGame } from '../../../_hooks/useGame.tsx';
import { animate, useMotionValue } from 'framer-motion';
import { framerMotionConfig } from '../../../constants.ts';
import { useFrame } from '@react-three/fiber';

export function Knife(props: JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: number }) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/knife-final-222.glb');
  const { actions } = useAnimations(animations, group);

  const { 'position-x': posX, 'position-y': posY, 'position-z': posZ, ...rest } = props;
  useMoveItemOnRoad({
    ref: group.current,
    animation: actions['jump']!,
    name: 'knife',
    effectiveTimeScale: 0.4,
    rigidBody: rigid.current!,
    initialObjectPosX: posX,
    initialObjectPosY: posY,
    initialObjectPosZ: posZ,
  });
  const { status } = useGame();

  const coinPositionX = useMotionValue(0);
  const coinPositionY = useMotionValue(0);
  const coinPositionZ = useMotionValue(0);
  useEffect(() => {
    if (props.isCollected) {
      animate(coinPositionX, -1.9, framerMotionConfig);
      animate(coinPositionY, 1.12, framerMotionConfig);
      animate(coinPositionZ, 16, framerMotionConfig);
    }
  }, [coinPositionX, coinPositionY, coinPositionZ, props.isCollected]);

  useFrame(() => {
    if (!group.current) return;
    group.current!.position.x = coinPositionX.get();
    group.current!.position.y = coinPositionY.get();
    group.current!.position.z = coinPositionZ.get();
  });

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
        type: 'knife',
        award: 16,
        itemId: props.itemId,
      }}
    >
      <group ref={group} {...rest} dispose={null}>
        <group name="Scene">
          <group
            name="Plane001ss001"
            position={[-0.052, 1.368, -0.479]}
            rotation={[1.186, 0.687, 1.059]}
            scale={[0.177, 0.177, 0.442]}
          >
            <mesh
              name="Plane001"
              castShadow
              receiveShadow
              geometry={nodes.Plane001.geometry}
              material={materials['silver 3.001']}
            />
            <mesh
              name="Plane001_1"
              castShadow
              receiveShadow
              geometry={nodes.Plane001_1.geometry}
              material={materials['silver.001']}
            />
            <mesh
              name="Plane001_2"
              castShadow
              receiveShadow
              geometry={nodes.Plane001_2.geometry}
              material={materials['wood brown.001']}
            />
            <mesh
              name="Plane001_3"
              castShadow
              receiveShadow
              geometry={nodes.Plane001_3.geometry}
              material={materials['silver 3']}
            />
            <mesh
              name="Plane001_4"
              castShadow
              receiveShadow
              geometry={nodes.Plane001_4.geometry}
              material={materials.silver}
            />
            <mesh
              name="Plane001_5"
              castShadow
              receiveShadow
              geometry={nodes.Plane001_5.geometry}
              material={materials['wood brown']}
            />
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/knife-final-222.glb');
