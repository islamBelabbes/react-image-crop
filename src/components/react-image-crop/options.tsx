import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TOptions, useReactImageCrop } from "./react-image-crop-provider";
import { CheckedState } from "@radix-ui/react-checkbox";

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
        width: image.width / scaleFactor - x,
        height: image.height / scaleFactor - y,
        x: image.width / scaleFactor - width,
        y: image.height / scaleFactor - height,
      };

      // Only shift x when increasing width
      if (
        key === "width" &&
        value > width &&
        x + width === image.width / scaleFactor
      ) {
        const diff = value - width;
        x = Math.max(x - diff, minValues.x);
      }

      // Only shift y when increasing height
      if (
        key === "height" &&
        value > height &&
        y + height === image.height / scaleFactor
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="width">Width</Label>
          <Input
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
            type="number"
            id="y"
            placeholder="Y"
            value={options.y}
            onChange={(e) => handleInputChange(e, "y")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="original">Crop Original Image?</Label>
          <Checkbox
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
