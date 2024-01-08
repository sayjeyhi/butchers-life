import { GameObject } from './types';

export function randomPosition(x: number = 0): GameObject {
  return {
    id: crypto.randomUUID(),
    isCollected: false,
    position: [x, 0, 18],
  };
}

export function randomPositions(count: number) {
  const randomX = [-0.32, 0, 0, 0.32][Math.floor(Math.random() * 4)];
  return Array.from({ length: count }, () => randomPosition(randomX));
}

export function ghostsRandomPositions(count: number): GameObject[] {
  return randomPositions(count).map((enemy) => {
    const newPosition = [...enemy.position];
    newPosition[2] = Math.abs(newPosition[2]);
    return { ...enemy, position: newPosition } as GameObject;
  });
}
