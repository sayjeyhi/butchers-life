import { useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { Explosion } from '../../effects/Explosion';
import { useCollectOnCollideEnemy } from '../../hooks/useCollectOnCollideEnemy';
import { useItemAnimation } from '../../hooks/useItemAnimation';
import { UUID } from '../../types';
import { useMoveRigidBody } from '../../hooks/useMoveRigidBody.ts';

type GraveProps = JSX.IntrinsicElements['group'] & { isCollected: boolean; itemId: UUID };

export function Grave(props: GraveProps) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { nodes, materials } = useGLTF('/models/grave-21.glb');

  const { 'position-x': posX, 'position-y': posY, 'position-z': posZ, ...rest } = props;
  const { isReady, isOutOfView } = useMoveRigidBody({
    rigidBody: rigid.current,
    initialObjectPosX: posX,
    initialObjectPosY: posY,
    initialObjectPosZ: posZ,
  });
  useItemAnimation({ isOutOfView });
  useCollectOnCollideEnemy({ isOutOfView, ref: group.current, isCollected: props.isCollected });

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
        type: 'grave',
        damage: 25,
        itemId: props.itemId,
      }}
    >
      <CuboidCollider args={[0.09, 0.179, 0.2]} />
      {props.isCollected ? <Explosion scale={0.1} /> : null}
      {isReady && (
        <group {...rest} ref={group} dispose={null}>
          <group position={[0.101, 1.532, -0.793]} rotation={[-0.069, 0, 0]} scale={0.22}>
            <mesh castShadow receiveShadow geometry={nodes.Cube110.geometry} material={materials['Material.012']} />
            <mesh castShadow receiveShadow geometry={nodes.Cube110_1.geometry} material={materials['kelelawar.003']} />
          </group>
        </group>
      )}
    </RigidBody>
  );
}

useGLTF.preload('/models/grave-21.glb');
