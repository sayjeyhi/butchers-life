import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { GameProvider } from './_hooks/useGame';
import { TwoD } from './2D';
import { ThreeD } from './3D';

function App() {
  return (
    <GameProvider>
      <TwoD />

      <Canvas shadows camera={{ position: [0, 0.73, 20], fov: 10 }}>
        <color attach="background" args={['#333']} />
        <fog attach={'fog'} args={['#333', 14, 40]} />
        <ThreeD />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>
    </GameProvider>
  );
}

export default App;
