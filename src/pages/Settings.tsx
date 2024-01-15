export function Settings() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center pb-10">
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

        <div>
          <dl>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Wallet address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input type="text" className="w-full rounded-md border border-gray-300 py-1 text-sm" />
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
      </div>
    </div>
  );
}
