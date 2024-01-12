import { animate, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { framerMotionConfig } from '../../constants.ts';
import { useFrame } from '@react-three/fiber';

export const useCollectOnCollideEnemy = ({ ref, isCollected }: { ref: any; isCollected: boolean }) => {
  const positionY = useMotionValue(0);
  const positionZ = useMotionValue(0);

  useEffect(() => {
    if (isCollected) {
      animate(positionY, -0.3, framerMotionConfig);
      animate(positionZ, 2, framerMotionConfig);
    }
  }, [positionY, positionZ, isCollected]);

  useFrame(() => {
    if (!ref) return;
    ref!.position.y = positionY.get();
    ref!.position.z = positionZ.get();
  });
};
