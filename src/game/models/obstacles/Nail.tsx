import { useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import { Explosion } from '../../effects/Explosion';
import { useCollectOnCollideEnemy } from '../../hooks/useCollectOnCollideEnemy';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad';
import { UUID } from '../../types';
import { useAtomValue } from 'jotai';
import { gameStatusAtom } from '../../../atoms/game.ts';

type GLTFResult = GLTF & {
  nodes: {
    Circle001_1: THREE.Mesh;
    Circle001_2: THREE.Mesh;
    Circle001_3: THREE.Mesh;
    Circle001_4: THREE.Mesh;
    Circle001_5: THREE.Mesh;
    Circle001_6: THREE.Mesh;
    Circle001_7: THREE.Mesh;
    Circle001_8: THREE.Mesh;
    Circle001_9: THREE.Mesh;
    Circle001_10: THREE.Mesh;
    Circle001_11: THREE.Mesh;
    Circle001_12: THREE.Mesh;
    Circle001_13: THREE.Mesh;
    Circle001_14: THREE.Mesh;
    Circle001_15: THREE.Mesh;
    Circle001_16: THREE.Mesh;
    Circle001_17: THREE.Mesh;
    Circle001_18: THREE.Mesh;
    Circle001_19: THREE.Mesh;
    Circle001_20: THREE.Mesh;
  };
  materials: {
    ['Material.011']: THREE.MeshStandardMaterial;
    ['Material.012']: THREE.MeshStandardMaterial;
    ['Material.013']: THREE.MeshStandardMaterial;
    ['Material.014']: THREE.MeshStandardMaterial;
    ['Material.015']: THREE.MeshStandardMaterial;
    ['Material.016']: THREE.MeshStandardMaterial;
    ['Material.017']: THREE.MeshStandardMaterial;
    ['Material.018']: THREE.MeshStandardMaterial;
    ['Material.019']: THREE.MeshStandardMaterial;
    ['Material.020']: THREE.MeshStandardMaterial;
    ['Material.021']: THREE.MeshStandardMaterial;
    ['Material.022']: THREE.MeshStandardMaterial;
    ['Material.023']: THREE.MeshStandardMaterial;
    ['Material.024']: THREE.MeshStandardMaterial;
    ['Material.025']: THREE.MeshStandardMaterial;
    ['Material.026']: THREE.MeshStandardMaterial;
    ['Material.027']: THREE.MeshStandardMaterial;
    ['Material.028']: THREE.MeshStandardMaterial;
    ['Material.029']: THREE.MeshStandardMaterial;
    ['Material.001']: THREE.MeshStandardMaterial;
  };
};

type NailProps = JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: UUID };

export function Nail(props: NailProps) {
  const { nodes, materials } = useGLTF('/models/nails.glb') as GLTFResult;
  const rigid = useRef(null);
  const group = useRef(null);
  const status = useAtomValue(gameStatusAtom);

  const { 'position-x': posX, 'position-y': posY, 'position-z': posZ, ...rest } = props;
  useMoveItemOnRoad({
    ref: group.current!,
    rigidBody: rigid.current!,
    name: 'nail',
    initialObjectPosX: posX,
    initialObjectPosY: posY,
    initialObjectPosZ: posZ,
  });

  useCollectOnCollideEnemy({ ref: group.current, isColloid: props.isCollected });

  if (status === 'idle') {
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
        type: 'nail',
        damage: 30,
        itemId: props.itemId,
      }}
    >
      <CuboidCollider args={[0.15, 0.07, 0.2]} />
      {props.isCollected ? <Explosion scale={0.1} /> : null}
      <group ref={group} {...rest} dispose={null}>
        <group position={[-1.998, 0.911, -0.009]} rotation={[-3.139, -0.618, 0]} scale={[0.483, 0.315, 0.483]}>
          <mesh castShadow receiveShadow geometry={nodes.Circle001_1.geometry} material={materials['Material.011']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_2.geometry} material={materials['Material.012']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_3.geometry} material={materials['Material.013']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_4.geometry} material={materials['Material.014']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_5.geometry} material={materials['Material.015']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_6.geometry} material={materials['Material.016']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_7.geometry} material={materials['Material.017']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_8.geometry} material={materials['Material.018']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_9.geometry} material={materials['Material.019']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_10.geometry} material={materials['Material.020']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_11.geometry} material={materials['Material.021']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_12.geometry} material={materials['Material.022']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_13.geometry} material={materials['Material.023']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_14.geometry} material={materials['Material.024']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_15.geometry} material={materials['Material.025']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_16.geometry} material={materials['Material.026']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_17.geometry} material={materials['Material.027']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_18.geometry} material={materials['Material.028']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_19.geometry} material={materials['Material.029']} />
          <mesh castShadow receiveShadow geometry={nodes.Circle001_20.geometry} material={materials['Material.001']} />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/nails.glb');
