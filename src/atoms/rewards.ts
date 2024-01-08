import { atom } from 'jotai';
import { GameCollectPayload, GameObject } from '../game/types.ts';
import { checkAndCollectItem, randomPositions } from '../common/helpers/gameObjects.ts';
import { achievedAwardAtom, achievedCoinsAtom, achievedMeatsAtom, achievedKnifesAtom } from './score.ts';

export const coinsAtom = atom<GameObject[]>([]);
export const meatsAtom = atom<GameObject[]>([]);
export const knifesAtom = atom<GameObject[]>([]);

export const addRewardsAtom = atom(coinsAtom, (_, set) => {
  const availableRewards = ['coins', 'knifes', 'meats'] as const;
  const randomReward = availableRewards[Math.floor(Math.random() * availableRewards.length)];

  const randomPosition = randomPositions(8);
  switch (randomReward) {
    case 'coins':
      set(coinsAtom, (coins) => [...coins, ...randomPosition]);
      break;
    case 'meats':
      set(meatsAtom, (meats) => [...meats, ...randomPosition]);
      break;
    case 'knifes':
      set(knifesAtom, (knifes) => [...knifes, ...randomPosition]);
      break;
  }
});

export const collectRewardAtom = atom(coinsAtom, (_, set, arg: GameCollectPayload) => {
  const item = `${arg.type}s` as const;

  set(achievedAwardAtom, (awards) => awards + arg.award);

  switch (item) {
    case 'coins':
      set(achievedCoinsAtom, (coinsCount) => coinsCount + 1);
      set(coinsAtom, (coins) => coins.map((coin) => checkAndCollectItem(coin, arg.itemId)));
      break;
    case 'meats':
      set(achievedMeatsAtom, (meatsCount) => meatsCount + 1);
      set(meatsAtom, (meats) => meats.map((meat) => checkAndCollectItem(meat, arg.itemId)));
      break;
    case 'knifes':
      set(achievedKnifesAtom, (knifesCount) => knifesCount + 1);
      set(knifesAtom, (knifes) => knifes.map((knife) => checkAndCollectItem(knife, arg.itemId)));
      break;
  }
});
