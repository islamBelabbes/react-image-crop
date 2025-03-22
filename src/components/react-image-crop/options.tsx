import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TOptions, useReactImageCrop } from "./react-image-crop-provider";
import { CheckedState } from "@radix-ui/react-checkbox";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type TKey = Exclude<keyof TOptions, "original">;

function Options() {
  const { options, setOptions, image, scaleFactor } = useReactImageCrop();

  const handleOnCheckedChange = (checked: CheckedState) => {
    return setOptions({ ...options, original: Boolean(checked) });
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: TKey
  ) => {
    if (!image) return;

    const value = +e.target.value;

    setOptions((prev) => {
      let { width, height, x, y } = prev;

      const minValues = { width: 1, height: 1, x: 0, y: 0 };
      const maxValues = {
        width: Math.floor(image.width * scaleFactor - x),
        height: Math.floor(image.height * scaleFactor - y),
        x: Math.floor(image.width * scaleFactor - width),
        y: Math.floor(image.height * scaleFactor - height),
      };

      // Only shift x when increasing width
      if (
        key === "width" &&
        value > width &&
        x + width === Math.floor(image.width * scaleFactor)
      ) {
        const diff = value - width;
        x = Math.max(x - diff, minValues.x);
      }

      // Only shift y when increasing height
      if (
        key === "height" &&
        value > height &&
        y + height === Math.floor(image.height * scaleFactor)
      ) {
        const diff = value - height;
        y = Math.max(y - diff, minValues.y);
      }

      return {
        ...prev,
        x,
        y,
        [key]: Math.floor(
          Math.min(Math.max(value, minValues[key]), maxValues[key])
        ),
      };
    });
  };

  const disabled = !image;
  return (
    <Card
      className={cn({
        "opacity-50 pointer-events-none select-none": !image,
      })}
    >
      <CardHeader>
        <CardTitle>Crop Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="width">Width</Label>
          <Input
            disabled={disabled}
            type="number"
            id="width"
            placeholder="Width"
            value={options.width}
            onChange={(e) => handleInputChange(e, "width")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            disabled={disabled}
            type="number"
            id="height"
            placeholder="Height"
            value={options.height}
            onChange={(e) => handleInputChange(e, "height")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="x">X Position</Label>
          <Input
            disabled={disabled}
            type="number"
            id="x"
            placeholder="X"
            value={options.x}
            onChange={(e) => handleInputChange(e, "x")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="y">Y Position</Label>
          <Input
            disabled={disabled}
            type="number"
            id="y"
            placeholder="Y"
            value={options.y}
            onChange={(e) => handleInputChange(e, "y")}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <Label htmlFor="original">Crop Original Image?</Label>
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger className="bg-gray-50 rounded-full p-[1px]">
                  <QuestionMarkIcon className="size-[10px] stroke-secondary" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This Option if checked will Crop the original image size u
                    uploaded ({`${image?.width}x${image?.height}`}) otherwise it
                    will crop the image shown in the canvas
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Checkbox
            disabled={disabled}
            id="original"
            className="mt-0"
            checked={options.original}
            onCheckedChange={handleOnCheckedChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default Options;
