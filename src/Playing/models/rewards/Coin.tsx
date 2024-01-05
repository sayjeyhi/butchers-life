import { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { RigidBody } from '@react-three/rapier';

export function Coin(props: JSX.IntrinsicElements['group']) {
  const group = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/coin-final.glb');
  const { actions } = useAnimations(animations, group);

  useMoveItemOnRoad({ ref: group.current, animation: actions['rotate']! });

  return (
    <RigidBody colliders="trimesh" type="fixed">
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Text" position={[-0.002, 0.479, 0.013]} rotation={[Math.PI / 2, 0, 0]} scale={0.711}>
            <mesh
              name="Text_1"
              castShadow
              receiveShadow
              geometry={nodes.Text_1.geometry}
              material={materials['Material.027']}
            />
            <mesh
              name="Text_2"
              castShadow
              receiveShadow
              geometry={nodes.Text_2.geometry}
              material={materials['SVGMat.017']}
            />
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/coin-final.glb');
