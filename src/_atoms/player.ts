import { atom } from 'jotai';
import { PlayerAnimation, PlayerPosition } from '../types';
import { coinsAtom } from './rewards.ts';

export const playerPositionAtom = atom<PlayerPosition>('center');
export const playerAnimationAtom = atom<PlayerAnimation>('idle');

export const changePlayerAnimation = atom(coinsAtom, (_, set, arg: PlayerAnimation) => {
  set(playerAnimationAtom, arg);
});

export const movePlayer = atom(coinsAtom, (_, set, arg: PlayerPosition) => {
  set(playerPositionAtom, arg);
});
