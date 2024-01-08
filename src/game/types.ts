export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface GameObject {
  id: UUID;
  position: [number, number, number];
  isCollected: boolean;
}

export type GameStates = 'idle' | 'not-started' | 'playing' | 'paused' | 'game-over';

export type GameObstacleTypes = 'grave' | 'spider' | 'nail';
export type GameRewardTypes = 'coin' | 'meat' | 'knife';
export type GameObjectTypes = GameObstacleTypes | GameRewardTypes;

export type GameCollectPayload = {
  type: GameRewardTypes;
  award: number;
  itemId: string;
};
export type GameHitPayload = {
  type: GameObstacleTypes;
  damage: number;
  itemId: UUID;
};

export type GameCollidePayload = GameCollectPayload | GameHitPayload;

export type PlayerAnimation =
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

export type PlayerPosition = 'center' | 'left' | 'right';
