import { Html } from '@react-three/drei';

export function Loader() {
  return (
    <Html center>
      <div className="loader"></div>
      <div className="mt-8 text-center text-3xl text-white">Loading...</div>
    </Html>
  );
}
