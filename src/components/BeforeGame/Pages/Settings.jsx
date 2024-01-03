import { useGame } from "../../../hooks/useGame";

export const Settings = () => {
  const { dispatch } = useGame();

  return (
    <>
      <h1 className="text-2xl font-bold">Settings</h1>



      <div className="w-full">
        <div className="flex justify-end px-4 pt-4">
          <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span className="sr-only">Open dropdown</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
          </button>
          <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg border border-gray-100" src="/images/astronaut-avatar.png" alt="Bonnie image"/>
          <h5 className="mb-1 text-3xl font-medium text-gray-900">Bonnie Green</h5>
          <span className="text-xl text-gray-500 dark:text-gray-400">Level: <strong className="ml-2 font-semibold">24</strong></span>
          <div className="flex mt-4 md:mt-6">
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">Message</a>
          </div>
        </div>
      </div>


      {/* audio radio toggle, nick name*/}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          Nickname: <input type="text" placeholder="John" className="rounded-lg p-2 bg-[rgba(255,255,255,0.2)] backdrop-blur" />
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
        <button className="bg-[rgba(255,255,255,0.2)] rounded-lg p-2 backdrop-blur">Cancel</button>
        <button className="bg-[rgba(255,255,255,0.2)] rounded-lg p-2 backdrop-blur">Save</button>
      </div>
    </>
  );
};
