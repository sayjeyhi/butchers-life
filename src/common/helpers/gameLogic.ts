import { INITIAL_GAME_SPEED, MAX_GAME_SPEED, MIN_GAME_SPEED } from '../../constants.ts';

export const gameSpeed = (time: number) => {
  const initialSpeed = INITIAL_GAME_SPEED;
  const maxSpeed = MAX_GAME_SPEED;
  const accelerationFactor = 0.01;

  const elapsedTime = Math.max(time, MIN_GAME_SPEED);
  const sigmoid = (t: number) => 1 / (1 + Math.exp(-t));

  const sigmoidSpeed = initialSpeed + (maxSpeed - initialSpeed) * sigmoid(accelerationFactor * (elapsedTime - 15));

  return sigmoidSpeed / 20;
};
