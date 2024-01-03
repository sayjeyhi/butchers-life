import { useState, useCallback } from "react";
import {Home} from "./Pages/Home.jsx";
import {Settings} from "./Pages/Settings.jsx";
import {LeaderBoard} from "./Pages/LeaderBoard.jsx";
import {Store} from "./Pages/Store.jsx";
import {Toolbar} from "./Toolbar.jsx";

const pages = {
  home: <Home />,
  settings: <Settings />,
  leaderboard: <LeaderBoard />,
  store: <Store/>
}

export const BeforeGame = () => {
  const [activeMenu, setActiveMenu] = useState('home');

  const handleMenuChange = useCallback(name => () => {
    setActiveMenu(name)
  },[setActiveMenu]);

  return (
    <>
      <div className={`m-4 p-4 text-gray-700 bg-white rounded-2xl mb-[120px] absolute top-4 w-[calc(100%-40px)] ${activeMenu === 'home' ? 'translate-y-24 nice-bg' : 'h-[calc(100vh-190px)] overflow-y-auto'}`}>
        {pages[activeMenu] || pages.home}
      </div>
      <Toolbar activeMenu={activeMenu } setActiveMenu={handleMenuChange} />
    </>
  );
};
