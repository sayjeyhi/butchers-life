import { GameObject, UUID } from './types';
import { ghostsRandomPositions, randomPositions } from './utils';

interface LeaderBoardEntry {
  name: string;
  score: number;
}

type PlayerAnimation =
  | 'idle'
  | 'catwalk'
  | 'dancing'
  | 'drunkRun'
  | 'fastRun'
  | 'flip'
  | 'goofyRun'
  | 'headDownRun'
  | 'hipHopDance'
  | 'hitAndFall'
  | 'hitFromBackWhileRunning'
  | 'hitObstacle'
  | 'jump'
  | 'jumpOn'
  | 'lookBackRun'
  | 'runBackward'
  | 'runLookBack'
  | 'slowRun'
  | 'stopLookBack';

type CollisionType = 'coin' | 'knife' | 'meat' | 'grave' | 'spider' | 'nail';

interface GameState {
  status: 'idle' | 'playing' | 'game-over' | 'paused';
  timer: number;
  knifes: GameObject[];
  ghosts: GameObject[];
  coins: GameObject[];
  meats: GameObject[];
  graves: GameObject[];
  spiders: GameObject[];
  nails: GameObject[];
  showBomb: boolean;
  leaderBoard: LeaderBoardEntry[];
  playerPosition: string;
  playerAnimation: PlayerAnimation;
  achievedAward: number;
  achievedCoins: number;
  achievedMeats: number;
  achievedKnifes: number;
  lives: number;
}

export const initialState: GameState = {
  status: 'idle',
  timer: 0,
  ghosts: ghostsRandomPositions(3),
  coins: [],
  meats: [],
  knifes: [],
  graves: [],
  nails: [],
  spiders: [],
  showBomb: false,
  leaderBoard: [],
  playerPosition: 'center',
  playerAnimation: 'idle',
  achievedAward: 0,
  achievedCoins: 0,
  achievedMeats: 0,
  achievedKnifes: 0,
  lives: 300,
};

type GamePlayAction = { type: 'play' };
type GameRestartAction = { type: 'restart' };
type GamePauseAction = { type: 'pause' };
type GameResumeAction = { type: 'resume' };
type GameMoveLeftAction = { type: 'move-left' };
type GameMoveRightAction = { type: 'move-right' };
type GameHideBombAction = { type: 'hideBomb' };
type GameUpdateLoopAction = { type: 'updateLoop' };
type GameRespawnAction = { type: 'respawn' };
type GameIncreaseSpeedAction = { type: 'increase-speed' };
type GameAddRewardAction = { type: 'add-reward' };
type GameAddObstacleAction = { type: 'add-obstacle' };
type GameChangeCharacterAnimationAction = { type: 'setCharacterAnimation'; payload: PlayerAnimation };
type GameCollectOrHitAction = {
  type: 'collect-or-hit';
  payload: {
    type: CollisionType;
    award: number;
    damage: number;
    itemId: UUID;
  };
};

export type GameAction =
  | GamePlayAction
  | GameRestartAction
  | GamePauseAction
  | GameResumeAction
  | GameMoveLeftAction
  | GameMoveRightAction
  | GameHideBombAction
  | GameUpdateLoopAction
  | GameRespawnAction
  | GameCollectOrHitAction
  | GameAddRewardAction
  | GameIncreaseSpeedAction
  | GameAddObstacleAction
  | GameChangeCharacterAnimationAction;

const collectAudio = new Audio('/audios/collectcoin-6075.mp3');

export function gameStateReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'play') {
    return {
      ...state,
      status: 'playing',
      playerAnimation: 'slowRun',
    };
  }
  if (action.type === 'restart') {
    return {
      ...state,
      status: 'idle',
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
  if (action.type === 'add-obstacle') {
    const availableObstacles = ['graves', 'nails', 'spiders'] as const;
    const randomObstacle = availableObstacles[Math.floor(Math.random() * availableObstacles.length)];

    console.log('Obstacle added:', randomObstacle, state[randomObstacle]);

    return {
      ...state,
      [randomObstacle]: [...state[randomObstacle], ...randomPositions(1)],
    };
  }
  if (action.type === 'add-reward') {
    const availableRewards = ['coins', 'knifes', 'meats'] as const;
    const randomReward = availableRewards[Math.floor(Math.random() * availableRewards.length)];

    console.log('Reward added:', randomReward, state[randomReward]);
    return {
      ...state,
      [randomReward]: [...state[randomReward], ...randomPositions(8)],
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

    if (action.payload.type === 'coin' || action.payload.type === 'meat' || action.payload.type === 'knife') {
      const item = `${action.payload.type}s` as const;
      return {
        ...state,
        [item]: state[item].map((coin) => {
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
    } else if (action.payload.type === 'grave' || action.payload.type === 'spider' || action.payload.type === 'nail') {
      const item = `${action.payload.type}s` as const;
      return {
        ...state,
        lives: state.lives - action.payload.damage,
        ghosts: state.ghosts.map((enemy) => {
          const newPosition = [...enemy.position];
          newPosition[2] = newPosition[2] - 1;

          return {
            ...enemy,
            position: newPosition,
          } as GameObject;
        }),
        [item]: state[item].map((item) => {
          if (item.id === action.payload.itemId) {
            return {
              ...item,
              isCollected: true,
            };
          }
          return item;
        }),
      };
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
    const timer = state.timer + 1;
    if (state.lives <= 0) {
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
