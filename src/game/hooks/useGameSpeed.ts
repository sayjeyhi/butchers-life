import { timeAtom } from '../../atoms/score.ts';
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { INITIAL_GAME_SPEED, MAX_GAME_SPEED, MIN_GAME_SPEED } from '../../constants';

export const useGameSpeed = () => {
  const time = useAtomValue(timeAtom);

  return useCallback((): number => {
    const initialSpeed = INITIAL_GAME_SPEED;
    const maxSpeed = MAX_GAME_SPEED;
    const accelerationFactor = 0.01;

    const elapsedTime = Math.max(time, MIN_GAME_SPEED);
    // const currentSpeed = initialSpeed * elapsedTime * acceleration;
    // const limitedSpeed = Math.min(currentSpeed, maxSpeed);

    // Sigmoid function to control acceleration
    const sigmoid = (t: number) => 1 / (1 + Math.exp(-t));

    const sigmoidSpeed = initialSpeed + (maxSpeed - initialSpeed) * sigmoid(accelerationFactor * (elapsedTime - 15));

    const speed = sigmoidSpeed / 20;

    console.log('speed', speed);
    return speed;
  }, [time]);
};
