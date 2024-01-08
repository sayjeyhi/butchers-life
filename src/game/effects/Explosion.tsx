import { Instance, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Group, MathUtils, Vector3 } from 'three';

type AnimatedInstanceProps = {
  scale: number;
  target: Vector3;
  speed: number;
};

const AnimatedInstance = ({ scale, target, speed }: AnimatedInstanceProps) => {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;

    if (ref.current.scale.x > 0) {
      ref.current.scale.x = ref.current.scale.y = ref.current.scale.z -= speed * delta;
    }
    ref.current.position.lerp(target, speed);
  });

  return <Instance ref={ref} scale={scale} position={[0, 0, 0]} />;
};

export const Explosion = ({
  nb = 30,
  position = new Vector3(0, 0, 0),
  limitX = 0.3,
  limitY = 0.3,
  limitZ = 0.3,
  scale = 0.4,
}) => {
  const objects = useMemo(
    () =>
      Array.from({ length: nb }, () => ({
        target: new Vector3(
          MathUtils.randFloat(-limitX, limitX),
          MathUtils.randFloat(0, limitY),
          MathUtils.randFloat(-limitZ, limitZ),
        ),
        scale, //MathUtils.randFloat(0.03, 0.09),
        speed: MathUtils.randFloat(0.4, 0.6),
      })),
    [limitX, limitY, limitZ, nb, scale],
  );

  return (
    <group position={[position.x, position.y, position.z]}>
      <Instances>
        <torusGeometry />
        <meshStandardMaterial toneMapped={false} />
        {objects.map((box, i) => (
          <AnimatedInstance key={i} {...box} />
        ))}
      </Instances>
    </group>
  );
};
