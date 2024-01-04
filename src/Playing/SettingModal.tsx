import { Button } from '../_components/Button.tsx';
import { useGame } from '../_hooks/useGame.tsx';

export const SettingModal = () => {
  const { dispatch } = useGame();

  const handleRestart = () => {
    dispatch({ type: 'start' });
  };
  const handleResume = () => {
    dispatch({ type: 'resume' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center">
      <div className="flex h-[340px] w-[300px] flex-col gap-3 rounded-2xl bg-white p-5">
        <Button className="w-full p-2" onClick={handleResume}>
          <img src="/images/play-button.png" alt="Timer icon" className="absolute -left-2 -top-2 w-24" />
          Resume
        </Button>
        <Button className="w-full p-2" onClick={handleRestart}>
          <img src="/images/skip-button.png" alt="Timer icon" className="absolute -left-2 -top-2 w-24" />
          Restart
        </Button>
        <Button className="w-full p-2" onClick={() => dispatch({ type: 'restart' })}>
          <img src="/images/door.png" alt="Timer icon" className="absolute -left-2 -top-2 w-24" />
          Exit
        </Button>
      </div>
    </div>
  );
};
