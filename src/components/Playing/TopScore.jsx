import {useGame} from "../../hooks/useGame";
import { useState} from "react";
import {SettingModal} from "./SettingModal.jsx";

export const TopScore = () => {
  const {timer, dispatch, status} = useGame();

  const handleShowSettings = () => {
    dispatch({ type: "pause" })
  }

  return (
    <>
    <div className="w-full flex justify-between">
      <div>
        <div className="bg-[rgba(255,255,255,0.2)] rounded-2xl w-[120px] relative p-1 mt-2 text-red-50 backdrop-blur text-2xl font-bold text-right pr-6 block">
          <img src="/images/timer.png" alt="Timer icon" className="w-14 absolute -left-2 -top-3" />
          {timer}
        </div>
        <button className="mt-4 bg-[rgba(255,255,255,0.2)] rounded-2xl w-[120px] relative p-1 text-red-50 backdrop-blur text-2xl font-bold text-right pr-6 block">
          <img src="/images/gem-stone.png" alt="Timer icon" className="w-14 absolute -left-2 -top-3" />
          0
        </button>
      </div>

      <div>
        <button onClick={handleShowSettings} className="bg-[rgba(255,255,255,0.2)] rounded-2xl text-white text-2xl p-2 mt-2 backdrop-blur font-bold pl-5 pr-16 flex flex-row items-center gap-3 cursor-pointer pointer-events-auto">
          Settings
          <img src="/images/setting.png" alt="Timer icon" className="w-16 absolute -right-2 -top-2" />
        </button>
      </div>
    </div>
      {status === 'paused' && (
        <SettingModal />
      )}
    </>
  );
};
