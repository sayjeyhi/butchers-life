import { useEffect, useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import { startGameAtom } from '../atoms/game.ts';

const countDownItems = ['Are you ready?', 'Three', 'Two', 'One', 'Start!'];

export const Idle = () => {
  const counterRef = useRef(null);
  const [currentItem, setCurrentItem] = useState('');
  const startGame = useSetAtom(startGameAtom);

  useEffect(() => {
    if (!counterRef.current) return;

    const startCountdown = () => {
      let index = 0;
      const showNextItem = () => {
        if (index < countDownItems.length) {
          setCurrentItem(countDownItems[index]);
          index++;

          setTimeout(
            () => {
              showNextItem();
            },
            1000 * (index === 1 ? 3 : 1),
          );
        } else {
          setCurrentItem('');
          startGame();
        }
      };

      // Initial delay before starting the countdown
      setTimeout(() => {
        showNextItem();
      }, 1000);
    };

    startCountdown();
  }, [startGame]);

  return (
    <div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
      <div
        ref={counterRef}
        className="three-d-text -mt-32 transform animate-bounce text-center text-5xl text-white will-change-transform"
      >
        {currentItem}
      </div>
    </div>
  );
};
