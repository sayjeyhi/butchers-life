import React, { useState } from 'react';

type Options = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export const useGesture = (options: Options = {}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  const minSwipeDistance = 1;

  function onTouchStart(e: React.TouchEvent<HTMLElement>) {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);

    setTouchEndY(null);
    setTouchStartY(e.targetTouches[0].clientY);
  }


  function onTouchMove(e: React.TouchEvent<HTMLElement>) {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  }

  function onTouchEnd() {
    if (touchStartX && touchEndX) swipeHorizontal();
    if (touchStartY && touchEndY) swipeVertical();
  }

  function swipeHorizontal() {
    if (touchStartX === null || touchEndX === null || touchStartY === null || touchEndY === null) return;

    const xDistance = touchStartX - touchEndX;
    const yDistance = touchStartY - touchEndY;

    if (Math.abs(yDistance) >= Math.abs(xDistance)) {
      return;
    }

    const isLeftSwipe = xDistance > minSwipeDistance;
    const isRightSwipe = xDistance < -minSwipeDistance;

    if (isLeftSwipe && options.onSwipeLeft) {
      options.onSwipeLeft();
    }

    if (isRightSwipe && options.onSwipeRight) {
      options.onSwipeRight();
    }
  }

  function swipeVertical() {
    if (touchStartX === null || touchEndX === null || touchStartY === null || touchEndY === null) return;

    const xDistance = touchStartX - touchEndX;
    const yDistance = touchStartY - touchEndY;

    if (Math.abs(xDistance) >= Math.abs(yDistance)) {
      return;
    }

    const isUpSwipe = yDistance > minSwipeDistance;
    const isDownSwipe = yDistance < -minSwipeDistance;

    if (isDownSwipe && options.onSwipeDown) {
      options.onSwipeDown();
    }

    if (isUpSwipe && options.onSwipeUp) {
      options.onSwipeUp();
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
