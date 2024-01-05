import { Environment, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { GAMEBOARD_LENGTH, ENEMY_COLUMNS, ENEMY_SPACE_COLUMN, ENEMY_SPACE_ROW, COIN_SPACE } from './constants';
import { useGame } from './_hooks/useGame.tsx';
import { Explosion } from './Playing/effects/Explosion.tsx';
import { City } from './Playing/models/City.tsx';
import { Coin } from './Playing/models/rewards/Coin.tsx';
import { Meat } from './Playing/models/rewards/Meat.tsx';
import { Knife } from './Playing/models/rewards/Knife.tsx';
import { Spider } from './Playing/models/obstacles/Spider.tsx';
import { Grave } from './Playing/models/obstacles/Grave.tsx';
import { Butcher } from './Playing/models/Butcher.tsx';
import { Ghost } from './Playing/models/enemies/Ghost.tsx';
import { useKeyboard } from './_hooks/useKeyboard.ts';

export const ThreeD = () => {
  useKeyboard();
  const player = useRef(null);
  const { enemies, status, showBomb, coins, meats } = useGame();

  return (
    <>
      <OrbitControls />
      <Environment preset="sunset" />
      <directionalLight position={[-10, 1.4, 10]} intensity={0.2} />
      <directionalLight position={[10, 1.4, 10]} intensity={0.2} />
      <directionalLight position={[0, 50, 180]} intensity={0.1} />

      <group visible={status !== 'game-over'}>
        <City position-z={status === 'not-started' ? 80 : 0} />
        <City position-z={status === 'not-started' ? 80 : -GAMEBOARD_LENGTH} />
        <City position-z={status === 'not-started' ? 80 : GAMEBOARD_LENGTH} />

        {showBomb && <Explosion />}

        {enemies.map((_, index) => {
          const column = index % ENEMY_COLUMNS;
          const row = Math.floor(index / ENEMY_COLUMNS);
          const xPos = column * ENEMY_SPACE_COLUMN - ((ENEMY_COLUMNS - 1) * ENEMY_SPACE_COLUMN) / 2;
          return <Ghost scale={0.09} key={index} position-z={-15 - row * ENEMY_SPACE_ROW} position-x={xPos} />;
        })}
        {coins.map((_, index) => (
          <Coin
            scale={0.11}
            key={index}
            position-y={-0.01}
            position-z={20 + index * COIN_SPACE}
            position-x={-0.32}
            layers={1}
          />
        ))}
        {meats.map((_, index) => (
          <Meat scale={0.06} key={index} position-y={-0.01} position-z={30 + index * COIN_SPACE} position-x={0.32} />
        ))}

        <Knife position-y={0} position-z={18} scale={0.08} />
        <Grave position-y={0} position-z={26} scale={0.08} />
        <Spider position-y={0} position-z={15} position-x={0.32} scale={0.19} />
        <Butcher group={player} scale={0.09} />
      </group>
    </>
  );
};
