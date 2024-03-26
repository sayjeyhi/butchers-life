import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { useMeatService } from '../api/hooks/useMeatAccount.ts';
import { isXWalletInstalled } from '../api/wallet.ts';
import { restartGameAtom } from '../atoms/game.ts';
import { achievedCoinsAtom } from '../atoms/score.ts';
import { Button } from '../common/components/Button.tsx';

const hasWallet = isXWalletInstalled();
export function Result() {
  const restartGame = useSetAtom(restartGameAtom);
  const [achievedCoins, setAchievedCoins] = useAtom(achievedCoinsAtom);
  const funding = useRef(false);
  const { fund } = useMeatService();
  useEffect(() => {
    if (!funding.current && achievedCoins > 0 && hasWallet) {
      fund(`${achievedCoins}.0`, {
        onSuccess: () => {
          console.log('funded');
          setAchievedCoins(0);
        },
      });
      funding.current = true;
    }
  }, [achievedCoins, fund, setAchievedCoins]);

  return (
    <div className="nice-bg flex h-full flex-col items-center justify-center gap-8 rounded-2xl">
      <p className="my-8 pt-12 text-center text-4xl font-bold text-gray-700">
        Congratulations! 🎄
        <br />
        You earned {achievedCoins} {hasWallet ? 'MEAT 🥩 check your wallet !' : 'points'}
      </p>
      <Button className="relative -bottom-8" onClick={restartGame}>
        <img src="/images/game-controller.png" alt="Timer icon" className="absolute -left-2 -top-8 w-32" />
        PLAY AGAIN
      </Button>
    </div>
  );
}
