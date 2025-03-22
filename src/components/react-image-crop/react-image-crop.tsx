import ReactImageCropProvider, {
  useReactImageCrop,
} from "./react-image-crop-provider";
import ImageUpload from "../image-upload";
import Canvas from "./canvas";
import SideBar from "./side-bar";
import Options from "./options";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const ReactImageCropContent = () => {
  const { image, setImage, handleCrop, imageUploadRef } = useReactImageCrop();

  const disabled = !image;
  return (
    <div className="flex w-full">
      <div className="bg-muted/20 grow flex items-center justify-center flex-col lg:flex-row">
        {image && <Canvas />}

        <ImageUpload
          setImage={setImage}
          ref={imageUploadRef}
          className={cn({
            "opacity-0 size-0": image,
          })}
        />
      </div>

      <SideBar>
        <Options />
        {image?.width}
        <Button
          onClick={handleCrop}
          className="w-full mt-2"
          disabled={disabled}
        >
          Download Cropped Image
        </Button>

        {image && (
          <Button
            onClick={() => {
              console.log(imageUploadRef);
              console.log(imageUploadRef.current);

              imageUploadRef.current?.click();
            }}
            className="w-full mt-2"
          >
            upload new image
          </Button>
        )}
      </SideBar>
    </div>
  );
};

export default function ReactImageCrop() {
  return (
    <ReactImageCropProvider>
      <ReactImageCropContent />
    </ReactImageCropProvider>
  );
}
