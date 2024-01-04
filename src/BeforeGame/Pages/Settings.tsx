export const Settings = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="w-full">
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          <div
            id="dropdown"
            className="z-10 hidden w-44 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 h-24 w-24 rounded-full border border-gray-100 shadow-lg"
            src="/images/astronaut-avatar.png"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-3xl font-medium text-gray-900">Bonnie Green</h5>
          <span className="text-xl text-gray-500 dark:text-gray-400">
            Level: <strong className="ml-2 font-semibold">24</strong>
          </span>
          <div className="mt-4 flex md:mt-6">
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add friend
            </a>
            <a
              href="#"
              className="ms-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Message
            </a>
          </div>
        </div>
      </div>

      {/* audio radio toggle, nick name*/}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          Nickname:{' '}
          <input type="text" placeholder="John" className="rounded-lg bg-[rgba(255,255,255,0.2)] p-2 backdrop-blur" />
        </div>
        <div className="flex flex-row items-center gap-4">
          <input type="radio" name="audio" id="audio-on" />
          <label htmlFor="audio-on">Audio On</label>
        </div>
        <div className="flex flex-row items-center gap-4">
          <input type="radio" name="audio" id="audio-off" />
          <label htmlFor="audio-off">Audio Off</label>
        </div>
      </div>
      <input type="range" className="w-full" />
      <div className="flex flex-row gap-4">
        <button className="rounded-lg bg-[rgba(255,255,255,0.2)] p-2 backdrop-blur">Cancel</button>
        <button className="rounded-lg bg-[rgba(255,255,255,0.2)] p-2 backdrop-blur">Save</button>
      </div>
    </>
  );
};
