'use client'
import { MultiSelect } from "@/components/ui/multi-select";

const options = [
  { label: "Small Option", value: "small" },
  { label: "Medium Option", value: "medium" },
  { label: "Large Option with Long Text", value: "large" },
];

// Different sizing options
export function SizingExamples() {
  return (
    <div className="space-y-6">
      {/* Large size */}
      <div>
        <label className="text-sm font-medium mb-2 block">Large Size</label>
        <MultiSelect
          options={options}
          onValueChange={(value) => console.log(value)}
          placeholder="Large multi-select"
          className="w-96 text-lg"
        />
      </div>

    </div>
  );
}