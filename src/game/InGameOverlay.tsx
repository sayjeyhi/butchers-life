import { Idle } from './Idle';
import { Result } from './Result';
import { TopScore } from './TopScore';
import { useGesture } from './hooks/useGesture';
import { useSetAtom, useAtomValue } from 'jotai';
import { changePlayerAnimationAtom, movePlayerAtom } from '../atoms/player.ts';
import { gameStatusAtom } from '../atoms/game.ts';

export function InGameOverlay() {
  const status = useAtomValue(gameStatusAtom);
  const movePlayer = useSetAtom(movePlayerAtom);
  const changePlayerAnimation = useSetAtom(changePlayerAnimationAtom);

  const { onTouchEnd, onTouchMove, onTouchStart } = useGesture({
    onSwipeLeft: () => {
      movePlayer('left');
    },
    onSwipeRight: () => {
      movePlayer('right');
    },
    onSwipeUp: () => {
      changePlayerAnimation({ animation: 'jump', revertToCurrentAnimation: true, delayBeforeRevert: 800 });
    },
    onSwipeDown: () => {
      changePlayerAnimation({ animation: 'stopLookBack', revertToCurrentAnimation: true, delayBeforeRevert: 800 });
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
