import { LeaderboardItem, User } from '../common/components/LeaderboardItem.tsx';

const users: User[] = [
  {
    id: '1',
    name: 'Alice',
    coins: 100,
    awards: 100,
    image: '/images/avatars/afro-avatar.png',
  },
  {
    id: '2',
    name: 'Bob',
    coins: 210,
    awards: 100,
    image: '/images/avatars/boy-avatar.png',
  },
  {
    id: '3',
    name: 'Charlie',
    coins: 320,
    awards: 200,
    image: '/images/avatars/chef-avatar.png',
  },
  {
    id: '4',
    name: 'David',
    coins: 92,
    awards: 100,
    image: '/images/avatars/farmer-avatar.png',
  },
  {
    id: '4',
    name: 'Eve',
    coins: 120,
    awards: 100,
    image: '/images/avatars/man-avatar.png',
  },
  {
    id: '4',
    name: 'Frank',
    coins: 910,
    awards: 100,
    image: '/images/avatars/trendy-person-avatar.png',
  },
  {
    id: '4',
    name: 'George',
    coins: 730,
    awards: 100,
    image: '/images/avatars/woman-avatar.png',
  },
];

export function LeaderBoard() {
  return (
    <>
      <h1 className="mb-6 mt-2 text-2xl font-bold">LeaderBoard</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {users.map((user) => (
          <LeaderboardItem
            key={user.id}
            {...user}
            onClick={() => {
              console.log('Add');
            }}
          />
        ))}
      </div>
    </>
  );
}
