import { useNavigate } from '@tanstack/react-router';
import { useMeatAccount } from '../api/hooks/useMeatAccount.ts';
import { useWalletAccount } from '../api/hooks/useWalletAccount.ts';
import { Button } from '../common/components/Button.tsx';

export function Home() {
  const { connect, isConnected, disconnect } = useWalletAccount();
  const { account, create, exists, fund } = useMeatAccount();
  const navigate = useNavigate();
  const createAccount = async () => {
    try {
      if (!isConnected) {
        await connect();
      }
      await create();
      // await fund('1000');
    } catch (e) {
      navigate({
        to: '/play',
      });
    }
  };

  return (
    <>
      <img
        src="/images/butcher.png"
        alt="Logo"
        className="relative mx-auto w-3/6 rounded-2xl bg-[rgba(255,255,255,0.2)] p-5 backdrop-blur md:w-2/6 lg:w-1/6"
      />

      <h1 className="three-d-text mb-12 w-full text-center text-2xl font-bold md:text-4xl lg:text-5xl">
        Butcher's life
      </h1>
      <p className="mt-3 text-center text-xl">Run from Ghosts and Score some stars!</p>
      <div className="mt-3 flex w-full flex-col items-center justify-center">
        {isConnected && exists ? (
          <>
            <p className="mt-3 text-center text-xl">Connected account {account?.account}</p>
            <p className="mt-3 text-center text-xl">Balance {account?.balance} Meat</p>
            <Button
              className="-bottom-12 w-full pl-9 md:w-[380px]"
              onClick={() => {
                navigate({
                  to: '/play',
                });
              }}
            >
              <img src="/images/game-controller.png" alt="Timer icon" className="absolute -left-2 -top-8 w-32" />
              Start game
            </Button>
            <Button
              className="-bottom-12 w-full pl-9 md:w-[380px]"
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </Button>
            <Button
              className="-bottom-12 w-full pl-9 md:w-[380px]"
              onClick={() => {
                fund('1000');
              }}
            >
              Fund
            </Button>
          </>
        ) : (
          <>
            <Button className="-bottom-12 w-full pl-0 md:w-[380px]" onClick={createAccount}>
              Create meat account
            </Button>
          </>
        )}
      </div>
    </>
  );
}
