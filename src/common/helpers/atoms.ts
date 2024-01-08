import { Setter } from 'jotai';
import { gameStatusAtom } from '../../atoms/game.ts';
import { playerAnimationAtom, playerPositionAtom } from '../../atoms/player.ts';
import { coinsAtom, knifesAtom, meatsAtom } from '../../atoms/rewards.ts';
import { ghostsAtom } from '../../atoms/enemies.ts';
import { gravesAtom, nailsAtom, spidersAtom } from '../../atoms/obstacles.ts';

export const resetGame = (set: Setter) => {
  set(gameStatusAtom, 'not-started');

  // rewards
  set(coinsAtom, []);
  set(meatsAtom, []);
  set(knifesAtom, []);

  // obstacles
  set(gravesAtom, []);
  set(spidersAtom, []);
  set(nailsAtom, []);

  // enemies
  set(ghostsAtom, []);

  // player
  set(playerPositionAtom, 'center');
  set(playerAnimationAtom, 'idle');
};
