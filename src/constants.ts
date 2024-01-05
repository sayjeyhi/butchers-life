export const DEBUG_MODE = false;

export const ENEMY_COLUMNS = 3;
export const ENEMY_SPACE_COLUMN = 0.3;
export const ENEMY_SPACE_ROW = 4;
export const COIN_SPACE = 1.2;
export const SCROLL_SPEED = 3;
export const GAMEBOARD_LENGTH = 31.404;

export const framerMotionConfig = {
  type: 'spring',
  mass: 5,
  stiffness: 400,
  damping: 100,
  restDelta: 0.0001,
} as const;
