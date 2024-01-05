import { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { RigidBody } from '@react-three/rapier';

export function Knife(props: JSX.IntrinsicElements['group']) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/knife-final-2.glb');
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

  return (
    <RigidBody
      ref={rigid}
      type="dynamic"
      colliders="trimesh"
      linearDamping={2}
      // position={[posX, posY, posZ]}
      lockRotations
      sensor
      userData={{
        type: 'knife',
        award: 16,
      }}
    >
      <group ref={group} {...rest} dispose={null}>
        <group name="Scene">
          <group
            name="Plane001ss"
            position={[-0.052, 1.368, -0.479]}
            rotation={[0.821, -0.361, 2.36]}
            scale={[0.177, 0.177, 0.442]}
          >
            <mesh
              name="Plane007"
              castShadow
              receiveShadow
              geometry={nodes.Plane007.geometry}
              material={materials['silver 3']}
            />
            <mesh
              name="Plane007_1"
              castShadow
              receiveShadow
              geometry={nodes.Plane007_1.geometry}
              material={materials.silver}
            />
            <mesh
              name="Plane007_2"
              castShadow
              receiveShadow
              geometry={nodes.Plane007_2.geometry}
              material={materials['wood brown']}
            />
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/knife-final-2.glb');
