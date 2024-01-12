import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';
import { PCFSoftShadowMap } from 'three';
import { DEBUG_MODE } from '../constants';
import { Game } from './Game';
import { Loader } from '../common/components/Loader.tsx';

export function GameCanvas() {
  return (
    <>
      <Canvas
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = PCFSoftShadowMap;
        }}
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.73, 20], fov: 10, near: 2 }}
      >
        <color attach="background" args={['#333']} />
        <fog attach={'fog'} args={['#333', 14, 40]} />
        <Suspense fallback={<Loader />}>
          <Physics gravity={[0, 0, 0]} debug={DEBUG_MODE} interpolate={false} colliders={false}>
            <Game />
          </Physics>
        </Suspense>

        {/*<EffectComposer>*/}
        {/*  <Bloom luminanceThreshold={0.23} luminanceSmoothing={0.3} height={300} />*/}
        {/*</EffectComposer>*/}
      </Canvas>
    </>
  );
}
