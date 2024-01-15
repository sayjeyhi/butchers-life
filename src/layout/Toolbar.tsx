import { Link } from '@tanstack/react-router';

export function Toolbar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 flex h-[80px] w-[100vw] select-none justify-between gap-3
        bg-gradient-to-b from-green-500 to-green-700 px-[3vw] md:h-[120px] md:gap-5
        md:px-[5vw] [&_a.active]:-translate-y-3 [&_a.active]:scale-105 [&_a.active]:transform [&_a.active]:rounded-xl [&_a.active]:bg-white [&_a.active]:font-semibold  [&_a.active]:text-green-700 [&_a.active]:shadow-xl
        [&_a.active]:transition-transform [&_a.active]:duration-300 [&_a.active]:ease-in-out [&_a]:pointer-events-auto [&_a]:flex [&_a]:w-1/4 [&_a]:cursor-pointer [&_a]:flex-col [&_a]:items-center [&_a]:justify-center [&_a]:text-[13px]
        [&_a]:text-white md:[&_a]:w-1/5 md:[&_a]:text-xl lg:[&_a]:text-2xl [&_img]:-mt-1 [&_img]:mb-1
        [&_img]:w-12 md:[&_img]:mb-2 md:[&_img]:mt-0
        md:[&_img]:w-16
      "
    >
      <Link
        to="/"
        className="stonePunk"
        activeProps={{
          className: 'active',
        }}
      >
        <img src="/images/home.png" alt="" />
        Home
      </Link>

      <Link
        to="/leader-board"
        className="stonePunk"
        activeProps={{
          className: 'active',
        }}
      >
        <img src="/images/champion-trophy.png" alt="" className="scale-110" />
        Stats
      </Link>

      <Link
        to="/store"
        className="stonePunk"
        activeProps={{
          className: 'active',
        }}
      >
        <img src="/images/store.png" alt="" className="translate-y-[-7px] scale-110" />
        Store
      </Link>

      <Link
        to="/profile"
        className="stonePunk"
        activeProps={{
          className: 'active',
        }}
      >
        <img src="/images/setting.png" alt="" />
        Settings
      </Link>
    </div>
  );
}
