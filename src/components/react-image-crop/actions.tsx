import { useReactImageCrop } from "./react-image-crop-provider";
import { Button } from "../ui/button";

function Actions() {
  const { handleCrop, imageUploadRef, image } = useReactImageCrop();
  const disabled = !image;

  return (
    <>
      <Button onClick={handleCrop} className="w-full mt-2" disabled={disabled}>
        Download Cropped Image
      </Button>

      {image && (
        <Button
          onClick={() => imageUploadRef.current?.click()}
          className="w-full mt-2"
          variant={"secondary"}
        >
          upload new image
        </Button>
      )}
    </>
  );
}

export default Actions;
