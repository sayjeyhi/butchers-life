import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Experience } from './components/Experience';
import { UI } from './components/UI';
import { GameProvider } from './hooks/useGame';
import { Stage } from '@react-three/drei';

export const DEBUG_MODE = false;

export const ENEMY_COLUMNS = 3;
export const ENEMY_SPACE_COLUMN = 0.3;
export const ENEMY_SPACE_ROW = 4;
export const COIN_SPACE = 1.6;
export const SCROLL_SPEED = 3;
export const GAMEBOARD_LENGTH = 31.404;

function App() {
  return (
    <GameProvider>
      <UI />
      <Canvas shadows camera={{ position: [0, 0.73, 20], fov: 10 }}>
        <color attach="background" args={['#333']} />
        <fog attach={'fog'} args={['#333', 14, 40]} />

        <Experience />
      </Canvas>
    </GameProvider>
  );
}

export default App;
