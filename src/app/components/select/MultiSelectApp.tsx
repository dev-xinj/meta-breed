"use client";
import { MultiSelect } from "@/components/ui/multi-select";
import { useState } from "react";

const options = [
  { label: "Small Option", value: "small" },
  { label: "Medium Option", value: "medium" },
  { label: "Large Option with Long Text", value: "large" },
];

// Different sizing options
export function MultiSelectApp() {
  const [listValue, setListValue] = useState<string[]>([]);
  return (
    <div className="space-y-6">
      {/* Large size */}
      <div>
        <label className="text-sm font-medium mb-2 block">Thêm tài khoản</label>
        <MultiSelect
          options={options}
          // onValueChange={(value) => console.log(value)}
          value={listValue}
          onValueChange={(value: string[]) => {
            setListValue(value);
            console.log(value);
          }}
          placeholder="Chưa có tài khoản nào"
          className="w-96 text-lg"
        />
      </div>
    </div>
  );
}
