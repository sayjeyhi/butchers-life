import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { SCROLL_SPEED } from '../../../App.tsx';
import { useGame } from '../../../_hooks/useGame.tsx';

export function Meat(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/meat.glb');
  const { actions } = useAnimations(animations, group);
  const { status } = useGame();

  useEffect(() => {
    if (status === 'paused') {
      actions['rotate'].stop();
      actions['rotate'].fadeOut(0.1);
    }
    actions['rotate'].fadeIn(0.1).play();
    actions['rotate'].setEffectiveTimeScale(1);
  }, [status]);

  useFrame((_, delta) => {
    group.current.position.z -= SCROLL_SPEED * delta;
  });

  return (
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
  );
}

useGLTF.preload('/models/meat.glb');
