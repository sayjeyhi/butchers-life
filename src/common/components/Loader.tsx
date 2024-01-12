import { Html, useProgress } from '@react-three/drei';

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-2xl text-white ">{(100 - progress).toFixed(0)}%</div>
    </Html>
  );
}
