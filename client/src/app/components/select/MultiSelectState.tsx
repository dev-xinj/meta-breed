"use client";
import { MultiSelect } from "@/components/ui/multi-select";
import { useMultiSelectStore } from "@/hooks/useMultiSelect";

// Different sizing options
export function MultiselectState({
  options,
  selected,
}: {
  options: { label: string; value: string }[];
  selected?: string[];
}) {
  // const selected = useMultiSelectStore((state) => state.selected);
  const setSelected = useMultiSelectStore((state) => state.setSelected);

  return (
    <div className="space-y-6">
      {/* Large size */}
      <div>
        <label className="text-sm font-medium mb-2 block">Thêm tài khoản</label>
         
        <MultiSelect
          options={options}
          // onValueChange={(value) => console.log(value)}
          value={selected}
          defaultValue={selected}
          onValueChange={(val: string[]) => setSelected(val)}
          placeholder="Chưa có tài khoản nào"
          className="w-96 text-lg"
        />
      </div>
    </div>
  );
}
