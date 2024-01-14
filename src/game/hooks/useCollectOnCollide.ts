import { animate, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { framerMotionConfig } from '../../constants.ts';
import { useFrame, Vector3 } from '@react-three/fiber';
import { Group } from 'three';

type Options = {
  ref: Group | null;
  initialScale?: Vector3 | number;
  isCollected: boolean;
  isOutOfView?: boolean;
};

export const useCollectOnCollide = ({ ref, isCollected, initialScale, isOutOfView }: Options) => {
  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);
  const positionZ = useMotionValue(0);
  const scale = useMotionValue(0);

  useEffect(() => {
    if (isCollected) {
      animate(positionY, 0.5, framerMotionConfig);

      if (typeof initialScale === 'number') {
        animate(scale, initialScale + 0.04, framerMotionConfig);
      }

      setTimeout(() => {
        animate(positionX, -10);
      }, 400);
    }
  }, [positionX, positionY, positionZ, isCollected, scale, initialScale]);

  useFrame(() => {
    if (!ref || !isCollected || isOutOfView) return;

    ref!.position.x = positionX.get();
    ref!.position.y = positionY.get();
    ref!.position.z = positionZ.get();
    ref!.scale.x = scale.get();
    ref!.scale.y = scale.get();
    ref!.scale.z = scale.get();
  });
};
