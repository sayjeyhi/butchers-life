import { Canvas } from '@react-three/fiber';
// import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { CuboidCollider, Physics } from '@react-three/rapier';

import { GameProvider } from './_hooks/useGame';
import { TwoD } from './2D';
import { ThreeD } from './3D';
import { Suspense } from 'react';
import * as THREE from 'three';
import { DEBUG_MODE } from './constants.ts';

function App() {
  return (
    <GameProvider>
      <TwoD />

      <Canvas
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.73, 20], fov: 10, near: 2 }}
      >
        <color attach="background" args={['#333']} />
        <fog attach={'fog'} args={['#333', 14, 40]} />
        <Suspense fallback={null}>
          <Physics gravity={[0, 0, 0]} debug={DEBUG_MODE} interpolate={false} colliders={false}>
            <ThreeD />
          </Physics>
        </Suspense>

        {/*<EffectComposer>*/}
        {/*  <Bloom luminanceThreshold={0.23} luminanceSmoothing={0.3} height={300} />*/}
        {/*</EffectComposer>*/}
      </Canvas>
    </GameProvider>
  );
}

export default App;
