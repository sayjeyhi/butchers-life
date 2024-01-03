import {
  Environment, OrbitControls,
} from "@react-three/drei";
import { useRef, useEffect } from "react";
import {
  GAMEBOARD_LENGTH,
  ENEMY_COLUMNS,
  ENEMY_SPACE_COLUMN,
  ENEMY_SPACE_ROW, COIN_SPACE,
} from "../App";
import { useGame } from "../hooks/useGame";
import { Explosion } from "./Explosion";
import { Gameboard } from "./Gameboard";
import { Coin } from "./Playing/models/Coin.jsx";
import { Meat } from "./Playing/models/Meat.jsx";
import { Knife } from "./Playing/models/Knife.jsx";
import {Spider} from "./Playing/models/Spider.jsx";
import {Grave} from "./Playing/models/Grave.jsx";
import { Player } from "./Player";
import { Snowman } from "./Snowman";
import { animate, useMotionValue } from 'framer-motion'
import {useFrame} from "@react-three/fiber";
import {useKeyboard} from "../hooks/useKeyboard.js";

export const framerMotionConfig = {
  type: 'spring',
  mass: 5,
  stiffness: 400,
  damping: 100,
  restDelta: 0.0001
}

export const Experience = () => {
  useKeyboard()
  const player = useRef();
  const { enemies, status, showBomb, playerPosition, coins, meats } = useGame();
  const playerPositionX = useMotionValue(0)

  useEffect(() => {
    if (playerPosition === 'left') animate(playerPositionX, -0.32, framerMotionConfig);
    if (playerPosition === 'right') animate(playerPositionX, 0.32, framerMotionConfig);
    if (playerPosition === 'center') animate(playerPositionX, 0, framerMotionConfig);
  }, [playerPosition]);

  useFrame(() => {
    player.current.position.x = playerPositionX.get();
  });

  return (
    <>
      <OrbitControls />
      <Environment preset="sunset"/>
      <directionalLight
        position={[-10, 1.4, 10]}
        intensity={0.2}
      />
      <directionalLight
        position={[10, 1.4, 10]}
        intensity={0.2}
      />
      <directionalLight
        position={[0, 50, 180]}
        intensity={0.1}
      />

      <group visible={status === "playing" || status === 'paused'}>
        {/* TO PREVENT THE GAMEBOARD FROM HAVING A WRONG POSITION WHEN THE GAME STARTS AS THE LOGIC IS RUNNING */}
        <Gameboard position-z={status === "start" ? 42 : 0}/>
        <Gameboard position-z={status === "start" ? 42 : -GAMEBOARD_LENGTH}/>
        <Gameboard position-z={status === "start" ? 42 : GAMEBOARD_LENGTH}/>
        {showBomb && <Explosion/>}
        {enemies.map((snowman, index) => {
          const column = index % ENEMY_COLUMNS;
          const row = Math.floor(index / ENEMY_COLUMNS);
          const xPos =
            column * ENEMY_SPACE_COLUMN -
            ((ENEMY_COLUMNS - 1) * ENEMY_SPACE_COLUMN) / 2;
          return (
            <group
              key={index}
              position-z={-15 - row * ENEMY_SPACE_ROW}
              position-x={xPos}
            >
              <Snowman scale={0.09} snowman={snowman}/>
            </group>
          );
        })}
        {coins.map((snowman, index) =>  (
          <group
            key={index}
            position-z={20 + (index * COIN_SPACE)}
            position-x={-0.32}
          >
            <Coin scale={0.09} />
          </group>
        ))}
        {meats.map((snowman, index) =>  (
          <group
            key={index}
            position-z={30 + (index * COIN_SPACE)}
            position-x={0.32}
          >
            <Meat scale={0.06} />
          </group>
        ))}

        <Player group={player} position-z={4} scale={0.09}/>

        <Grave
          position-y={0}
          position-z={23}
          scale={0.08}
        />
        <Knife
          position-y={0}
          position-z={20}
          scale={0.08}
        />
        <Spider
          position-y={0}
          position-z={15}
          position-x={0.32}
          scale={0.19}
        />
      </group>
    </>
  );
};
