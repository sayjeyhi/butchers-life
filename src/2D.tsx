import { useGame } from './_hooks/useGame.tsx';

import { TopScore } from './Playing/TopScore.tsx';
import { BeforeGame } from './BeforeGame';
import { useGesture } from './_hooks/useGesture.ts';
import { Result } from './Result/Result.tsx';

export const TwoD = () => {
  const { status, dispatch } = useGame();

  const { onTouchEnd, onTouchMove, onTouchStart } = useGesture({
    onSwipeLeft: () => {
      dispatch({ type: 'move-left' });
    },
    onSwipeRight: () => {
      dispatch({ type: 'move-right' });
    },
    onSwipeUp: () => {
      dispatch({ type: 'setCharacterAnimation', payload: 'jump' });
      setTimeout(() => {
        dispatch({ type: 'setCharacterAnimation', payload: 'slowRun' });
      }, 800);
    },
    onSwipeDown: () => {
      dispatch({ type: 'sit' });
    },
  });

  return (
    <main
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
      className="pointer-events-auto fixed bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full flex-col items-stretch justify-between gap-4"
    >
      {status === 'start' && <BeforeGame />}
      <div className="absolute top-0 w-full p-4">
        {status === 'gameover' && <Result />}
        {(status === 'playing' || status === 'paused') && <TopScore />}
      </div>
    </main>
  );
};
