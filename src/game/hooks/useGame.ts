import { useContext } from 'react';
import { GameStateContext, GameStateDispatchContext } from '../GameProvider';

export function useGameDispatch() {
  const dispatch = useContext(GameStateDispatchContext)!;

  if (dispatch === undefined) {
    throw new Error('useGameDispatch must be used within a GameProvider');
  }
  return dispatch;
}

export function useGameState() {
  const state = useContext(GameStateContext);
  if (state === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return state;
}

export function useGame() {
  const state = useGameState();
  const dispatch = useGameDispatch();

  return {
    ...state,
    dispatch,
  };
}
