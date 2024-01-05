import { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { RigidBody } from '@react-three/rapier';

export function Meat(props: JSX.IntrinsicElements['group']) {
  const group = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/meat.glb');
  const { actions } = useAnimations(animations, group);

  useMoveItemOnRoad({ ref: group.current, animation: actions['rotate']! });

  return (
    <RigidBody colliders="trimesh" type="fixed">
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group
            name="Cylinder013"
            position={[0.095, 1.364, 0.121]}
            rotation={[1.938, -0.563, 0.001]}
            scale={[0.259, 0.139, 0.259]}
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
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/meat.glb');
