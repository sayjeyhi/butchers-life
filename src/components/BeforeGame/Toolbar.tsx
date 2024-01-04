export const Toolbar = ({ activeMenu, setActiveMenu }) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 flex h-[80px] w-[100vw] select-none justify-between gap-3
        bg-gradient-to-b from-green-500 to-green-700 px-[3vw] md:h-[120px] md:gap-5
        md:px-[5vw] [&_button.active]:-translate-y-3 [&_button.active]:scale-105 [&_button.active]:transform [&_button.active]:rounded-xl [&_button.active]:bg-white [&_button.active]:font-semibold  [&_button.active]:text-green-700 [&_button.active]:shadow-xl
        [&_button.active]:transition-transform [&_button.active]:duration-300 [&_button.active]:ease-in-out [&_button]:pointer-events-auto [&_button]:flex [&_button]:w-1/4 [&_button]:cursor-pointer [&_button]:flex-col [&_button]:items-center [&_button]:justify-center [&_button]:text-[13px]
        [&_button]:text-white md:[&_button]:w-1/5 md:[&_button]:text-xl lg:[&_button]:text-2xl [&_img]:-mt-1 [&_img]:mb-1
        [&_img]:w-12 md:[&_img]:mb-2 md:[&_img]:mt-0
        md:[&_img]:w-16
      "
    >
      <button onClick={setActiveMenu('home')} className={`stonePunk ${activeMenu === 'home' ? 'active' : ''}`}>
        <img src="/images/home.png" alt="" />
        Home
      </button>

      <button
        onClick={setActiveMenu('leaderboard')}
        className={`stonePunk ${activeMenu === 'leaderboard' ? 'active' : ''}`}
      >
        <img src="/images/champion-trophy.png" alt="" className="scale-110" />
        Stats
      </button>
      <button onClick={setActiveMenu('store')} className={`stonePunk ${activeMenu === 'store' ? 'active' : ''}`}>
        <img src="/images/store.png" alt="" className="translate-y-[-7px] scale-110" />
        Store
      </button>

      <button onClick={setActiveMenu('settings')} className={`stonePunk ${activeMenu === 'settings' ? 'active' : ''}`}>
        <img src="/images/setting.png" alt="" />
        Settings
      </button>
    </div>
  );
};
