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
  const player = useRef();
  const { enemies, status, showBomb, coins, meats } = useGame();


  return (
    <>
      <OrbitControls />
      <Environment preset="sunset" />
      <directionalLight position={[-10, 1.4, 10]} intensity={0.2} />
      <directionalLight position={[10, 1.4, 10]} intensity={0.2} />
      <directionalLight position={[0, 50, 180]} intensity={0.1} />

      <group visible={status === 'playing' || status === 'paused'}>
        <City position-z={status === 'start' ? 42 : 0} />
        <City position-z={status === 'start' ? 42 : -GAMEBOARD_LENGTH} />
        <City position-z={status === 'start' ? 42 : GAMEBOARD_LENGTH} />

        {showBomb && <Explosion />}
        {enemies.map((_, index) => {
          const column = index % ENEMY_COLUMNS;
          const row = Math.floor(index / ENEMY_COLUMNS);
          const xPos = column * ENEMY_SPACE_COLUMN - ((ENEMY_COLUMNS - 1) * ENEMY_SPACE_COLUMN) / 2;
          return (
            <group key={index} position-z={-15 - row * ENEMY_SPACE_ROW} position-x={xPos}>
              <Ghost scale={0.09} />
            </group>
          );
        })}
        {coins.map((_, index) => (
          <group key={index} position-z={20 + index * COIN_SPACE} position-x={-0.32}>
            <Coin scale={0.09} />
          </group>
        ))}
        {meats.map((_, index) => (
          <group key={index} position-z={30 + index * COIN_SPACE} position-x={0.32}>
            <Meat scale={0.06} />
          </group>
        ))}


        <Grave position-y={0} position-z={23} scale={0.08} />
        <Knife position-y={0} position-z={20} scale={0.08} />
        <Spider position-y={0} position-z={15} position-x={0.32} scale={0.19} />
      </group>

      <Butcher group={player} position-z={4} scale={0.09} />
    </>
  );
};
