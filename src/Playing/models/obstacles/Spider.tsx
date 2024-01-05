import { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { RigidBody } from '@react-three/rapier';
import { useGame } from '../../../_hooks/useGame.tsx';
import { useCollectOnCollide } from '../../hooks/useCollectOnCollide.ts';

export function Spider(props: JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: number }) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/spider-with-web-final-12.glb');
  const { actions } = useAnimations(animations, group);

  const { 'position-x': posX, 'position-y': posY, 'position-z': posZ, ...rest } = props;
  useMoveItemOnRoad({
    ref: group.current!,
    animation: actions['watch']!,
    name: 'spider',
    rigidBody: rigid.current!,
    initialObjectPosX: posX,
    initialObjectPosY: posY,
    initialObjectPosZ: posZ,
  });
  const { status } = useGame();

  useCollectOnCollide({ ref: group.current, isColloid: props.isCollected });

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
        isEnemy: true,
        type: 'spider',
        damage: 60,
      }}
    >
      <group ref={group} {...rest} dispose={null}>
        <group name="Scene">
          <group name="Head" position={[-0.086, 0.299, 0.21]} rotation={[-0.004, -0.44, -0.004]} scale={0.159}>
            <mesh
              name="Sphere116"
              castShadow
              receiveShadow
              geometry={nodes.Sphere116.geometry}
              material={materials['kelelawar.002']}
            />
            <mesh
              name="Sphere116_1"
              castShadow
              receiveShadow
              geometry={nodes.Sphere116_1.geometry}
              material={materials['Material.003']}
            />
          </group>
          <group name="body" position={[-0.013, 0.397, -0.075]} rotation={[0.684, -0.177, 0.034]} scale={0.227}>
            <mesh
              name="Sphere119"
              castShadow
              receiveShadow
              geometry={nodes.Sphere119.geometry}
              material={materials.Material}
            />
            <mesh
              name="Sphere119_1"
              castShadow
              receiveShadow
              geometry={nodes.Sphere119_1.geometry}
              material={materials['Material.005']}
            />
            <mesh
              name="Sphere119_2"
              castShadow
              receiveShadow
              geometry={nodes.Sphere119_2.geometry}
              material={materials['kelelawar.001']}
            />
          </group>
          <mesh
            name="BezierCurve001"
            castShadow
            receiveShadow
            geometry={nodes.BezierCurve001.geometry}
            material={materials['Material.011']}
            position={[0.327, 1.071, -0.407]}
            rotation={[0.388, 0.797, 0.043]}
            scale={0.759}
          />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/spider-with-web-final-12.glb');
