import ReactImageCropProvider, {
  useReactImageCrop,
} from "./react-image-crop-provider";
import ImageUpload from "../image-upload";
import Canvas from "./canvas";
import SideBar from "./side-bar";
import Options from "./options";
import { cn } from "@/lib/utils";
import Actions from "./actions";

const ReactImageCropContent = () => {
  const { image, setImage, imageUploadRef } = useReactImageCrop();

  return (
    <div className="flex w-full flex-col xl:flex-row">
      <div className="bg-muted/20 grow flex items-center justify-center flex-row">
        <Canvas />

        <ImageUpload
          setImage={setImage}
          ref={imageUploadRef}
          className={cn({
            hidden: image,
          })}
        />
      </div>

      <SideBar>
        <Options />
        <Actions />
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
