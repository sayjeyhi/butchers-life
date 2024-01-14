import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { basketItemsAtom } from '../../atoms/basket.ts';
import { BasketContents } from './BasketContents.tsx';
import { isMobile } from '../helpers/userAgent.ts';
import { useNavigate } from '@tanstack/react-router';

export const Basket = () => {
  const navigate = useNavigate();
  const basketItems = useAtomValue(basketItemsAtom);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    if (isMobile())
      navigate({
        to: '/cart',
      });

    setIsOpen(!isOpen);
  };

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
            <BasketContents />
          </div>
        )}
      </div>
    </div>
  );
};
