import { Instance, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Color, MathUtils, Vector3 } from 'three';

const greenColor = new Color('green');
greenColor.multiplyScalar(12);

const redColor = new Color('red');
redColor.multiplyScalar(12);

const whiteColor = new Color('white');
whiteColor.multiplyScalar(12);

const blueColor = new Color('blue');
blueColor.multiplyScalar(12);

const yellowColor = new Color('yellow');
yellowColor.multiplyScalar(12);

const colors = [greenColor, redColor, whiteColor, blueColor, yellowColor];

const AnimatedBox = ({ scale, target, speed, color }: any) => {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (!ref.current) return;

    if (ref.current.scale.x > 0) {
      ref.current.scale.x = ref.current.scale.y = ref.current.scale.z -= speed * delta;
    }
    ref.current.position.lerp(target, speed);
  });

  return <Instance ref={ref} scale={scale} position={[0, 0, 0]} color={color} />;
};

export const Explosion = ({
  nb = 30,
  position = new Vector3(0, 0, 0),
  limitX = 0.3,
  limitY = 0.3,
  limitZ = 0.3,
  scale = 0.4,
}) => {
  const boxes = useMemo(
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
        {boxes.map((box, i) => (
          <AnimatedBox key={i} {...box} />
        ))}
      </Instances>
    </group>
  );
};
