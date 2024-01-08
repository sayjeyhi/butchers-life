import { GameCanvas } from '../game/GameCanvas.tsx';
import { InGameOverlay } from '../game/InGameOverlay.tsx';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { startGameAtom } from '../atoms/game.ts';

export function Play() {
  const startGame = useSetAtom(startGameAtom);
  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <>
      <InGameOverlay />
      <GameCanvas />
    </>
  );
}
