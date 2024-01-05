import { useEffect } from 'react';
import { useGame } from './useGame.jsx';

export const useKeyboard = () => {
  const { dispatch, status } = useGame();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (status === 'playing') {
        if (e.key === ' ') {
          dispatch({ type: 'pause' });
        }
        if (e.key === 'ArrowRight' || e.key === 'a') {
          dispatch({ type: 'move-right' });
        } else if (e.key === 'ArrowLeft' || e.key === 'd') {
          dispatch({ type: 'move-left' });
        } else if (e.key === 'ArrowUp' || e.key === 'w') {
          dispatch({ type: 'setCharacterAnimation', payload: 'jump' });
          setTimeout(() => {
            dispatch({ type: 'setCharacterAnimation', payload: 'slowRun' });
          }, 800);
        } else if (e.key === 'ArrowDown' || e.key === 's') {
          dispatch({ type: 'sit' });
        } else if (e.key === 'Escape') {
          dispatch({ type: 'pause' });
        }
      } else if (status === 'paused') {
        dispatch({ type: 'resume' });
      } else if (status === 'not-started') {
        dispatch({ type: 'start' });
      } else if (status === 'idle') {
        dispatch({ type: 'play' });
      }
    };

    window.removeEventListener('keydown', handleKeyPress);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [status]);
};