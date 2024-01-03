import { useGame } from "../hooks/useGame";

import {TopScore} from "./Playing/TopScore.jsx";
import {BeforeGame} from "./BeforeGame/index.jsx";
import {Button} from "./Button.jsx";
import {useGesture} from "../hooks/useGesture.js";
import {Result} from "./Result/Result.jsx";


export const UI = () => {
  const { status, dispatch } = useGame();

  const { onTouchEnd, onTouchMove, onTouchStart } = useGesture({
    onSwipeLeft: () => {
      dispatch({ type: "move-left" });
    },
    onSwipeRight: () => {
      dispatch({ type: "move-right" });
    },
    onSwipeUp: () => {
      dispatch({ type: "jump" });
    },
    onSwipeDown: () => {
      dispatch({ type: "sit" });
    },
  });

  return (
    <main onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart} className="fixed w-full h-full top-0 left-0 right-0 bottom-0 z-10 flex flex-col gap-4 items-stretch justify-between pointer-events-auto">
      {status === "start" && (
        <BeforeGame />
      )}
      <div className="p-4 absolute top-0 w-full">
        {status === "gameover" && (
          <Result />
        )}
        {(status === "playing" || status === 'paused') && (
          <TopScore />
        )}
      </div>
    </main>
  );
};
