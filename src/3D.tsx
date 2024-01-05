import { Environment, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Explosion } from './Playing/effects/Explosion.tsx';
import { Butcher } from './Playing/models/Butcher.tsx';
import { City } from './Playing/models/City.tsx';
import { Ghost } from './Playing/models/enemies/Ghost.tsx';
import { Grave } from './Playing/models/obstacles/Grave.tsx';
import { Spider } from './Playing/models/obstacles/Spider.tsx';
import { Nail } from './Playing/models/obstacles/Nail.tsx';
import { Coin } from './Playing/models/rewards/Coin.tsx';
import { Knife } from './Playing/models/rewards/Knife.tsx';
import { Meat } from './Playing/models/rewards/Meat.tsx';
import { useGame } from './_hooks/useGame.tsx';
import { useKeyboard } from './_hooks/useKeyboard.ts';
import { COIN_SPACE, ENEMY_COLUMNS, ENEMY_SPACE_COLUMN, GAMEBOARD_LENGTH } from './constants';

export const ThreeD = () => {
  useKeyboard();
  const player = useRef(null);
  const { grave, nail, spider, ghosts, status, showBomb, coins, meats, knifes } = useGame();

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

        {ghosts.map((_, index) => {
          const column = index % ENEMY_COLUMNS;
          const xPos = column * ENEMY_SPACE_COLUMN - ((ENEMY_COLUMNS - 1) * ENEMY_SPACE_COLUMN) / 2;
          return <Ghost scale={0.09} key={index} position-z={-15 - _.position[2]} position-x={xPos} />;
        })}

        {coins.map((_, index) => (
          <Coin
            scale={0.11}
            key={index}
            itemId={coins[index].id}
            isCollected={coins[index].isCollected}
            position-x={knifes[index].position[0]}
            position-y={knifes[index].position[1]}
            position-z={knifes[index].position[2] + index * COIN_SPACE}
          />
        ))}
        {meats.map((_, index) => (
          <Meat
            scale={0.06}
            key={index}
            itemId={meats[index].id}
            isCollected={meats[index].isCollected}
            position-x={knifes[index].position[0]}
            position-y={knifes[index].position[1]}
            position-z={knifes[index].position[2] + index * COIN_SPACE}
          />
        ))}
        {knifes.map((_, index) => (
          <Knife
            scale={0.08}
            key={index}
            itemId={knifes[index].id}
            isCollected={knifes[index].isCollected}
            position-x={knifes[index].position[0]}
            position-y={knifes[index].position[1]}
            position-z={knifes[index].position[2] + index * COIN_SPACE}
          />
        ))}

        {grave && (
          <Grave
            position-x={grave.position[0]}
            position-y={grave.position[1]}
            position-z={grave.position[2]}
            scale={0.08}
          />
        )}
        {nail && (
          <Nail
            position-x={nail.position[0]}
            position-y={nail.position[1]}
            position-z={nail.position[2]}
            scale={0.03}
          />
        )}
        {spider && (
          <Spider
            position-x={spider.position[0]}
            position-y={spider.position[1]}
            position-z={spider.position[2]}
            scale={0.19}
          />
        )}

        <Butcher group={player} scale={0.09} />
      </group>
    </>
  );
};
