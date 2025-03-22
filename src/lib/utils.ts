import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const MAX_VIEWPORT_WIDTH = 0.8; // 80% of viewport width
const MAX_VIEWPORT_HEIGHT = 0.8; // 80% of viewport height

export const calculateOptimalScaling = (
  imageWidth: number,
  imageHeight: number
): number => {
  // Get viewport dimensions
  const viewportWidth = window.innerWidth * MAX_VIEWPORT_WIDTH;
  const viewportHeight = window.innerHeight * MAX_VIEWPORT_HEIGHT;

  // Calculate scale ratios
  const widthRatio = viewportWidth / imageWidth;
  const heightRatio = viewportHeight / imageHeight;

  if (imageWidth <= viewportWidth && imageHeight <= viewportHeight) {
    // Image is smaller than viewport - no scaling needed
    return 1;
  }

  // Return the smaller ratio to fit both dimensions
  return Math.min(widthRatio, heightRatio);
};

export const getScaledDimensions = (image: {
  width: number;
  height: number;
}) => {
  const scaleFactor = calculateOptimalScaling(image.width, image.height);

  return scaleFactor;
};
