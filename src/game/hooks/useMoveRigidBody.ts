import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { gameStatusAtom } from '../../atoms/game.ts';
import { useGameSpeed } from './useGameSpeed.ts';

export const useMoveRigidBody = ({
  rigidBody,
  sticky = false,
  initialObjectPosX,
  initialObjectPosY,
  initialObjectPosZ,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rigidBody?: any;
  name?: string;
  sticky?: boolean;
  initialObjectPosX?: number;
  initialObjectPosY?: number;
  initialObjectPosZ?: number;
}) => {
  const [isReady, setIsReady] = useState(false);

  const status = useAtomValue(gameStatusAtom);
  const getSpeed = useGameSpeed();
  const position = useRef({ x: initialObjectPosX || 0, y: initialObjectPosY || 0, z: initialObjectPosZ || 0 });

  useFrame((_, delta) => {
    if (sticky || !rigidBody || !position.current || status === 'paused') return;

    if (!isReady) {
      setTimeout(() => setIsReady(true), 10);
    }

    const realPositionX = initialObjectPosX || 0;
    const realPositionY = initialObjectPosY || 0;
    const realPositionZ = position.current.z - delta * getSpeed();

    position.current = {
      x: realPositionX,
      y: realPositionY,
      z: realPositionZ,
    };

    rigidBody!.setTranslation(
      {
        x: realPositionX,
        y: realPositionY,
        z: realPositionZ,
      },
      true,
    );
  });

  return {
    isReady,
  };
};
