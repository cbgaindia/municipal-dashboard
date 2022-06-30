import { useEffect, useState } from 'react';

function useWindowDimensions() {
  const _a = useState({
    height: undefined,
    width: undefined,
  });
  const windowDimensions = _a[0];
  const setWindowDimensions = _a[1];
  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return window.removeEventListener('resize', handleResize, {
      passive: true,
    });
  }, [setWindowDimensions]);
  return windowDimensions;
}

export default useWindowDimensions;
