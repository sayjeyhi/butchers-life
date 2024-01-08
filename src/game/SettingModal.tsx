import { useNavigate } from '@tanstack/react-router';
import { Button } from '../common/Button.tsx';
import { useGame } from './hooks/useGame.ts';

export const SettingModal = () => {
  const { dispatch } = useGame();
  const navigate = useNavigate();

  const handleRestart = () => {
    dispatch({ type: 'restart' });
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
        <Button
          className="w-full p-2"
          onClick={() =>
            navigate({
              to: '/',
            })
          }
        >
          <img src="/images/door.png" alt="Timer icon" className="absolute -left-2 -top-2 w-24" />
          Exit
        </Button>
      </div>
    </div>
  );
};
