import { useAnimations, useGLTF, useFBX } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useGame } from '../../_hooks/useGame.tsx';
import { animate, useMotionValue } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { framerMotionConfig } from '../../constants.ts';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { Clock } from 'three';

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

export function Butcher({ group, ...props }: any) {
  const rigid = useRef(null);
  const { nodes, materials } = useGLTF('/models/butcher.glb') as GLTFResult;
  const clockRef = useRef(new Clock());
  const tasksRef = useRef({
    addRewards: { interval: 6, lastExecution: 0 },
    addObstacles: { interval: 10, lastExecution: 0 },
    increaseSpeed: { interval: 30, lastExecution: 0 },
  });

  const playerPositionX = useMotionValue(0);
  const playerPositionY = useMotionValue(0);
  const playerPositionZ = useMotionValue(0);

  const { dispatch, playerPosition, status } = useGame();
  let { playerAnimation } = useGame();
  const { animations: catwalk } = useFBX('/animations/an-catwalk.fbx');
  const { animations: dancing } = useFBX('/animations/an-dancing.fbx');
  const { animations: drunkRun } = useFBX('/animations/an-drunk-run.fbx');
  const { animations: fastRun } = useFBX('/animations/an-fast-run.fbx');
  const { animations: flip } = useFBX('/animations/an-flip.fbx');
  const { animations: goofyRun } = useFBX('/animations/an-goofy-run.fbx');
  const { animations: headDownRun } = useFBX('/animations/an-head-down-run.fbx');
  const { animations: hipHopDance } = useFBX('/animations/an-hip-hop-dance.fbx');
  const { animations: hitAndFall } = useFBX('/animations/an-hit-and-fall.fbx');
  const { animations: hitFromBackWhileRunning } = useFBX('/animations/an-hit-from-back-while-running.fbx');
  const { animations: hitObstacle } = useFBX('/animations/an-hit-obstacle.fbx');
  const { animations: jump } = useFBX('/animations/an-jump.fbx');
  const { animations: jumpOn } = useFBX('/animations/an-jump-on.fbx');
  const { animations: lookBackRun } = useFBX('/animations/an-look-back-run.fbx');
  const { animations: runBackward } = useFBX('/animations/an-run-backward.fbx');
  const { animations: runLookBack } = useFBX('/animations/an-run-look-back.fbx');
  const { animations: slowRun } = useFBX('/animations/an-slow-run.fbx');
  const { animations: stopLookBack } = useFBX('/animations/an-stop-look-back.fbx');
  const { animations: idle } = useFBX('/animations/an-idle.fbx');

  idle[0].name = 'idle';
  catwalk[0].name = 'catwalk';
  dancing[0].name = 'dancing';
  drunkRun[0].name = 'drunkRun';
  fastRun[0].name = 'fastRun';
  flip[0].name = 'flip';
  goofyRun[0].name = 'goofyRun';
  headDownRun[0].name = 'headDownRun';
  hipHopDance[0].name = 'hipHopDance';
  hitAndFall[0].name = 'hitAndFall';
  hitFromBackWhileRunning[0].name = 'hitFromBackWhileRunning';
  hitObstacle[0].name = 'hitObstacle';
  jump[0].name = 'jump';
  jumpOn[0].name = 'jumpOn';
  lookBackRun[0].name = 'lookBackRun';
  runBackward[0].name = 'runBackward';
  runLookBack[0].name = 'runLookBack';
  slowRun[0].name = 'slowRun';
  stopLookBack[0].name = 'stopLookBack';

  const { actions } = useAnimations(
    [
      idle[0],
      // types of run
      slowRun[0],
      drunkRun[0],
      fastRun[0],
      goofyRun[0],
      runBackward[0],
      lookBackRun[0],
      runLookBack[0],
      headDownRun[0],
      // jumps
      jump[0],
      jumpOn[0],
      flip[0],
      // stop
      stopLookBack[0],
      // funny and win
      catwalk[0],
      dancing[0],
      hipHopDance[0],
      // hits and loose
      hitAndFall[0],
      hitFromBackWhileRunning[0],
      hitObstacle[0],
    ],
    group,
  );

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

    const elapsedTime = clockRef.current.getElapsedTime();
    const tasks = tasksRef.current;
    if (elapsedTime - tasks.addRewards.lastExecution >= tasks.addRewards.interval) {
      tasks.addRewards.lastExecution = elapsedTime;
      dispatch({ type: 'add-reward' });
    }
    if (elapsedTime - tasks.addObstacles.lastExecution >= tasks.addObstacles.interval) {
      console.log('Adding Obstacles: Doing something every 10 seconds');
      tasks.addObstacles.lastExecution = elapsedTime;
      dispatch({ type: 'add-obstacle' });
    }
    if (elapsedTime - tasks.increaseSpeed.lastExecution >= tasks.increaseSpeed.interval) {
      console.log('Increasing Speed: Doing something every 30 seconds');
      tasks.increaseSpeed.lastExecution = elapsedTime;
      dispatch({ type: 'increase-speed' });
    }
  });

  return (
    <RigidBody
      ref={rigid}
      type="fixed"
      colliders={false}
      linearDamping={12}
      onIntersectionEnter={({ other }) => {
        dispatch({ type: 'collect-or-hit', payload: other.rigidBody?.userData as any });
        if (['grave', 'spider', 'nail'].includes(other.rigidBody?.userData!.type)) {
          dispatch({ type: 'setCharacterAnimation', payload: 'hitFromBackWhileRunning' });
          setTimeout(() => {
            dispatch({ type: 'setCharacterAnimation', payload: 'slowRun' });
          }, 800);
        }
      }}
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
