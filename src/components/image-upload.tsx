import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon, Upload } from "lucide-react";
import { useCallback, useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";

export type TImage = {
  file: File;
  width: number;
  height: number;
};

type TImageUploadProps = {
  setImage: (image: { file: File; width: number; height: number }) => void;
  ref?: React.RefObject<HTMLInputElement | null>;
  className?: string;
};

export default function ImageUpload({
  setImage,
  ref,
  className,
}: TImageUploadProps) {
  const getImageDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () =>
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;

    const file = acceptedFiles[0];
    const { width, height } = await getImageDimensions(file);

    setImage({ file, width, height });
  }, []);

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  });

  useImperativeHandle(ref, () => inputRef.current, []);

  return (
    <div
      {...getRootProps({
        className: cn(
          "dropzone w-full max-w-3xl h-[500px] flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 p-8 text-center transition-colors hover:border-muted-foreground/50",
          className
        ),
      })}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <input {...getInputProps()} />
        <div className="rounded-full bg-background p-4 shadow-sm">
          <Upload className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">
            Upload an image to start cropping
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Drag and drop an image here, or click the button below to select a
            file from your computer.
          </p>
        </div>
        <Button className="mt-2">
          <ImageIcon className="mr-2 h-4 w-4" />
          Select Image
        </Button>
        <p className="text-xs text-muted-foreground">
          Supports: JPG, PNG, GIF (max 10MB)
        </p>
      </div>
    </div>
  );
}
