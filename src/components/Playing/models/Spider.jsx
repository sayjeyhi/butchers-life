
import React, {useEffect, useRef} from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import {useGame} from "../../../hooks/useGame.jsx";
import {useFrame} from "@react-three/fiber";
import {SCROLL_SPEED} from "../../../App.jsx";

export function Spider(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/spider-with-web-final-12.glb");
  const { actions } = useAnimations(animations, group);

  const { status } = useGame();

  useEffect(() => {
    if (status === "paused") {
      actions["watch"].stop();
      actions["watch"].fadeOut(0.1);
    }
    actions["watch"].fadeIn(0.1).play();
    actions["watch"].setEffectiveTimeScale(1.5);
  }, [status]);

  useFrame((_, delta) => {
    group.current.position.z -= SCROLL_SPEED * delta;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Head"
          position={[-0.086, 0.299, 0.21]}
          rotation={[-0.004, -0.44, -0.004]}
          scale={0.159}
        >
          <mesh
            name="Sphere116"
            castShadow
            receiveShadow
            geometry={nodes.Sphere116.geometry}
            material={materials["kelelawar.002"]}
          />
          <mesh
            name="Sphere116_1"
            castShadow
            receiveShadow
            geometry={nodes.Sphere116_1.geometry}
            material={materials["Material.003"]}
          />
        </group>
        <group
          name="body"
          position={[-0.013, 0.397, -0.075]}
          rotation={[0.684, -0.177, 0.034]}
          scale={0.227}
        >
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
            material={materials["Material.005"]}
          />
          <mesh
            name="Sphere119_2"
            castShadow
            receiveShadow
            geometry={nodes.Sphere119_2.geometry}
            material={materials["kelelawar.001"]}
          />
        </group>
        <mesh
          name="BezierCurve001"
          castShadow
          receiveShadow
          geometry={nodes.BezierCurve001.geometry}
          material={materials["Material.011"]}
          position={[0.327, 1.071, -0.407]}
          rotation={[0.388, 0.797, 0.043]}
          scale={0.759}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/spider-with-web-final-12.glb")
