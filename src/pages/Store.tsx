import { StoreItem } from '../common/components/StoreItem.tsx';

const items = [
  {
    id: '1',
    name: 'Heart',
    price: 100,
    description: 'Add 100 more health points',
    image: '/images/heart.png',
  },
  {
    id: '2',
    name: 'Heart',
    price: 100,
    description: 'Add 100 more health points',
    image: '/images/heart.png',
  },
  {
    id: '3',
    name: 'Heart',
    price: 100,
    description: 'Add 100 more health points',
    image: '/images/heart.png',
  },
  {
    id: '4',
    name: 'Heart',
    price: 100,
    description: 'Add 100 more health points',
    image: '/images/heart.png',
  },
];

export function Store() {
  return (
    <>
      <h1 className="text-2xl font-bold">Store</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <StoreItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            onAdd={() => {
              console.log('Add');
            }}
          />
        ))}
      </div>
    </>
  );
}
