import { v4 as uuidv4 } from 'uuid';
import { GameObject } from '../../game/types.ts';
import { UUID } from '../../game/types.ts';

export function randomPositions(count: number): GameObject[] {
  const randomX = [-0.32, 0, 0, 0.32][Math.floor(Math.random() * 4)];

  return Array.from({ length: count }, () => {
    return {
      id: uuidv4() as UUID,
      isCollected: false,
      position: [randomX, 0, 16],
    };
  });
}

export const checkAndCollectItem = (item: GameObject, itemId: string): GameObject => {
  if (item.id === itemId) {
    return {
      ...item,
      isCollected: true,
    };
  }
  return item;
};
