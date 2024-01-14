import { atom } from 'jotai';
import { Product } from '../game/types.ts';
import { atomWithStorage } from 'jotai/utils';

type BasketItem = Product & { quantity: number };

export const basketItemsAtom = atomWithStorage<BasketItem[]>('basket', []);

export const addBasketItemAtom = atom(
  (get) => get(basketItemsAtom),
  (get, set, item: Product) => {
    const items = get(basketItemsAtom);
    const index = items.findIndex((i) => i.id === item.id);
    if (index === -1) {
      const newItem = { ...item, quantity: 1 };
      set(basketItemsAtom, [...items, newItem]);
    } else {
      const newItems = [...items];
      newItems[index].quantity += 1;
      set(basketItemsAtom, newItems);
    }
  },
);

export const removeBasketItemAtom = atom(
  (get) => get(basketItemsAtom),
  (get, set, id: string) => {
    const items = get(basketItemsAtom);
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return;
    const newItems = [...items];
    newItems.splice(index, 1);
    set(basketItemsAtom, newItems);
  },
);
