import { useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import ImageUpload from "../image-uploader";
import { Rnd } from "react-rnd";

const cropDefault = {
  x: 165,
  y: 58,
  width: 100,
  height: 100,
};

const PANEL_SIZE = {
  width: 350,
  height: 350,
};

export default function ReactImageCrop() {
  const [image, setImage] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const RndRef = useRef<InstanceType<typeof Rnd>>(null);

  const imageUrl = useMemo(() => {
    return image && URL.createObjectURL(image);
  }, [image]);

  const crop = () => {
    if (!canvasRef.current || !imageUrl) return;

    const image = new Image();
    image.src = imageUrl;

    const ctx = canvasRef.current.getContext("2d");

    image.onload = function () {
      const canvas = canvasRef.current;
      const rndElement = RndRef.current;

      if (!ctx || !canvas || !rndElement) return;

      if (
        !("x" in rndElement.draggable.state) ||
        !("y" in rndElement.draggable.state)
      ) {
        return;
      }

      // Get the crop dimensions from Rnd component
      const cropBox = {
        x: rndElement.draggable.state.x,
        y: rndElement.draggable.state.y,
        width: rndElement.resizable.state.width,
        height: rndElement.resizable.state.height,
      } as {
        [key: string]: number;
      };

      // Calculate scale factors
      const scaleX = image.naturalWidth / PANEL_SIZE.width;
      const scaleY = image.naturalHeight / PANEL_SIZE.height;

      // Scale crop coordinates to match original image dimensions
      const scaledCrop = {
        x: cropBox.x * scaleX,
        y: cropBox.y * scaleY,
        width: cropBox.width * scaleX,
        height: cropBox.height * scaleY,
      };

      canvas.width = scaledCrop.width;
      canvas.height = scaledCrop.height;

      console.log(image.naturalWidth, image.naturalHeight);

      // Draw the cropped portion of the image
      ctx.drawImage(
        image,
        scaledCrop.x,
        scaledCrop.y,
        scaledCrop.width,
        scaledCrop.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };
  };

  return (
    <div
      className="flex flex-col gap-2"
      style={{
        width: `${PANEL_SIZE.width}px`,
      }}
    >
      {imageUrl && (
        <div className="relative overflow-hidden select-none">
          <div style={{ height: `${PANEL_SIZE.height}px` }}>
            <img src={imageUrl} alt="Image" className="w-full h-full " />
          </div>

          {/* Crop Handler */}
          <div className="absolute inset-0 w-full h-full">
            <Rnd
              ref={RndRef}
              default={cropDefault}
              minHeight={cropDefault.height}
              minWidth={cropDefault.width}
              maxHeight={PANEL_SIZE.height}
              maxWidth={PANEL_SIZE.width}
              bounds={"parent"}
              className="border-2 border-white border-dotted crop-overlay"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <ImageUpload image={image} setImage={setImage} />
        {image && <Button onClick={crop}>Crop Image</Button>}
      </div>

      {image && (
        <canvas
          className="bg-red-50"
          style={{
            width: `${PANEL_SIZE.width}px`,
            height: `${PANEL_SIZE.height}px`,
          }}
          ref={canvasRef}
          width={PANEL_SIZE.width}
          height={PANEL_SIZE.height}
        />
      )}
    </div>
  );
}