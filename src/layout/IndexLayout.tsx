import { Outlet, useParentMatches } from '@tanstack/react-router';
import { Toolbar } from './Toolbar';

export function IndexLayout() {
  const matches = useParentMatches();

  const isHome = matches[1].routeId === '/index-layout/';
  return (
    <>
      <div
        className={`absolute m-4 mb-[120px] w-[calc(100%-40px)] rounded-2xl bg-white  p-4 text-gray-700 ${
          isHome ? 'top-24' : 'top-4 h-[calc(100vh-190px)] overflow-y-auto'
        }`}
      >
        <Outlet />
      </div>
      <Toolbar />
    </>
  );
}
