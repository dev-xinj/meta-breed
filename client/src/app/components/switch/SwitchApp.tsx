import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Children } from "react";

export function SwitchApp({
  value,
  onCheckedChange,
}: {
  value: boolean;
  onCheckedChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={value}
        onCheckedChange={(value) => {
          onCheckedChange(value);
          console.log(value);
        }}
        id="airplane-mode"
      />
      <Label htmlFor="airplane-mode">Tương tác bình luận</Label>
    </div>
  );
}
