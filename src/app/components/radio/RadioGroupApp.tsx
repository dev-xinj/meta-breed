"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PopoverApp } from "../popover/PopoverApp";

export function RadioGroupApp({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <RadioGroup
      onValueChange={(val) => {
        onChange(val);
        // console.log(val);
      }}
      value={value}
      defaultValue="DEFAULT"
    >
      <div>Chọn loại tương tác</div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="DEFAULT" id="r1" />
        <Label htmlFor="r1">Sử dụng LIKE</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="REACTION" id="r2" />
        <Label htmlFor="r2">Sử dụng REACTION</Label>
        <PopoverApp></PopoverApp>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="none" id="r3" />
        <Label htmlFor="r3">Không</Label>
      </div>
    </RadioGroup>
  );
}
