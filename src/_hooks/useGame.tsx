import { Dispatch, PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';

const GAME_TIME = 60;
const NB_ENEMIES = 3;

interface GameObject {
  id: number;
  position: [number, number, number];
  isCollected: boolean;
}

interface LeaderBoardEntry {
  name: string;
  score: number;
}

interface GameState {
  status: 'idle' | 'not-started' | 'playing' | 'game-over' | 'paused';
  timer: number;
  knifes: GameObject[];
  ghosts: GameObject[];
  coins: GameObject[];
  meats: GameObject[];
  grave: GameObject;
  spider: GameObject;
  nail: GameObject;
  showBomb: boolean;
  leaderBoard: LeaderBoardEntry[];
  playerPosition: string;
  playerAnimation: string;
  achievedAward: number;
  achievedCoins: number;
  achievedMeats: number;
  achievedKnifes: number;
  lives: number;
}

function ghostsRandomPositions(count: number) {
  return randomPositions(count).map((enemy) => {
    const newPosition = [...enemy.position];
    newPosition[2] = Math.abs(newPosition[2]);
    return { ...enemy, position: newPosition };
  });
}

function randomPosition(i: number): GameObject {
  return {
    id: i,
    isCollected: false,
    position: [Math.random() * 10 - 5, 0.5, Math.random() * 10 - 5],
  };
}

function randomPositions(count: number) {
  return Array.from({ length: count }, (_, i) => randomPosition(i));
}

const initialState: GameState = {
  status: 'not-started',
  timer: GAME_TIME,
  ghosts: ghostsRandomPositions(NB_ENEMIES),
  coins: randomPositions(10),
  meats: randomPositions(10),
  knifes: randomPositions(10),
  grave: randomPosition(0),
  nail: randomPosition(0),
  spider: randomPosition(0),
  showBomb: false,
  leaderBoard: [],
  playerPosition: 'center',
  playerAnimation: 'idle',
  achievedAward: 0,
  achievedCoins: 0,
  achievedMeats: 0,
  achievedKnifes: 0,
  lives: 100,
};

type GameStartAction = { type: 'start' };
type GamePlayAction = { type: 'play' };
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
type GameChangeCharacterAnimationAction = { type: 'setCharacterAnimation'; payload: string };
type GameCollectOrHitAction = {
  type: 'collect-or-hit';
  payload: {
    type: 'coin' | 'meat' | 'knife' | 'enemy';
    award: number;
    damage: number;
    itemId: number;
    isEnemy?: boolean;
  };
};

type GameAction =
  | GameStartAction
  | GamePlayAction
  | GameRestartAction
  | GamePauseAction
  | GameResumeAction
  | GameJumpAction
  | GameSitAction
  | GameMoveLeftAction
  | GameMoveRightAction
  | GameHideBombAction
  | GameUpdateLoopAction
  | GameRespawnAction
  | GameCollectOrHitAction
  | GameChangeCharacterAnimationAction;

const GameStateContext = createContext(initialState);
const GameStateDispatchContext = createContext<Dispatch<GameAction> | undefined>(undefined);

const collectAudio = new Audio('/audios/collectcoin-6075.mp3');

function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'start') {
    return {
      ...initialState,
      status: 'idle',
      playerAnimation: 'idle',
    };
  }
  if (action.type === 'play') {
    return {
      ...initialState,
      status: 'playing',
      playerAnimation: 'slowRun',
    };
  }
  if (action.type === 'restart') {
    return {
      ...state,
      status: 'not-started',
      timer: 0,
      leaderBoard: [],
      playerPosition: 'center',
      playerAnimation: 'slowRun',
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
  if (action.type === 'setCharacterAnimation') {
    return {
      ...state,
      playerAnimation: action.payload,
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

  if (action.type === 'collect-or-hit') {
    // play sound
    if (['coin', 'knife', 'meat'].includes(action.payload.type)) {
      collectAudio.currentTime = 0;
      collectAudio.play();
    }
    if (action.payload.isEnemy) {
      console.log('payload', action.payload);
      return {
        ...state,
        lives: state.lives - action.payload.damage,
        ghosts: state.ghosts.map((enemy) => {
          const newPosition = [...enemy.position];
          newPosition[2] = newPosition[2] - 1;

          return {
            ...enemy,
            position: newPosition,
          };
        }),
      };
    } else if (action.payload.type === 'coin') {
      console.log('payload', action.payload);
      return {
        ...state,
        coins: state.coins.map((coin) => {
          if (coin.id === action.payload.itemId) {
            return {
              ...coin,
              isCollected: true,
            };
          }
          return coin;
        }),
        achievedAward: state.achievedAward + action.payload.award,
        achievedCoins: state.achievedCoins++,
      };
    } else if (action.payload.type === 'knife') {
      return {
        ...state,
        knifes: state.knifes.map((knife) => {
          if (knife.id === action.payload.itemId) {
            return {
              ...knife,
              isCollected: true,
            };
          }
          return knife;
        }),
        achievedAward: state.achievedAward + action.payload.award,
        achievedKnifes: state.achievedKnifes++,
      };
    } else if (action.payload.type === 'meat') {
      return {
        ...state,
        meats: state.meats.map((meat) => {
          if (meat.id === action.payload.itemId) {
            return {
              ...meat,
              isCollected: true,
            };
          }
          return meat;
        }),
        achievedAward: state.achievedAward + action.payload.award,
        achievedMeats: state.achievedMeats++,
      };
    }

    if (action.payload.type === 'enemy') {
      console.log('enemy hit', action.payload.damage);
    }
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
    if (state.lives <= 0 || timer <= 0) {
      return {
        ...state,
        status: 'game-over',
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
