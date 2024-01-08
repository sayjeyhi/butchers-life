import { Environment, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { COIN_SPACE, ENEMY_COLUMNS, ENEMY_SPACE_COLUMN, GAMEBOARD_LENGTH } from '../constants.ts';
import { useKeyboard } from './hooks/useKeyboard.ts';
import { Butcher } from './models/player/Butcher.tsx';
import { City } from './models/City.tsx';
import { Ghost } from './models/enemies/Ghost.tsx';
import { Grave } from './models/obstacles/Grave.tsx';
import { Nail } from './models/obstacles/Nail.tsx';
import { Spider } from './models/obstacles/Spider.tsx';
import { Coin } from './models/rewards/Coin.tsx';
import { Knife } from './models/rewards/Knife.tsx';
import { Meat } from './models/rewards/Meat.tsx';
import { useAtomValue } from 'jotai';
import { gameStatusAtom } from '../atoms/game.ts';
import { ghostsAtom } from '../atoms/enemies.ts';
import { gravesAtom, nailsAtom, spidersAtom } from '../atoms/obstacles.ts';
import { coinsAtom, knifesAtom, meatsAtom } from '../atoms/rewards.ts';
import { Group } from 'three';

export function Game() {
  useKeyboard();

  const player = useRef<Group>();
  const status = useAtomValue(gameStatusAtom);
  const ghosts = useAtomValue(ghostsAtom);
  const graves = useAtomValue(gravesAtom);
  const nails = useAtomValue(nailsAtom);
  const spiders = useAtomValue(spidersAtom);
  const coins = useAtomValue(coinsAtom);
  const meats = useAtomValue(meatsAtom);
  const knifes = useAtomValue(knifesAtom);

  if (status === 'game-over') return null;

  return (
    <>
      <OrbitControls />
      <Environment preset="sunset" />
      <directionalLight position={[-10, 1.4, 10]} intensity={0.2} />
      <directionalLight position={[10, 1.4, 10]} intensity={0.2} />
      <directionalLight position={[0, 50, 180]} intensity={0.1} />

      <group>
        <City position-z={0} />
        <City position-z={-GAMEBOARD_LENGTH} />
        <City position-z={GAMEBOARD_LENGTH} />

        {ghosts.map((item, index) => {
          const column = index % ENEMY_COLUMNS;
          const xPos = column * ENEMY_SPACE_COLUMN - ((ENEMY_COLUMNS - 1) * ENEMY_SPACE_COLUMN) / 2;
          return <Ghost scale={0.09} key={index} position-z={-15 - item.position[2]} position-x={xPos} />;
        })}

        {coins.map((_, index) => (
          <Coin
            scale={0.11}
            key={index}
            itemId={coins[index].id}
            isCollected={coins[index].isCollected}
            position-x={coins[index].position[0]}
            position-y={coins[index].position[1]}
            position-z={coins[index].position[2] + index * COIN_SPACE}
          />
        ))}
        {meats.map((_, index) => (
          <Meat
            scale={0.06}
            key={index}
            itemId={meats[index].id}
            isCollected={meats[index].isCollected}
            position-x={meats[index].position[0]}
            position-y={meats[index].position[1]}
            position-z={meats[index].position[2] + index * COIN_SPACE}
          />
        ))}
        {knifes.map((_, index) => (
          <Knife
            scale={0.04}
            key={index}
            itemId={knifes[index].id}
            isCollected={knifes[index].isCollected}
            position-x={knifes[index].position[0]}
            position-y={knifes[index].position[1]}
            position-z={knifes[index].position[2] + index * COIN_SPACE}
          />
        ))}

        {graves.map((_, index) => (
          <Grave
            scale={0.08}
            key={index}
            itemId={graves[index].id}
            isCollected={graves[index].isCollected}
            position-x={graves[index].position[0]}
            position-y={graves[index].position[1]}
            position-z={graves[index].position[2] + index * COIN_SPACE}
          />
        ))}
        {nails.map((_, index) => (
          <Nail
            scale={0.03}
            key={index}
            itemId={nails[index].id}
            isCollected={nails[index].isCollected}
            position-x={nails[index].position[0]}
            position-y={nails[index].position[1]}
            position-z={nails[index].position[2] + index * COIN_SPACE}
          />
        ))}
        {spiders.map((_, index) => (
          <Spider
            scale={0.19}
            key={index}
            itemId={spiders[index].id}
            isCollected={spiders[index].isCollected}
            position-x={spiders[index].position[0]}
            position-y={spiders[index].position[1]}
            position-z={spiders[index].position[2] + index * COIN_SPACE}
          />
        ))}

        <Butcher group={player} scale={0.09} />
      </group>
    </>
  );
}
