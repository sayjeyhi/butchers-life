import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { SCROLL_SPEED } from '../../constants.ts';
import { useGame } from '../../_hooks/useGame.tsx';
import { AnimationAction } from 'three';

export const useMoveItemOnRoad = ({
  ref,
  animation,
  sticky = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
  animation?: AnimationAction;
  sticky?: boolean;
}) => {
  const { status } = useGame();

  useEffect(() => {
    if (!animation) return;

    if (status === 'paused' || status === 'not-started' || status === 'idle') {
      animation.stop();
      animation.fadeOut(0.1);
    }

    animation.fadeIn(0.1).play();
    animation.setEffectiveTimeScale(1.5);
  }, [animation, status]);

  useFrame((_, delta) => {
    if (sticky || status === 'idle' || !ref) return;

    ref.position.z -= SCROLL_SPEED * delta;
  });
};
