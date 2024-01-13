import { atom } from 'jotai';
import { GameStates } from '../game/types.ts';
import { playerAnimationAtom } from './player.ts';
import { resetGame } from '../common/helpers/atoms.ts';
import { timeAtom } from './score.ts';
import { addRewardsAtom } from './rewards.ts';
import { addObstaclesAtom } from './obstacles.ts';

let timerRef: NodeJS.Timeout;

export const gameStatusAtom = atom<GameStates>('not-started');

export const getReadyAtom = atom(gameStatusAtom, (get, set) => {
  const currentState = get(gameStatusAtom);

  if (currentState === 'not-started') {
    set(gameStatusAtom, 'idle');
    set(playerAnimationAtom, 'idle');
  }
});

export const startGameAtom = atom(gameStatusAtom, (get, set) => {
  set(gameStatusAtom, 'playing');
  set(playerAnimationAtom, 'slowRun');

  // start timer
  timerRef = setInterval(() => {
    set(timeAtom, (time) => time + 1);
    const time = get(timeAtom);

    // add rewards and obstacles
    // bring new enemies every 5 seconds
    if (time % 5 === 0) {
      // add rewards
    }
  }, 1000);
});

export const pauseGameAtom = atom(gameStatusAtom, (_, set) => {
  set(gameStatusAtom, 'paused');

  // pause timer
  clearInterval(timerRef);
});
export const resumeGameAtom = atom(gameStatusAtom, (_, set) => {
  set(gameStatusAtom, 'playing');

  // resume timer
  timerRef = setInterval(() => {
    set(timeAtom, (time) => time + 1);
  }, 1000);
});

export const restartGameAtom = atom(gameStatusAtom, (_, set) => {
  resetGame(set);

  // reset timer
  clearInterval(timerRef);
});
