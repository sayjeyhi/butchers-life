import { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { RigidBody } from '@react-three/rapier';

export function Knife(props: JSX.IntrinsicElements['group']) {
  const group = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/knife-final-2.glb');
  const { actions } = useAnimations(animations, group);

  useMoveItemOnRoad({ ref: group.current, animation: actions['jump']!, effectiveTimeScale: 0.4 });

  return (
    <RigidBody colliders="trimesh" type="fixed">
      <group ref={group} {...props} dispose={null}>
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
