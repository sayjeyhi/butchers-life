import { Dispatch, PropsWithChildren, createContext, useEffect, useReducer } from 'react';
import { GameAction, gameStateReducer, initialState } from './gameState';

export const GameStateContext = createContext(initialState);
export const GameStateDispatchContext = createContext<Dispatch<GameAction> | undefined>(undefined);

export function GameProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialState);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      dispatch({ type: 'updateLoop' });
    }, 1000);
    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      dispatch({ type: 'respawn' });
    }, 100);
    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    if (!gameState.showBomb) return;
    const timeout = setTimeout(() => {
      dispatch({ type: 'hideBomb' });
    }, 900);
    return () => clearTimeout(timeout);
  }, [gameState.showBomb]);

  return (
    <GameStateDispatchContext.Provider value={dispatch}>
      <GameStateContext.Provider value={gameState}>{children}</GameStateContext.Provider>
    </GameStateDispatchContext.Provider>
  );
}
