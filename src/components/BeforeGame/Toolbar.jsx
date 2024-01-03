export const Toolbar = ({ activeMenu, setActiveMenu }) => {
  return (
    <div className="z-20 w-[100vw] flex justify-between gap-3 md:gap-5 h-[80px] md:h-[120px] bg-gradient-to-b from-green-500 to-green-700
        fixed bottom-0 left-0 right-0 px-[3vw] md:px-[5vw]
        [&_button]:w-1/4 md:[&_button]:w-1/5 [&_button]:pointer-events-auto [&_button]:cursor-pointer [&_button]:text-white [&_button]:flex [&_button]:flex-col  [&_button]:justify-center [&_button]:items-center
        [&_button.active]:font-semibold [&_button.active]:bg-white [&_button.active]:-translate-y-3 [&_button.active]:text-green-700 [&_button.active]:rounded-xl [&_button.active]:shadow-xl [&_button.active]:scale-105 [&_button.active]:transform [&_button.active]:transition-transform [&_button.active]:duration-300 [&_button.active]:ease-in-out
        [&_img]:w-12 md:[&_img]:w-16 [&_img]:-mt-1 [&_img]:mb-1 md:[&_img]:mb-2 md:[&_img]:mt-0
        [&_button]:text-[13px] md:[&_button]:text-xl lg:[&_button]:text-2xl
        select-none
      ">

      <button onClick={setActiveMenu('home')} className={`stonePunk ${activeMenu === 'home' ? 'active' : ''}`}>
        <img src="/images/home.png" alt="" />
        Home
      </button>

      <button onClick={setActiveMenu('leaderboard')} className={`stonePunk ${activeMenu === 'leaderboard' ? 'active' : ''}`}>
        <img src="/images/champion-trophy.png" alt="" className="scale-110" />
        Stats
      </button>
      <button onClick={setActiveMenu('store')} className={`stonePunk ${activeMenu === 'store' ? 'active' : ''}`}>
        <img src="/images/store.png" alt="" className="scale-110 translate-y-[-7px]" />
        Store
      </button>

      <button onClick={setActiveMenu('settings')} className={`stonePunk ${activeMenu === 'settings' ? 'active' : ''}`}>
        <img src="/images/setting.png" alt="" />
        Settings
      </button>
    </div>
  );
};
