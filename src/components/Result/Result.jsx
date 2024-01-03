
import {Button} from "../Button.jsx";
import {useGame} from "../../hooks/useGame.jsx";

export const Result = () => {
  const {dispatch} = useGame();


  return (
    <div className="rounded-2xl nice-bg flex justify-center h-full flex-col items-center gap-8">
      <p className="text-center text-gray-700 text-4xl font-bold pt-12 my-8">
        Congratulations! 🎄
        <br />
        You earned 1000 points!
      </p>
      <Button
        className="relative -bottom-8"
        onClick={() => dispatch({ type: "restart" })}
      >
        <img src="/images/game-controller.png" alt="Timer icon" className="w-32 absolute -left-2 -top-8" />

        PLAY AGAIN
      </Button>
    </div>
  );
};
