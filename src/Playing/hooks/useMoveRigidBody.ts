import { useFrame } from '@react-three/fiber';
import { useGame } from '../../_hooks/useGame.tsx';
import { useRef } from 'react';
import { INITIAL_SCROLL_SPEED } from '../../constants.ts';

export const useMoveRigidBody = ({
  ref,
  rigidBody,
  name = '',
  sticky = false,
  initialObjectPosX,
  initialObjectPosY,
  initialObjectPosZ,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
  rigidBody?: any;
  name?: string;
  sticky?: boolean;
  initialObjectPosX?: number;
  initialObjectPosY?: number;
  initialObjectPosZ?: number;
}) => {
  const { status } = useGame();
  const position = useRef({ x: initialObjectPosX || 0, y: initialObjectPosY || 0, z: initialObjectPosZ || 0 });

  useFrame((_, delta) => {
    if (sticky || !position.current || status === 'idle' || status === 'paused' || !ref) return;

    if (rigidBody) {
      const realPositionX = initialObjectPosX || 0;
      const realPositionY = initialObjectPosY || 0;
      const realPositionZ = position.current.z - delta * INITIAL_SCROLL_SPEED;

      position.current = {
        x: realPositionX,
        y: realPositionY,
        z: realPositionZ,
      };
      // if (name === 'coin')
      // console.log({
      //   x: realPositionX,
      //   y: realPositionY,
      //   z: realPositionZ,
      // });
      rigidBody!.setTranslation(
        {
          x: realPositionX,
          y: realPositionY,
          z: realPositionZ,
        },
        true,
      );
    }
  });
};
