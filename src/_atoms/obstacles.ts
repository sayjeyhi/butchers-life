import { atom } from 'jotai';
import { GameHitPayload, GameObject } from '../types.ts';
import { checkAndCollectItem, randomPositions } from '../_helpers/gameObjects.ts';
import { livesAtom } from './score.ts';
import { gameStatusAtom } from './game.ts';
import { resetGame } from '../_helpers/atoms.ts';

export const gravesAtom = atom<GameObject[]>([]);
export const nailsAtom = atom<GameObject[]>([]);
export const spidersAtom = atom<GameObject[]>([]);

export const addObstacles = atom(gravesAtom, (_, set) => {
  const availableObstacles = ['graves', 'nails', 'spiders'] as const;
  const randomObstacle = availableObstacles[Math.floor(Math.random() * availableObstacles.length)];

  const randomPosition = randomPositions(1);
  switch (randomObstacle) {
    case 'graves':
      set(gravesAtom, (graves) => [...graves, ...randomPosition]);
      break;
    case 'nails':
      set(nailsAtom, (nails) => [...nails, ...randomPosition]);
      break;
    case 'spiders':
      set(spidersAtom, (spiders) => [...spiders, ...randomPosition]);
      break;
  }
});

export const hitObstacles = atom(gravesAtom, (get, set, arg: GameHitPayload) => {
  const item = `${arg.type}s` as const;

  set(livesAtom, (life) => life - arg.damage);

  switch (item) {
    case 'graves':
      set(gravesAtom, (graves) => graves.map((grave) => checkAndCollectItem(grave, arg.itemId)));
      break;
    case 'nails':
      set(nailsAtom, (nails) => nails.map((nail) => checkAndCollectItem(nail, arg.itemId)));
      break;
    case 'spiders':
      set(spidersAtom, (spiders) => spiders.map((spider) => checkAndCollectItem(spider, arg.itemId)));
      break;
  }

  // check death
  if (get(livesAtom) <= 0) {
    resetGame(set);

    set(gameStatusAtom, 'game-over');
  }
});
