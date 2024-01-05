import { useAnimations, useGLTF } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import { useMoveItemOnRoad } from '../../hooks/useMoveItemOnRoad.ts';
import { useGame } from '../../../_hooks/useGame.tsx';
import { RigidBody } from '@react-three/rapier';

export function Ghost(props: JSX.IntrinsicElements['group']) {
  const group = useRef(null);
  const rigid = useRef(null);
  const { scene, materials, animations } = useGLTF('/models/cute-enemy-final.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  const { status } = useGame();

  useMoveItemOnRoad({ animation: actions['Armature.001Action']!, sticky: true });

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
        type: 'ghost',
        damage: 100,
      }}
    >
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="root">
              <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                <group name="Armature001_14" position={[0, 1, 0]}>
                  <group name="GLTF_created_0">
                    <group name="Cylinder_12" />
                    <skinnedMesh
                      name="Object_11"
                      geometry={nodes.Object_11.geometry}
                      material={materials.Ghost_Sheet}
                      skeleton={nodes.Object_11.skeleton}
                    />
                    <skinnedMesh
                      name="Object_12"
                      geometry={nodes.Object_12.geometry}
                      material={materials.Eyes}
                      skeleton={nodes.Object_12.skeleton}
                    />
                    <skinnedMesh
                      name="Object_13"
                      geometry={nodes.Object_13.geometry}
                      material={materials.Eye_Highlights}
                      skeleton={nodes.Object_13.skeleton}
                    />
                    <skinnedMesh
                      name="Object_7"
                      geometry={nodes.Object_7.geometry}
                      material={materials.Legs}
                      skeleton={nodes.Object_7.skeleton}
                    />
                    <group name="Plane_13" />
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/cute-enemy-final.glb');
