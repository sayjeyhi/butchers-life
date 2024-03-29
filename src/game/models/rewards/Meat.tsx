import { useAnimations, useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { useCollectOnCollide } from '../../hooks/useCollectOnCollide';
import { useItemAnimation } from '../../hooks/useItemAnimation';
import { UUID } from '../../types';
import { useMoveRigidBody } from '../../hooks/useMoveRigidBody.ts';

type MeatProps = JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: UUID };
export function Meat(props: MeatProps) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/meat-final.glb');
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
        type: 'meat',
        award: 20,
        itemId: props.itemId,
      }}
    >
      <CuboidCollider args={[0.06, 0.06, 0.2]} position={[0, 0.11, 0]} />

      {isReady && (
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
      )}
    </RigidBody>
  );
}

useGLTF.preload('/models/meat-final.glb');
