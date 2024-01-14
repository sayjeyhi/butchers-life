import { useEffect } from 'react';
import { AnimationAction } from 'three';
import { useAtomValue } from 'jotai';
import { gameStatusAtom } from '../../atoms/game.ts';

type Options = {
  animation?: AnimationAction;
  effectiveTimeScale?: number;
  isOutOfView?: boolean;
};

export const useItemAnimation = (options?: Options) => {
  const { animation, isOutOfView, effectiveTimeScale = 1 } = options || {};
  const status = useAtomValue(gameStatusAtom);

  useEffect(() => {
    if (!animation) return;

    if (status === 'paused' || status === 'idle' || status === 'game-over' || isOutOfView) {
      animation.stop();
      animation.fadeOut(0.1);
    }

    animation.fadeIn(0.1).play();
    animation.setEffectiveTimeScale(effectiveTimeScale);
  }, [animation, effectiveTimeScale, isOutOfView, status]);
};
