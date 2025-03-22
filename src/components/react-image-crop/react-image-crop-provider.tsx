import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getScaledDimensions } from "@/lib/utils";
import { useWindowSize } from "@/hooks/use-window-size";
import { TImage } from "@/components/image-upload";

export type TOptions = {
  original: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
};

type TContext = {
  image: TImage | null;
  setImage: (image: TImage) => void;
  handleCrop: () => void;
  options: TOptions;
  setOptions: React.Dispatch<React.SetStateAction<TOptions>>;
  scaleFactor: number;
  imageUploadRef: React.RefObject<HTMLInputElement | null>;
};

const ReactImageCropContent = createContext<TContext | null>(null);

export const useReactImageCrop = () => {
  const context = useContext(ReactImageCropContent);
  if (context === null) {
    throw new Error(
      "useReactImageCrop must be used within a ReactImageCropProvider"
    );
  }
  return context;
};

const defaultOptions: TOptions = {
  original: true,
  x: 0,
  y: 0,
  width: 100,
  height: 100,
};

function ReactImageCropProvider({ children }: { children: React.ReactNode }) {
  const [image, setImage] = useState<TImage | null>(null);
  const [options, setOptions] = useState(defaultOptions);
  const [scaleFactor, setScaleFactor] = useState(0);

  const imageUploadRef = useRef<HTMLInputElement | null>(null);

  const { width, height } = useWindowSize();

  const handleCrop = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!image || !ctx) return;

    const url = URL.createObjectURL(image.file);
    const img = new Image();
    img.src = url;
    await new Promise((resolve) => (img.onload = resolve));

    const cropBox = {
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
    } as {
      [key: string]: number;
    };

    // Scale crop coordinates to match original image dimensions
    const scaledCrop = {
      x: cropBox.x / scaleFactor,
      y: cropBox.y / scaleFactor,
      width: cropBox.width / scaleFactor,
      height: cropBox.height / scaleFactor,
    };

    canvas.width = options.original ? scaledCrop.width : cropBox.width;
    canvas.height = options.original ? scaledCrop.height : cropBox.height;

    // Draw the cropped portion of the image
    ctx.drawImage(
      img,
      scaledCrop.x,
      scaledCrop.y,
      scaledCrop.width,
      scaledCrop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Convert canvas to Base64
    const base64 = canvas.toDataURL("image/png");

    // Create a download link
    const link = document.createElement("a");
    link.href = base64;
    link.download = "cropped-image.png"; // File name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const _setImage = useCallback((image: TImage) => {
    setOptions(defaultOptions);
    setScaleFactor(getScaledDimensions(image));
    return setImage(image);
  }, []);

  useEffect(() => {
    if (image) {
      setScaleFactor(getScaledDimensions(image));
      setOptions(defaultOptions);
    }
  }, [width, height]);

  const values = {
    image,
    setImage: _setImage,
    handleCrop,
    options,
    setOptions,
    scaleFactor,
    imageUploadRef,
  };

  return (
    <ReactImageCropContent.Provider value={values}>
      {children}
    </ReactImageCropContent.Provider>
  );
}

export default ReactImageCropProvider;
