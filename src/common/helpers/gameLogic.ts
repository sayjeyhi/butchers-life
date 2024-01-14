import { INITIAL_GAME_SPEED, MAX_GAME_SPEED, MIN_GAME_SPEED, SPEED_ACCELERATION_FACTOR } from '../../constants.ts';

export const gameSpeed = (time: number) => {
  const elapsedTime = Math.max(time, MIN_GAME_SPEED);
  const sigmoid = (t: number) => 1 / (1 + Math.exp(-t));

  const sigmoidSpeed =
    INITIAL_GAME_SPEED +
    (MAX_GAME_SPEED - INITIAL_GAME_SPEED) * sigmoid(SPEED_ACCELERATION_FACTOR * (elapsedTime - 15));

  return sigmoidSpeed / 20;
};
