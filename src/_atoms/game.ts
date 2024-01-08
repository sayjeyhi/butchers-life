import { atom } from 'jotai';
import { GameStates } from '../types.ts';
import { playerAnimationAtom } from './player.ts';
import { resetGame } from '../_helpers/atoms.ts';
import { timeAtom } from './score.ts';

let timerRef: NodeJS.Timeout;

export const gameStatusAtom = atom<GameStates>('not-started');

export const getReady = atom(gameStatusAtom, (get, set) => {
  const currentState = get(gameStatusAtom);

  if (currentState === 'not-started') {
    set(gameStatusAtom, 'idle');
    set(playerAnimationAtom, 'idle');
  }
});

export const startGame = atom(gameStatusAtom, (_, set) => {
  set(gameStatusAtom, 'playing');
  set(playerAnimationAtom, 'slowRun');

  timerRef = setInterval(() => {
    set(timeAtom, (time) => time + 1);
  }, 1000);
});

export const pauseGame = atom(gameStatusAtom, (_, set) => {
  set(gameStatusAtom, 'paused');

  // pause timer
  clearInterval(timerRef);
});
export const resumeGame = atom(gameStatusAtom, (_, set) => {
  set(gameStatusAtom, 'playing');

  // resume timer
  timerRef = setInterval(() => {
    set(timeAtom, (time) => time + 1);
  }, 1000);
});

export const restartGame = atom(gameStatusAtom, (_, set) => {
  resetGame(set);

  // reset timer
  clearInterval(timerRef);
});
