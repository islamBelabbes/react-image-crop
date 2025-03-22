import { useEffect, useState } from "react";

type TWindowSize = {
  width: number;
  height: number;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<TWindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
