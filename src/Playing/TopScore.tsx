import { useGame } from '../_hooks/useGame.tsx';
import { SettingModal } from './SettingModal.tsx';

export const TopScore = () => {
  const { lives, achievedCoins, achievedAward, timer, dispatch, status } = useGame();

  const handleShowSettings = () => {
    dispatch({ type: 'pause' });
  };

  return (
    <>
      <div className="flex w-full justify-between">
        <div>
          <div className="relative mt-2 block w-[120px] rounded-2xl bg-[rgba(255,255,255,0.2)] p-1 pr-6 text-right text-2xl font-bold text-red-50 backdrop-blur">
            <img src="/images/timer.png" alt="Timer icon" className="absolute -left-2 -top-3 w-14" />
            {timer}
          </div>
          <div className="relative mt-4 block w-[120px] rounded-2xl bg-[rgba(255,255,255,0.2)] p-1 pr-6 text-right text-2xl font-bold text-red-50 backdrop-blur">
            <img src="/images/coin.png" alt="Timer icon" className="absolute -left-2 -top-3 w-14" />
            {achievedCoins}
          </div>
          <div className="relative mt-4 block w-[120px] rounded-2xl bg-[rgba(255,255,255,0.2)] p-1 pr-6 text-right text-2xl font-bold text-red-50 backdrop-blur">
            <img src="/images/award.png" alt="Timer icon" className="absolute -left-2 -top-3 w-14" />
            {achievedAward}
          </div>
        </div>

        <div>
          <div className="pointer-events-auto mt-2 flex cursor-pointer flex-row items-center gap-3 rounded-2xl bg-[rgba(255,255,255,0.2)] p-2 pl-5 pr-8 text-2xl font-bold text-white backdrop-blur">
            <img src="/images/heart.png" alt="Timer icon" className="absolute -right-2 -top-2 w-16" />
            {lives}
          </div>
          <button
            onClick={handleShowSettings}
            className="pointer-events-auto mt-2 flex cursor-pointer flex-row items-center gap-3 rounded-2xl bg-[rgba(255,255,255,0.2)] p-2 pl-5 pr-16 text-2xl font-bold text-white backdrop-blur"
          >
            Settings
            <img src="/images/setting.png" alt="Timer icon" className="absolute -right-2 -top-2 w-16" />
          </button>
        </div>
      </div>
      {status === 'paused' && <SettingModal />}
    </>
  );
};
