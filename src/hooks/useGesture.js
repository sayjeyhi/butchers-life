import { useState } from 'react'

export const useGesture = (options = {}) => {
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)

  const [touchStartY, setTouchStartY] = useState(null)
  const [touchEndY, setTouchEndY] = useState(null)

  const minSwipeDistance = 1

  function onTouchStart(e) {
    setTouchEndX(null)
    setTouchStartX(e.targetTouches[0].clientX)

    setTouchEndY(null)
    setTouchStartY(e.targetTouches[0].clientY)
  }

  function onTouchMove(e) {
    setTouchEndX(e.targetTouches[0].clientX)
    setTouchEndY(e.targetTouches[0].clientY)
  }

  function onTouchEnd() {
    if (touchStartX && touchEndX) swipeHorizontal()
    if (touchStartY && touchEndY) swipeVertical()
  }

  function swipeHorizontal() {
    const xDistance = touchStartX - touchEndX
    const yDistance = touchStartY - touchEndY

    if (Math.abs(yDistance) >= Math.abs(xDistance)) {
      return;
    }

    const isLeftSwipe = xDistance > minSwipeDistance
    const isRightSwipe = xDistance < -minSwipeDistance

    if (isLeftSwipe && options.onSwipeLeft) {
      options.onSwipeLeft();
    }

    if (isRightSwipe && options.onSwipeRight) {
      options.onSwipeRight();
    }
  }


  function swipeVertical() {
    const xDistance = touchStartX - touchEndX
    const yDistance = touchStartY - touchEndY

    if (Math.abs(xDistance) >= Math.abs(yDistance)) {
      return;
    }

    const isUpSwipe = yDistance > minSwipeDistance
    const isDownSwipe = yDistance < -minSwipeDistance

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
  }
}
