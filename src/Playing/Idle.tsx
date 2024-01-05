import { useEffect, useRef, useState } from 'react';
import { useGame } from '../_hooks/useGame.tsx';

const countDownItems = ['Are you ready?', 'Three', 'Two', 'One', 'Start!'];

export const Idle = () => {
  const counterRef = useRef(null);
  const [currentItem, setCurrentItem] = useState('');
  const { dispatch } = useGame();

  useEffect(() => {
    if (!counterRef.current) return;

    const startCountdown = () => {
      console.log('showNextItem', countDownItems);
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
          dispatch({ type: 'play' });
        }
      };

      // Initial delay before starting the countdown
      setTimeout(() => {
        showNextItem();
      }, 1000);
    };

    startCountdown();
  }, []);

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
