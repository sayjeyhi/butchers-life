import { Outlet } from '@tanstack/react-router';
import { Toolbar } from './Toolbar';
export function IndexLayout() {
  return (
    <>
      <div className="absolute top-4 m-4 mb-[120px] h-[calc(100vh-190px)] w-[calc(100%-40px)] overflow-y-auto rounded-2xl bg-white  p-4 text-gray-700">
        <Outlet />
      </div>
      <Toolbar />
    </>
  );
}
