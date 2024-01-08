import { useAnimations, useFBX } from '@react-three/drei';
import { Group } from 'three';

export const useButcherAnimations = (group: Group | undefined) => {
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

  return useAnimations(
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
};
