"use client";
import { FanpageColumnData } from "@/app/fanpages/mock/fanpage.data";
import { MultiSelect } from "@/components/ui/multi-select";
import { useState } from "react";

// Different sizing options
export function MultiSelectApp({
  value,
  onChange,
}: {
  value: any[];
  onChange: (val: any[]) => void;
}) {
  const [options, setOptions] = useState(() => {
    return FanpageColumnData.map((row) => {
      return {
        label: row.pageName || row.pageUUID,
        value: JSON.stringify(row),
      };
    });
  });
  return (
    <div className="space-y-6">
      {/* Large size */}
      <div>
        <label className="text-sm font-medium mb-2 block">Thêm tài khoản</label>
        <MultiSelect
          options={options}
          // onValueChange={(value) => console.log(value)}
          value={value}
          onValueChange={(val: string[]) => {
            onChange(val);
            console.log(val);
          }}
          placeholder="Chưa có tài khoản nào"
          className="w-96 text-lg"
        />
      </div>
    </div>
  );
}
