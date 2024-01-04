import { useGame } from '../../hooks/useGame.js';
import { useState } from 'react';
import { SettingModal } from './SettingModal.js';

export const TopScore = () => {
  const { timer, dispatch, status } = useGame();

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
          <button className="relative mt-4 block w-[120px] rounded-2xl bg-[rgba(255,255,255,0.2)] p-1 pr-6 text-right text-2xl font-bold text-red-50 backdrop-blur">
            <img src="/images/gem-stone.png" alt="Timer icon" className="absolute -left-2 -top-3 w-14" />0
          </button>
        </div>

        <div>
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
