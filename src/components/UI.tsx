import { useGame } from '../hooks/useGame.js';

import { TopScore } from './Playing/TopScore.js';
import { BeforeGame } from './BeforeGame/index.js';
import { Button } from './Button.js';
import { useGesture } from '../hooks/useGesture.js';
import { Result } from './Result/Result.jsx';

export const UI = () => {
  const { status, dispatch } = useGame();

  const { onTouchEnd, onTouchMove, onTouchStart } = useGesture({
    onSwipeLeft: () => {
      dispatch({ type: 'move-left' });
    },
    onSwipeRight: () => {
      dispatch({ type: 'move-right' });
    },
    onSwipeUp: () => {
      dispatch({ type: 'jump' });
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
