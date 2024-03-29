import { useAnimations, useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { useCollectOnCollide } from '../../hooks/useCollectOnCollide';
import { useItemAnimation } from '../../hooks/useItemAnimation';
import { UUID } from '../../types';
import { useMoveRigidBody } from '../../hooks/useMoveRigidBody.ts';

type CoinProps = JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: UUID };

export function Coin(props: CoinProps) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/coin-22.glb');
  const { actions } = useAnimations(animations, group);

  const { 'position-x': posX, 'position-y': posY, 'position-z': posZ, ...rest } = props;
  const { isReady, isOutOfView } = useMoveRigidBody({
    rigidBody: rigid.current,
    initialObjectPosX: posX,
    initialObjectPosY: posY,
    initialObjectPosZ: posZ,
  });
  useItemAnimation({
    animation: actions['rotate']!,
    isOutOfView,
  });
  useCollectOnCollide({
    ref: group.current,
    isOutOfView,
    initialScale: props.scale,
    isCollected: props.isCollected,
  });

  if (isOutOfView) {
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
        type: 'coin',
        award: 10,
        itemId: props.itemId,
      }}
    >
      <CuboidCollider args={[0.06, 0.06, 0.2]} position={[0, 0.06, 0]} />

      {isReady && (
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
      )}
    </RigidBody>
  );
}

useGLTF.preload('/models/coin-22.glb');
