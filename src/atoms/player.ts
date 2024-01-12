import { atom } from 'jotai';
import { PlayerAnimation, PlayerPosition } from '../game/types';
import { coinsAtom } from './rewards.ts';

export const playerPositionAtom = atom<PlayerPosition>('center');
export const playerAnimationAtom = atom<PlayerAnimation>('idle');

export const changePlayerAnimationAtom = atom(
  coinsAtom,
  (_, set, arg: { animation: PlayerAnimation; revertToCurrentAnimation?: boolean; delayBeforeRevert?: number }) => {
    set(playerAnimationAtom, arg.animation);

    if (arg.revertToCurrentAnimation) {
      setTimeout(() => {
        set(playerAnimationAtom, 'slowRun');
      }, arg.delayBeforeRevert || 800);
    }
  },
);

export const movePlayerAtom = atom(coinsAtom, (get, set, arg: PlayerPosition) => {
  const currentPlayerPosition = get(playerPositionAtom);

  if ((arg === 'left' && currentPlayerPosition === 'right') || (arg === 'right' && currentPlayerPosition === 'left')) {
    set(playerPositionAtom, 'center');
  }

  if (
    (arg === 'left' && currentPlayerPosition === 'center') ||
    (arg === 'right' && currentPlayerPosition === 'center')
  ) {
    set(playerPositionAtom, arg);
  }
});
