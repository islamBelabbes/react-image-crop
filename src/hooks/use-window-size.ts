import { useEffect, useState } from "react";

type TWindowSize = {
  width: number;
  height: number;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<TWindowSize>({
    width: window.innerWidth || 0,
    height: window.innerHeight || 0,
  });

  useEffect(() => {
    const handleResize = () => {
      // this check is needed because how the event works on mobile
      if (windowSize.width !== window.innerWidth) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize]);

  return windowSize;
};
