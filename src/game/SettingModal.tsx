import { useNavigate } from '@tanstack/react-router';
import { Button } from '../common/components/Button.tsx';
import { useSetAtom } from 'jotai';
import { restartGameAtom, resumeGameAtom } from '../atoms/game.ts';

export const SettingModal = () => {
  const restartGame = useSetAtom(restartGameAtom);
  const resumeGame = useSetAtom(resumeGameAtom);
  const navigate = useNavigate();

  const handleRestart = () => {
    restartGame();
  };

  const handleResume = () => {
    resumeGame();
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
