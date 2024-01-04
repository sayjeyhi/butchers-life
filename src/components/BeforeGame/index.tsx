import { useState, useCallback } from 'react';
import { Home } from './Pages/Home.js';
import { Settings } from './Pages/Settings.js';
import { LeaderBoard } from './Pages/LeaderBoard.js';
import { Store } from './Pages/Store.js';
import { Toolbar } from './Toolbar.jsx';

const pages = {
  home: <Home />,
  settings: <Settings />,
  leaderboard: <LeaderBoard />,
  store: <Store />,
};

export const BeforeGame = () => {
  const [activeMenu, setActiveMenu] = useState('home');

  const handleMenuChange = useCallback(
    (name) => () => {
      setActiveMenu(name);
    },
    [setActiveMenu],
  );

  return (
    <>
      <div
        className={`absolute top-4 m-4 mb-[120px] w-[calc(100%-40px)] rounded-2xl bg-white p-4 text-gray-700 ${
          activeMenu === 'home' ? 'nice-bg translate-y-24' : 'h-[calc(100vh-190px)] overflow-y-auto'
        }`}
      >
        {pages[activeMenu] || pages.home}
      </div>
      <Toolbar activeMenu={activeMenu} setActiveMenu={handleMenuChange} />
    </>
  );
};
