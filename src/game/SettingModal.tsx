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
      <div className="flex h-[340px] w-[300px] flex-col gap-3 rounded-2xl bg-white p-5 [&_img]:absolute [&_img]:-left-2 [&_img]:top-[-6px] [&_img]:w-24">
        <Button className="w-full py-7" onClick={handleResume}>
          <img src="/images/play-button.png" alt="" />
          Resume
        </Button>
        <Button className="w-full py-7" onClick={handleRestart}>
          <img src="/images/skip-button.png" alt="" />
          Restart
        </Button>
        <Button
          className="w-full py-7"
          variant="danger"
          onClick={() =>
            navigate({
              to: '/',
            })
          }
        >
          <img src="/images/exit.png" alt="" />
          Exit
        </Button>
      </div>
    </div>
  );
};
