import { useEffect } from 'react';
import { AnimationAction } from 'three';
import { useMoveRigidBody } from './useMoveRigidBody';
import { useAtomValue } from 'jotai';
import { gameStatusAtom } from '../../atoms/game.ts';

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
  const status = useAtomValue(gameStatusAtom);
  useMoveRigidBody({ ref, sticky, rigidBody, name, initialObjectPosX, initialObjectPosY, initialObjectPosZ });

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
