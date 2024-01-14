import { ValueAnimationTransition } from 'framer-motion';

export const DEBUG_MODE = false;

export const ENEMY_COLUMNS = 3;
export const ENEMY_SPACE_COLUMN = 0.3;
export const ENEMY_SPACE_ROW = 4;
export const COIN_SPACE = 1.2;

export const INITIAL_GAME_SPEED = 3;
export const MIN_GAME_SPEED = 3;
export const MAX_GAME_SPEED = 400;
export const SPEED_ACCELERATION_FACTOR = 0.006;
export const GAME_BOARD_LENGTH = 31.404;

export const framerMotionConfig: ValueAnimationTransition = {
  type: 'keyframes',
  mass: 5,
  stiffness: 400,
  damping: 100,
  restDelta: 0.0001,
} as const;
