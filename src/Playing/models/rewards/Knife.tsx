import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useGame } from '../../../_hooks/useGame.tsx';
import { useFrame } from '@react-three/fiber';
import { SCROLL_SPEED } from '../../../App.tsx';

export function Knife(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/knife-final-2.glb');
  const { actions } = useAnimations(animations, group);

  const { status } = useGame();

  useEffect(() => {
    if (status === 'paused') {
      actions['jump'].stop();
      actions['jump'].fadeOut(0.1);
    }
    actions['jump'].fadeIn(0.1).play();
    actions['jump'].setEffectiveTimeScale(0.5);
  }, [status]);

  useFrame((_, delta) => {
    group.current.position.z -= SCROLL_SPEED * delta;
  });

  return (
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
  );
}

useGLTF.preload('/models/knife-final-2.glb');
