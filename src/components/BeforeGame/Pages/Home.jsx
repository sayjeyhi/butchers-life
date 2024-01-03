import { useGame } from "../../../hooks/useGame";
import {Button} from "../../Button.jsx";

export const Home = () => {
  const { dispatch } = useGame();

  return (
    <>
      <img src="/images/butcher.png" alt="Logo" className="w-3/6 md:w-2/6 lg:w-1/6 bg-[rgba(255,255,255,0.2)] backdrop-blur p-5 relative -translate-y-24 rounded-2xl mx-auto" />
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center w-full -mt-20 mb-12 three-d-text">Butcher's life</h1>

      <p className="text-center text-xl mt-3">
        Run from Ghosts and Score some stars!
      </p>
      <div className="w-full flex justify-center mt-3">
        <Button
          className="-bottom-12 pl-9 w-full md:w-[380px]"
          onClick={() => dispatch({ type: "start" })}
        >

          <img src="/images/game-controller.png" alt="Timer icon" className="w-32 absolute -left-2 -top-8" />
          Start Game
        </Button>
      </div>
    </>
  );
};
