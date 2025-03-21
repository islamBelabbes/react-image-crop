import ReactImageCropProvider, {
  useReactImageCrop,
} from "./react-image-crop-provider";
import ImageUpload from "../image-upload";
import Canvas from "./canvas";
import SideBar from "./side-bar";
import Options from "./options";
import { Button } from "../ui/button";

const ReactImageCropContent = () => {
  const { image, setImage, handleCrop } = useReactImageCrop();

  return (
    <div className="flex w-full">
      <div className="bg-muted/20 grow flex items-center justify-center flex-col lg:flex-row">
        {image ? <Canvas /> : <ImageUpload setImage={setImage} />}
      </div>

      <SideBar>
        <Options />
        <Button onClick={handleCrop} className="w-full mt-2">
          Download Cropped Image
        </Button>
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
