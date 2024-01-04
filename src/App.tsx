import { Canvas } from '@react-three/fiber';
// import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Physics } from '@react-three/rapier';

import { GameProvider } from './_hooks/useGame';
import { TwoD } from './2D';
import { ThreeD } from './3D';
import { Suspense } from 'react';

function App() {
  return (
    <GameProvider>
      <TwoD />

      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0.73, 20], fov: 10, near: 2 }}>
        <color attach="background" args={['#333']} />
        <fog attach={'fog'} args={['#333', 14, 40]} />
        <Suspense fallback={null}>
          <Physics>
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
