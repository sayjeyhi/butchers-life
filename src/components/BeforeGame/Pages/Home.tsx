import { useGame } from '../../../hooks/useGame.js';
import { Button } from '../../Button.js';

export const Home = () => {
  const { dispatch } = useGame();

  return (
    <>
      <img
        src="/images/butcher.png"
        alt="Logo"
        className="relative mx-auto w-3/6 -translate-y-24 rounded-2xl bg-[rgba(255,255,255,0.2)] p-5 backdrop-blur md:w-2/6 lg:w-1/6"
      />
      <h1 className="three-d-text -mt-20 mb-12 w-full text-center text-2xl font-bold md:text-4xl lg:text-5xl">
        Butcher's life
      </h1>

      <p className="mt-3 text-center text-xl">Run from Ghosts and Score some stars!</p>
      <div className="mt-3 flex w-full justify-center">
        <Button className="-bottom-12 w-full pl-9 md:w-[380px]" onClick={() => dispatch({ type: 'start' })}>
          <img src="/images/game-controller.png" alt="Timer icon" className="absolute -left-2 -top-8 w-32" />
          Start Game
        </Button>
      </div>
    </>
  );
};
