import { timeAtom } from '../../atoms/score.ts';
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { gameSpeed } from '../../common/helpers/gameLogic.ts';

export const useGameSpeed = () => {
  const time = useAtomValue(timeAtom);

  return useCallback((): number => {
    return gameSpeed(time);
  }, [time]);
};
