import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type TImageUploadProps = {
  image: File | null;
  setImage: (image: File) => void;
  className?: string;
  disabled?: boolean;
};

export default function ImageUpload({
  image,
  setImage,
  className,
  disabled,
}: TImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    multiple: true,
  });
  return (
    <div
      {...getRootProps({ draggable: false })}
      className={buttonVariants({
        variant: "default",
        className: cn(
          "w-full cursor-pointer text-lg text-white",
          {
            "cursor-not-allowed opacity-50": disabled,
          },
          className
        ),
      })}
    >
      <input {...getInputProps()} disabled={disabled} />

      <span>{image ? "change image" : "upload image"}</span>
    </div>
  );
}
