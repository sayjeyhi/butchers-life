import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { RigidBody } from '@react-three/rapier';
import { useGame } from '../../../_hooks/useGame.tsx';
import { animate, useMotionValue } from 'framer-motion';
import { framerMotionConfig } from '../../../constants.ts';
import { useFrame } from '@react-three/fiber';

export function Meat(props: JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: number }) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/meat-final.glb');
  const { actions } = useAnimations(animations, group);

  const { 'position-x': posX, 'position-y': posY, 'position-z': posZ, ...rest } = props;
  useMoveItemOnRoad({
    ref: group.current,
    animation: actions['rotate']!,
    name: 'meat',
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
      animate(coinPositionX, -1.6, framerMotionConfig);
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
        type: 'meat',
        award: 20,
        itemId: props.itemId,
      }}
    >
      <group ref={group} {...rest} dispose={null}>
        <group name="Scene">
          <group
            name="Cylinder013"
            position={[0.095, 1.364, 0.121]}
            rotation={[1.938, -0.563, 0.001]}
            scale={[0.266, 0.211, 0.276]}
          >
            <mesh
              name="Cylinder003"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder003.geometry}
              material={materials.E0E752}
            />
            <mesh
              name="Cylinder003_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder003_1.geometry}
              material={materials['Material.006']}
            />
            <mesh
              name="Cylinder003_2"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder003_2.geometry}
              material={materials.E74D47}
            />
          </group>
          <group name="GPencil" />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/meat-final.glb');
