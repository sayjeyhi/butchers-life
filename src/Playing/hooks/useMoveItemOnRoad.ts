import { useEffect } from 'react';
import { useGame } from '../../_hooks/useGame.tsx';
import { AnimationAction } from 'three';
import { useMoveRigidBody } from './useMoveRigidBody.ts';

export const useMoveItemOnRoad = ({
  ref,
  animation,
  name = '',
  sticky = false,
  effectiveTimeScale = 1.5,
  rigidBody,
  initialObjectPosX,
  initialObjectPosY,
  initialObjectPosZ,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
  animation?: AnimationAction;
  sticky?: boolean;
  effectiveTimeScale?: number;
  name?: string;
  rigidBody?: any;
  initialObjectPosX?: number;
  initialObjectPosY?: number;
  initialObjectPosZ?: number;
}) => {
  useMoveRigidBody({ ref, sticky, rigidBody, name, initialObjectPosX, initialObjectPosY, initialObjectPosZ });

  const { status } = useGame();

  useEffect(() => {
    if (!animation) return;

    if (status === 'paused' || status === 'not-started' || status === 'idle' || status === 'game-over') {
      animation.stop();
      animation.fadeOut(0.1);
    }

    animation.fadeIn(0.1).play();
    animation.setEffectiveTimeScale(effectiveTimeScale);
  }, [animation, effectiveTimeScale, status]);
};
