import { useEffect } from 'react';
import { gameStatusAtom, pauseGameAtom, resumeGameAtom, startGameAtom } from '../../atoms/game.ts';
import { useAtomValue, useSetAtom } from 'jotai';
import { changePlayerAnimationAtom, movePlayerAtom } from '../../atoms/player.ts';

export const useKeyboard = () => {
  const status = useAtomValue(gameStatusAtom);
  const changePlayerAnimation = useSetAtom(changePlayerAnimationAtom);
  const movePlayer = useSetAtom(movePlayerAtom);
  const pauseGame = useSetAtom(pauseGameAtom);
  const resumeGame = useSetAtom(resumeGameAtom);
  const startGame = useSetAtom(startGameAtom);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (status === 'playing') {
        if (e.key === ' ') {
          pauseGame();
        }
        if (e.key === 'ArrowRight' || e.key === 'a') {
          movePlayer('right');
        } else if (e.key === 'ArrowLeft' || e.key === 'd') {
          movePlayer('left');
        } else if (e.key === 'ArrowUp' || e.key === 'w') {
          changePlayerAnimation({ animation: 'jump', revertToCurrentAnimation: true, delayBeforeRevert: 800 });
        } else if (e.key === 'ArrowDown' || e.key === 's') {
          changePlayerAnimation({ animation: 'lookBackRun', revertToCurrentAnimation: true, delayBeforeRevert: 800 });
        } else if (e.key === 'Escape') {
          pauseGame();
        }
      } else if (status === 'paused' && e.key === ' ') {
        resumeGame();
      } else if (status === 'idle' && e.key === ' ') {
        startGame();
      }
    };

    window.removeEventListener('keydown', handleKeyPress);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [changePlayerAnimation, movePlayer, pauseGame, resumeGame, startGame, status]);
};
