import { animate, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { framerMotionConfig } from '../../constants.ts';
import { useFrame } from '@react-three/fiber';

type Options = {
  ref: any;
  initialScale: number;
  isColloid: boolean;
};

export const useCollectOnCollide = ({ ref, isColloid, initialScale }: Options) => {
  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);
  const positionZ = useMotionValue(0);
  const scale = useMotionValue(0);

  useEffect(() => {
    if (isColloid) {
      animate(positionY, 0.5, framerMotionConfig);
      animate(scale, initialScale + 0.04, framerMotionConfig);

      setTimeout(() => {
        animate(positionX, -10);
      }, 400);
    }
  }, [positionX, positionY, positionZ, isColloid, scale, initialScale]);

  useFrame(() => {
    if (!ref || !isColloid) return;

    ref!.position.x = positionX.get();
    ref!.position.y = positionY.get();
    ref!.position.z = positionZ.get();
    ref!.scale.x = scale.get();
    ref!.scale.y = scale.get();
    ref!.scale.z = scale.get();
  });
};
