import { ComponentProps } from 'react';
import { Link } from '@tanstack/react-router';

export type User = {
  id: string;
  name: string;
  coins: number;
  awards: number;
  image: string;
};

type ItemProps = ComponentProps<'div'> &
  User & {
    onClick: (user: User) => void;
  };

export const LeaderboardItem = ({ onClick, ...user }: ItemProps) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-white shadow">
      <a href="#" className="flex items-center justify-center">
        <img className="h-40 w-auto rounded-t-lg pt-8" src={user.image} alt={user.name} />
      </a>
      <div className="border-t border-gray-200 bg-gray-100 p-3">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">{user.name}</h5>
        </a>
        <p>{user.coins} coins</p>
        <div className="mt-2 grid grid-cols-2 gap-3 border-t border-gray-300 pt-2">
          <Link
            to="/profile/$id"
            params={{ id: user.id }}
            className="w-full py-2 text-center text-sm font-medium focus:ring-blue-300 "
          >
            Profile
          </Link>
          <button
            onClick={() => onClick(user)}
            className="w-full rounded-lg bg-gray-400 py-2 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500 "
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};
