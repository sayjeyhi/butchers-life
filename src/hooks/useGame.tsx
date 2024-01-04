import { Dispatch, PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';

const GAME_TIME = 60;
const NB_ENEMIES = 3;

interface GameObject {
  id: number;
  position: [number, number, number];
}

interface LeaderBoardEntry {
  name: string;
  score: number;
}

interface GameState {
  status: 'start' | 'playing' | 'gameover' | 'paused';
  timer: number;
  enemies: GameObject[];
  coins: GameObject[];
  meats: GameObject[];
  showBomb: boolean;
  leaderBoard: LeaderBoardEntry[];
  playerPosition: string;
  playerAnimation: string;
}

function randomPosition(i: number): GameObject {
  return {
    id: i,
    position: [Math.random() * 10 - 5, 0.5, Math.random() * 10 - 5],
  };
}

function randomPositions(count: number) {
  return Array.from({ length: count }, (_, i) => randomPosition(i));
}

const initialState: GameState = {
  status: 'start', // start, playing, game over, paused
  timer: 0,
  enemies: randomPositions(NB_ENEMIES),
  coins: randomPositions(10),
  meats: randomPositions(10),
  showBomb: false,
  leaderBoard: [],
  playerPosition: 'center',
  playerAnimation: 'Running',
};

type GameStartAction = { type: 'start' };
type GameRestartAction = { type: 'restart' };
type GamePauseAction = { type: 'pause' };
type GameResumeAction = { type: 'resume' };
type GameJumpAction = { type: 'jump' };
type GameSitAction = { type: 'sit' };
type GameMoveLeftAction = { type: 'move-left' };
type GameMoveRightAction = { type: 'move-right' };
type GameHideBombAction = { type: 'hideBomb' };
type GameUpdateLoopAction = { type: 'updateLoop' };
type GameRespawnAction = { type: 'respawn' };

type GameAction =
  | GameStartAction
  | GameRestartAction
  | GamePauseAction
  | GameResumeAction
  | GameJumpAction
  | GameSitAction
  | GameMoveLeftAction
  | GameMoveRightAction
  | GameHideBombAction
  | GameUpdateLoopAction
  | GameRespawnAction;
const GameStateContext = createContext(initialState);
const GameStateDispatchContext = createContext<Dispatch<GameAction> | undefined>(undefined);

function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'start') {
    return {
      ...state,
      timer: GAME_TIME,
      status: 'playing',
      playerPosition: 'center',
      playerAnimation: 'Running',
    };
  }
  if (action.type === 'restart') {
    return {
      ...state,
      status: 'start',
      timer: 0,
      leaderBoard: [],
      playerPosition: 'center',
      playerAnimation: 'Running',
    };
  }
  if (action.type === 'pause') {
    return {
      ...state,
      status: 'paused',
    };
  }
  if (action.type === 'resume') {
    return {
      ...state,
      status: 'playing',
    };
  }
  if (action.type === 'jump') {
    return {
      ...state,
      playerAnimation: 'Jump',
    };
  }
  if (action.type === 'sit') {
    return {
      ...state,
      playerAnimation: 'Sit',
    };
  }
  if (action.type === 'move-left') {
    if (state.playerPosition === 'right') {
      return {
        ...state,
        playerPosition: 'center',
      };
    }
    return {
      ...state,
      playerPosition: 'left',
    };
  }
  if (action.type === 'move-right') {
    if (state.playerPosition === 'left') {
      return {
        ...state,
        playerPosition: 'center',
      };
    }
    return {
      ...state,
      playerPosition: 'right',
    };
  }

  if (action.type === 'hideBomb') {
    return {
      ...state,
      showBomb: false,
    };
  }

  if (state.status !== 'playing') {
    return state;
  }

  if (action.type === 'updateLoop') {
    // if (state.status === 'paused') return state;
    const timer = state.timer - 1;
    if (timer <= 0) {
      return {
        ...state,
        status: 'gameover',
      };
    }
    return {
      ...state,
      timer,
    };
  }

  return state;
}

export function GameProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

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

export const useGame = () => {
  const context = useContext(GameStateContext);
  const dispatch = useContext(GameStateDispatchContext)!;
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return {
    ...context,
    dispatch,
  };
};
