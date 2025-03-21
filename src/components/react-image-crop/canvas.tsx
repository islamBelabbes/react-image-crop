import { Rnd } from "react-rnd";
import { useReactImageCrop } from "./react-image-crop-provider";
import { useMemo, useRef } from "react";

function Canvas() {
  const { image, canvasRef, options, setOptions, scaleFactor } =
    useReactImageCrop();
  const url = useMemo(() => image && URL.createObjectURL(image.file), [image]);
  const ref = useRef<Rnd>(null);

  if (!image || !url) return null;
  return (
    <div className="h-full border  w-full flex justify-center items-center relative">
      <div
        className="relative overflow-hidden max-h-full max-w-full"
        style={{
          width: image.width / scaleFactor,
          height: image.height / scaleFactor,
          maxHeight: "100vh",
          maxWidth: "100vw",
        }}
      >
        <img src={url} alt="Image" className="absolute w-full h-full" />

        <div className="absolute inset-0 w-full h-full">
          <Rnd
            ref={ref}
            position={{
              x: options.x,
              y: options.y,
            }}
            size={{
              width: options.width,
              height: options.height,
            }}
            default={options}
            minHeight={1}
            minWidth={1}
            className="border-2 border-white border-dotted crop-overlay"
            bounds={"parent"}
            onDragStop={(_, data) =>
              setOptions((prev) => ({ ...prev, ...data }))
            }
            onResizeStop={(_, __, ref, ___, position) => {
              const width = +ref.style.width.split("px")[0] || 0;
              const height = +ref.style.height.split("px")[0] || 0;
              const data = {
                ...position,
                width,
                height,
              };
              return setOptions((prev) => ({ ...prev, ...data }));
            }}
          />
        </div>
      </div>

      <canvas hidden ref={canvasRef} />
    </div>
  );
}

export default Canvas;
