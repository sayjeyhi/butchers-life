import { useEffect } from 'react';
import { AnimationAction } from 'three';
import { useAtomValue } from 'jotai';
import { gameStatusAtom } from '../../atoms/game.ts';

type Options = {
  animation?: AnimationAction;
  effectiveTimeScale?: number;
};

export const useMoveItemOnRoad = (options?: Options) => {
  const { animation, effectiveTimeScale = 1 } = options || {};
  const status = useAtomValue(gameStatusAtom);

  useEffect(() => {
    if (!animation) return;

    if (status === 'paused' || status === 'idle' || status === 'game-over') {
      animation.stop();
      animation.fadeOut(0.1);
    }

    animation.fadeIn(0.1).play();
    animation.setEffectiveTimeScale(effectiveTimeScale);
  }, [animation, effectiveTimeScale, status]);
};
