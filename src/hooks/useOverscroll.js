import { useEffect, useState } from 'react';

const useOverscroll = (options = {}) => {
  const {
    threshold = 5,
    onOverscroll,
    disabled = false,
    enableTop = true,
    enableBottom = true
  } = options;

  const [state, setState] = useState({
    isOverscrollingTop: false,
    isOverscrollingBottom: false,
    distance: 0,
    direction: null
  });

  useEffect(() => {
    if (disabled) return;

    let touchStartY = 0;
    let lastScrollY = 0;

    const isAtTop = () => window.scrollY === 0;

    const isAtBottom = () => {
      const scrollHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
      );
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      return Math.abs(scrollHeight - windowHeight - scrollY) < 1;
    };

    const updateState = (isTop, isBottom, distance, direction) => {
      setState(prev => {
        // Only update if there's a change to prevent unnecessary renders
        if (
            prev.isOverscrollingTop === isTop &&
            prev.isOverscrollingBottom === isBottom &&
            prev.distance === distance &&
            prev.direction === direction
        ) {
          return prev;
        }

        const newState = {
          isOverscrollingTop: isTop,
          isOverscrollingBottom: isBottom,
          distance,
          direction
        };

        // Call onOverscroll if provided and there's actual overscrolling
        if (onOverscroll && (isTop || isBottom)) {
          onOverscroll(newState);
        }

        return newState;
      });
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      lastScrollY = window.scrollY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const diff = touchY - touchStartY;

      if (enableTop && isAtTop() && diff > threshold) {
        updateState(true, false, diff, 'top');
        e.preventDefault();
      } else if (enableBottom && isAtBottom() && diff < -threshold) {
        updateState(false, true, Math.abs(diff), 'bottom');
        e.preventDefault();
      } else {
        updateState(false, false, 0, null);
      }
    };

    const handleWheel = (e) => {
      if (enableTop && isAtTop() && e.deltaY < -threshold) {
        updateState(true, false, Math.abs(e.deltaY), 'top');
      } else if (enableBottom && isAtBottom() && e.deltaY > threshold) {
        updateState(false, true, e.deltaY, 'bottom');
      } else {
        updateState(false, false, 0, null);
      }
    };

    const handleScroll = () => {
      // Reset state if we're no longer at the edges
      if (!isAtTop() && !isAtBottom()) {
        updateState(false, false, 0, null);
      }
    };

    const handleTouchEnd = () => {
      updateState(false, false, 0, null);
    };

    // Attach event listeners
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, onOverscroll, disabled, enableTop, enableBottom]);

  return state;
};

export default useOverscroll;