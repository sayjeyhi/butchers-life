import { animate, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { framerMotionConfig } from '../../constants.ts';
import { useFrame } from '@react-three/fiber';

export const useCollectOnCollide = ({ ref, isColloid }: { ref: any; isColloid: boolean }) => {
  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);
  const positionZ = useMotionValue(0);

  useEffect(() => {
    if (isColloid) {
      animate(positionX, -1.9, framerMotionConfig);
      animate(positionY, 1.12, framerMotionConfig);
      animate(positionZ, 16, framerMotionConfig);
    }
  }, [positionX, positionY, positionZ, isColloid]);

  useFrame(() => {
    if (!ref) return;
    ref!.position.x = positionX.get();
    ref!.position.y = positionY.get();
    ref!.position.z = positionZ.get();
  });
};
