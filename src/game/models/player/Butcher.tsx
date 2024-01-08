import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, IntersectionEnterHandler, RigidBody } from '@react-three/rapier';
import { animate, useMotionValue } from 'framer-motion';
import { MutableRefObject, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Clock, Group } from 'three';
import { GLTF } from 'three-stdlib';
import { framerMotionConfig } from '../../../constants.ts';
import { useAtomValue, useSetAtom } from 'jotai';
import { playerAnimationAtom, playerPositionAtom } from '../../../atoms/player.ts';
import { useButcherAnimations } from './hooks/useButcherAnimations.ts';
import { addRewardsAtom, collectRewardAtom } from '../../../atoms/rewards.ts';
import { addObstaclesAtom, hitObstaclesAtom } from '../../../atoms/obstacles.ts';
import { gameStatusAtom } from '../../../atoms/game.ts';
import { GameCollectPayload, GameCollidePayload, GameHitPayload } from '../../types.ts';
import { collectAudio, hitObstacleAudio, playAudio } from '../../../common/helpers/audio.ts';

type GLTFResult = GLTF & {
  nodes: {
    ['0002']: THREE.SkinnedMesh;
    ['0002_1']: THREE.SkinnedMesh;
    ['0002_2']: THREE.SkinnedMesh;
    ['0002_3']: THREE.SkinnedMesh;
    ['0002_4']: THREE.SkinnedMesh;
    ['0002_5']: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    ['hairs.001']: THREE.MeshPhysicalMaterial;
    ['body.001']: THREE.MeshPhysicalMaterial;
    ['eye.001']: THREE.MeshPhysicalMaterial;
    ['noose.001']: THREE.MeshPhysicalMaterial;
    ['jean.001']: THREE.MeshPhysicalMaterial;
    ['shirt.001']: THREE.MeshPhysicalMaterial;
  };
};

type ButcherProps = JSX.IntrinsicElements['group'] & {
  group?: MutableRefObject<Group | undefined>;
};

export function Butcher({ group, ...props }: ButcherProps) {
  const rigid = useRef(null);
  const { nodes, materials } = useGLTF('/models/butcher.glb') as GLTFResult;

  const clockRef = useRef(new Clock());
  const tasksRef = useRef({
    addRewards: { interval: 6, lastExecution: 0 },
    addObstacles: { interval: 10, lastExecution: 0 },
    someEffect: { interval: 30, lastExecution: 0 }, // add effects, sounds, etc
  });

  const playerPositionX = useMotionValue(0);
  const playerPositionY = useMotionValue(0);
  const playerPositionZ = useMotionValue(0);

  const { actions } = useButcherAnimations(group);

  let playerAnimation = useAtomValue(playerAnimationAtom);
  const playerPosition = useAtomValue(playerPositionAtom);
  const status = useAtomValue(gameStatusAtom);
  const addReward = useSetAtom(addRewardsAtom);
  const addObstacles = useSetAtom(addObstaclesAtom);
  const collectReward = useSetAtom(collectRewardAtom);
  const hitObstacle = useSetAtom(hitObstaclesAtom);

  console.log({
    playerAnimation,
    playerPosition,
  });
  useEffect(() => {
    if (!playerAnimation || !actions[playerAnimation]) return;

    // random animation when idle
    const funnyAnimations = ['dancing', 'hipHopDance'] as const;
    if (playerAnimation === 'idle') {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      playerAnimation = funnyAnimations[Math.floor(Math.random() * funnyAnimations.length)];
    }

    if (playerAnimation === 'jump') {
      animate(playerPositionY, 0.23, framerMotionConfig);
    } else {
      animate(playerPositionY, 0, framerMotionConfig);
    }
    const fadeDuration = playerAnimation === 'jump' ? 0.3 : 0.5;

    actions[playerAnimation]!.reset().fadeIn(fadeDuration).play();

    return () => {
      if (!actions[playerAnimation]) return;
      actions[playerAnimation]!.reset().fadeOut(0.5);
    };
  }, [actions, playerAnimation, playerPositionY]);

  useEffect(() => {
    if (playerPosition === 'left') animate(playerPositionX, -0.32, framerMotionConfig);
    if (playerPosition === 'right') animate(playerPositionX, 0.32, framerMotionConfig);
    if (playerPosition === 'center') animate(playerPositionX, 0, framerMotionConfig);
  }, [playerPosition, playerPositionX]);

  useEffect(() => {
    if (status === 'idle') animate(playerPositionZ, 12, framerMotionConfig);
    else animate(playerPositionZ, 4, framerMotionConfig);
  }, [playerPositionZ, status]);

  useFrame(() => {
    if (!rigid.current) return;

    rigid.current!.setTranslation(
      {
        x: playerPositionX.get(),
        y: playerPositionY.get(),
        z: playerPositionZ.get(),
      },
      true,
    );

    // add rewards and obstacles infinitely
    const elapsedTime = clockRef.current.getElapsedTime();
    const tasks = tasksRef.current;
    if (elapsedTime - tasks.addRewards.lastExecution >= tasks.addRewards.interval) {
      tasks.addRewards.lastExecution = elapsedTime;
      addReward();
    }
    if (elapsedTime - tasks.addObstacles.lastExecution >= tasks.addObstacles.interval) {
      tasks.addObstacles.lastExecution = elapsedTime;
      addObstacles();
    }
  });

  const handleCollision: IntersectionEnterHandler = ({ other }) => {
    const userData = other.rigidBody?.userData as GameCollidePayload;

    if (['grave', 'spider', 'nail'].includes(userData.type)) {
      playAudio(hitObstacleAudio);
      hitObstacle(userData as GameHitPayload);
    } else if (['coin', 'meat', 'knife'].includes(userData!.type)) {
      playAudio(collectAudio);
      collectReward(userData as GameCollectPayload);
    }
  };

  return (
    <RigidBody
      ref={rigid}
      type="fixed"
      colliders={false}
      linearDamping={12}
      onIntersectionEnter={handleCollision}
      lockRotations
    >
      <CapsuleCollider args={[0.044, 0.14]} position={[0, playerAnimation === 'jump' ? 0.24 : 0.18, 0]} />
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Armature" scale={0.01}>
            <group name="0">
              <skinnedMesh
                name="0002"
                geometry={nodes['0002'].geometry}
                material={materials['hairs.001']}
                skeleton={nodes['0002'].skeleton}
              />
              <skinnedMesh
                name="0002_1"
                geometry={nodes['0002_1'].geometry}
                material={materials['body.001']}
                skeleton={nodes['0002_1'].skeleton}
              />
              <skinnedMesh
                name="0002_2"
                geometry={nodes['0002_2'].geometry}
                material={materials['eye.001']}
                skeleton={nodes['0002_2'].skeleton}
              />
              <skinnedMesh
                name="0002_3"
                geometry={nodes['0002_3'].geometry}
                material={materials['noose.001']}
                skeleton={nodes['0002_3'].skeleton}
              />
              <skinnedMesh
                name="0002_4"
                geometry={nodes['0002_4'].geometry}
                material={materials['jean.001']}
                skeleton={nodes['0002_4'].skeleton}
              />
              <skinnedMesh
                name="0002_5"
                geometry={nodes['0002_5'].geometry}
                material={materials['shirt.001']}
                skeleton={nodes['0002_5'].skeleton}
              />
            </group>
            <primitive object={nodes.mixamorigHips} />
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/butcher.glb');
