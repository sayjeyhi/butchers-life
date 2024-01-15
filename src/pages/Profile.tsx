import { Link, useParams } from '@tanstack/react-router';

export function Profile() {
  const { id } = useParams({ from: '/index-layout/profile/$id' });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 h-24 w-24 rounded-2xl border-4 border-gray-300 shadow-lg lg:h-40 lg:w-40"
          src="/images/astronaut-avatar.png"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-3xl font-medium text-gray-900">Jafar Rezaei</h5>

        {/* Items list*/}
        <div className="my-4 flex h-5 gap-5">
          <span className="flex items-center border-r border-green-300 pr-4 text-xl text-green-500">
            <img src="/images/items/badge.png" className="h-12 w-12" />
            <span className="ml-2 font-semibold">24</span>
          </span>
          <span className="flex items-center border-r border-green-300 pr-4 text-xl text-green-500">
            <img src="/images/items/coin.png" className="h-7 w-7" />
            <span className="ml-2 font-semibold">12k</span>
          </span>
          <span className="flex items-center border-r border-green-300 pr-4 text-xl text-green-500">
            <img src="/images/items/knife.png" className="w-7" />
            <span className="ml-2 font-semibold">45</span>
          </span>
          <span className="flex items-center text-xl text-green-500">
            <img src="/images/items/meat.png" className="h-7 w-6" />
            <span className="ml-2 font-semibold">12k</span>
          </span>
        </div>

        {id ? (
          <div className="mt-4 flex md:mt-6">
            <button className="ms-3 inline-flex items-center rounded-lg  px-4 py-2 text-center text-sm font-medium text-red-800  ">
              Follow
            </button>
            <button className="ms-3 inline-flex items-center rounded-lg  px-4 py-2 text-center text-sm font-medium text-red-800  ">
              Block
            </button>
          </div>
        ) : (
          <>
            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Wallet address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                  </dd>
                </div>
                <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Online for</dt>
                  <dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">2 months and 5 days</dd>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">sayjeyhi@gmail.com</dd>
                </div>
              </dl>
            </div>

            <div className="mt-4 flex md:mt-6">
              <Link
                to="/profile/settings"
                activeProps={{
                  className: 'active',
                }}
                className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Settings
              </Link>
              <button className="ms-3 inline-flex items-center rounded-lg  px-4 py-2 text-center text-sm font-medium text-red-800  ">
                logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
