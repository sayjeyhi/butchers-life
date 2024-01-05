import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { RigidBody } from '@react-three/rapier';
import { useGame } from '../../../_hooks/useGame.tsx';
import { animate, useMotionValue } from 'framer-motion';
import { framerMotionConfig } from '../../../constants.ts';
import { useFrame } from '@react-three/fiber';

export function Coin(props: JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: number }) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/coin-22.glb');
  const { actions } = useAnimations(animations, group);

  const { 'position-x': posX, 'position-y': posY, 'position-z': posZ, ...rest } = props;
  useMoveItemOnRoad({
    ref: group.current,
    animation: actions['rotate']!,
    name: 'coin',
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
        type: 'coin',
        award: 10,
        itemId: props.itemId,
      }}
    >
      <group ref={group} {...rest} dispose={null}>
        <group name="Scene">
          <group
            name="coin"
            position={[-0.002, 0.479, 0.013]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.711, 1.153, 0.711]}
          >
            <mesh
              name="Text"
              castShadow
              receiveShadow
              geometry={nodes.Text.geometry}
              material={materials['Material.027']}
            />
            <mesh
              name="Text_1"
              castShadow
              receiveShadow
              geometry={nodes.Text_1.geometry}
              material={materials['SVGMat.017']}
            />
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/coin-22.glb');
