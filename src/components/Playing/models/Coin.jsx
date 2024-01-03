
import React, {useEffect, useRef} from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import {useGame} from "../../../hooks/useGame.jsx";
import {useFrame} from "@react-three/fiber";
import {SCROLL_SPEED} from "../../../App.jsx";

export function Coin(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/coin-final.glb");
  const { actions } = useAnimations(animations, group);
  const { status } = useGame();

  useEffect(() => {
    if (status === "paused") {
      actions["rotate"].stop();
      actions["rotate"].fadeOut(0.1);
    }
    actions["rotate"].fadeIn(0.1).play();
    actions["rotate"].setEffectiveTimeScale(1.5);
  }, [status]);

  useFrame((_, delta) => {
    group.current.position.z -= SCROLL_SPEED * delta;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Text"
          position={[-0.002, 0.479, 0.013]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.711}
        >
          <mesh
            name="Text_1"
            castShadow
            receiveShadow
            geometry={nodes.Text_1.geometry}
            material={materials["Material.027"]}
          />
          <mesh
            name="Text_2"
            castShadow
            receiveShadow
            geometry={nodes.Text_2.geometry}
            material={materials["SVGMat.017"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/coin-final.glb");
