import { GameCanvas } from '../game/GameCanvas.tsx';
import { InGameOverlay } from '../game/InGameOverlay.tsx';

export function Play() {
  return (
    <>
      <InGameOverlay />
      <GameCanvas />
    </>
  );
}
