import { useAnimations, useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { Explosion } from '../../effects/Explosion';
import { useCollectOnCollideEnemy } from '../../hooks/useCollectOnCollideEnemy';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad';
import { UUID } from '../../types';
import { useMoveRigidBody } from '../../hooks/useMoveRigidBody.ts';

type NailProps = JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: UUID };
export function Spider(props: NailProps) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials, animations } = useGLTF('/models/spider-with-web-final-12.glb');
  const { actions } = useAnimations(animations, group);

  const { 'position-x': posX, 'position-y': posY, 'position-z': posZ, ...rest } = props;
  useMoveItemOnRoad({
    animation: actions['watch']!,
  });
  const { isReady } = useMoveRigidBody({
    rigidBody: rigid.current,
    initialObjectPosX: posX,
    initialObjectPosY: posY,
    initialObjectPosZ: posZ,
  });

  useCollectOnCollideEnemy({ ref: group.current, isCollected: props.isCollected });

  return (
    <RigidBody
      ref={rigid}
      type="dynamic"
      colliders={false}
      linearDamping={12}
      lockRotations
      sensor
      userData={{
        type: 'spider',
        damage: 30,
        itemId: props.itemId,
      }}
    >
      {props.isCollected ? <Explosion scale={0.1} /> : null}
      <CuboidCollider args={[0.13, 0.24, 0.2]} />

      {isReady && (
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
      )}
    </RigidBody>
  );
}

useGLTF.preload('/models/spider-with-web-final-12.glb');
