import { Button } from '../Button.js';
import { useGame } from '../../hooks/useGame.js';

export const Result = () => {
  const { dispatch } = useGame();

  return (
    <div className="nice-bg flex h-full flex-col items-center justify-center gap-8 rounded-2xl">
      <p className="my-8 pt-12 text-center text-4xl font-bold text-gray-700">
        Congratulations! 🎄
        <br />
        You earned 1000 points!
      </p>
      <Button className="relative -bottom-8" onClick={() => dispatch({ type: 'restart' })}>
        <img src="/images/game-controller.png" alt="Timer icon" className="absolute -left-2 -top-8 w-32" />
        PLAY AGAIN
      </Button>
    </div>
  );
};
