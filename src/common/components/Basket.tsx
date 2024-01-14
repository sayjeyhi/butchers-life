import { useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { basketItemsAtom, removeBasketItemAtom } from '../../atoms/basket.ts';

export const Basket = () => {
  const basketItems = useAtomValue(basketItemsAtom);
  const removeBasketItem = useSetAtom(removeBasketItemAtom);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {/*  Drop down */}
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            onClick={toggle}
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 256 256">
              <g fill="currentColor">
                <path d="m216 64l-12.16 66.86A16 16 0 0 1 188.1 144H62.55L48 64Z" opacity=".2"></path>
                <path d="M222.14 58.87A8 8 0 0 0 216 56H54.68l-4.89-26.86A16 16 0 0 0 34.05 16H16a8 8 0 0 0 0 16h18l25.56 140.29a24 24 0 0 0 5.33 11.27a28 28 0 1 0 44.4 8.44h45.42a27.75 27.75 0 0 0-2.71 12a28 28 0 1 0 28-28H83.17a8 8 0 0 1-7.87-6.57L72.13 152h116a24 24 0 0 0 23.61-19.71l12.16-66.86a8 8 0 0 0-1.76-6.56M96 204a12 12 0 1 1-12-12a12 12 0 0 1 12 12m96 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12m4-74.57a8 8 0 0 1-7.9 6.57H69.22L57.59 72h148.82Z"></path>
              </g>
            </svg>
            <span className="relative top-[3px] ml-3 inline-flex items-center justify-center rounded bg-green-500 px-2 py-1 text-xs leading-none text-red-100">
              {basketItems.length}
            </span>
          </button>
        </div>

        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {basketItems.length ? (
              <div role="none">
                <ul className="max-h-[200px] overflow-y-auto">
                  {basketItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between border-b border-dashed border-gray-100 px-3 py-4 text-base text-gray-700 last:border-0 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <div className="flex items-center gap-2">
                        <img src={item.image} className="h-7 w-7 rounded " /> {item.name} - ${item.price}
                        <span className="ml-1 text-sm font-semibold">x {item.quantity}</span>
                      </div>
                      <button
                        onClick={() => removeBasketItem(item.id)}
                        className="rounded border-0 bg-red-300 bg-transparent p-1 text-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M8 9h8v10H8z" opacity=".3"></path>
                          <path
                            fill="currentColor"
                            d="m15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8z"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Checkout btn*/}
                <div className="flex justify-between border-t-4 border-double border-gray-200 px-3 pb-1 pt-4 text-sm text-gray-700">
                  <span>Total: </span>
                  <strong className="font-semibold">${basketItems.reduce((acc, curr) => acc + curr.price, 0)}</strong>
                </div>
                <div className="flex justify-center px-3 pb-3">
                  <button className="w-full rounded-md bg-green-500 px-3 py-2 text-white hover:bg-green-600">
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-52 flex-col items-center justify-center gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24">
                  <g fill="none">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M9 17c.85-.63 1.885-1 3-1s2.15.37 3 1"
                    ></path>
                    <ellipse cx="15" cy="10.5" fill="currentColor" rx="1" ry="1.5"></ellipse>
                    <ellipse cx="9" cy="10.5" fill="currentColor" rx="1" ry="1.5"></ellipse>
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
                      opacity=".5"
                    ></path>
                  </g>
                </svg>

                <span className="text-gray-500">Basket is empty</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
