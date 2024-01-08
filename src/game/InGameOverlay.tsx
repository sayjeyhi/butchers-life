import { Idle } from './Idle';
import { Result } from './Result';
import { TopScore } from './TopScore';
import { useGame } from './hooks/useGame';
import { useGesture } from './hooks/useGesture';

export function InGameOverlay() {
  const { dispatch, status } = useGame();
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
    <div
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
      className="pointer-events-auto fixed inset-0 z-10 flex h-full w-full flex-col items-stretch justify-between gap-4"
    >
      {status === 'idle' && <Idle />}
      <div className="absolute top-0 w-full p-4">
        {status === 'game-over' && <Result />}
        {(status === 'playing' || status === 'paused') && <TopScore />}
      </div>
    </div>
  );
}
