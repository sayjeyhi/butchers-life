import { Button } from '../common/components/Button.tsx';
import { useSetAtom } from 'jotai';
import { restartGameAtom } from '../atoms/game.ts';

export const Result = () => {
  const restartGame = useSetAtom(restartGameAtom);

  // const { fund } = useMeatAccount();
  // useEffect(() => {
  //   fund(`${achievedCoins}`);
  // }, [achievedCoins, fund]);

  return (
    <div className="nice-bg flex h-full flex-col items-center justify-center gap-8 rounded-2xl">
      <p className="my-8 pt-12 text-center text-4xl font-bold text-gray-700">
        Congratulations! 🎄
        <br />
        You earned 1000 points!
      </p>
      <Button className="relative -bottom-8" onClick={restartGame}>
        <img src="/images/game-controller.png" alt="Timer icon" className="absolute -left-2 -top-8 w-32" />
        PLAY AGAIN
      </Button>
    </div>
  );
};
