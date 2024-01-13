export function Profile() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="overflow-hidden border border-gray-100 bg-white shadow sm:rounded-lg">
        <div className="flex items-center justify-center pt-5">
          <img src="/images/avatars/woman-avatar.png" />
        </div>
        <div className="border-t border-gray-200 bg-gray-100 px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Margot Foster</dd>
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
      <div className="col-span-3 overflow-hidden border border-gray-100 bg-white shadow sm:rounded-lg">
        <div>
          <dl>
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Margot Foster</dd>
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
