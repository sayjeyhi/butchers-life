import { GameCanvas } from '../game/GameCanvas.tsx';
import { GameProvider } from '../game/GameProvider.tsx';
import { InGameOverlay } from '../game/InGameOverlay.tsx';

export function Play() {
  return (
    <GameProvider>
      <InGameOverlay />
      <GameCanvas />
    </GameProvider>
  );
}
