import { useAnimations, useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { useCollectOnCollide } from '../../hooks/useCollectOnCollide';
import { useItemAnimation } from '../../hooks/useItemAnimation';
import { UUID } from '../../types';
import { useMoveRigidBody } from '../../hooks/useMoveRigidBody.ts';

type KnifeProps = JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: UUID };

export function Knife(props: KnifeProps) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/knife-final-222.glb');
  const { actions } = useAnimations(animations, group);

  const { 'position-x': posX, 'position-y': posY, 'position-z': posZ, ...rest } = props;
  const { isReady, isOutOfView } = useMoveRigidBody({
    ref: group.current,
    rigidBody: rigid.current,
    initialObjectPosX: posX,
    initialObjectPosY: posY,
    initialObjectPosZ: posZ,
  });
  useItemAnimation({
    animation: actions['jump']!,
    isOutOfView,
    effectiveTimeScale: 0.4,
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
        type: 'knife',
        award: 16,
        itemId: props.itemId,
      }}
    >
      <CuboidCollider args={[0.06, 0.06, 0.2]} position={[0, 0.06, 0]} />

      {isReady && (
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
      )}
    </RigidBody>
  );
}

useGLTF.preload('/models/knife-final-222.glb');
