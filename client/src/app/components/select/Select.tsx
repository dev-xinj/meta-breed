import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export type SelectOption = {
  value: string;
  label: string;
};

export type SelectConfig = {
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  options?: SelectOption[];
  onChange?: (val: string) => void;
};

export function SelectApp({ config }: { config: SelectConfig }) {
  return (
    <Select
      disabled={config.disabled}
      defaultValue={config.defaultValue}
      onValueChange={config.onChange}
    >
      <SelectTrigger className="w-[180px] cursor-pointer shadow-lg font-bold text-violet-500 hover:bg-violet-200 rounded-sm outline">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Lựa chọn</SelectLabel>
          {config?.options &&
            config.options.map((val) => (
              <SelectItem key={val.value} value={val.value}>
                {val.label}
              </SelectItem>
            ))}
          {/* <SelectItem value="apple">Nguyen Van A</SelectItem>
          <SelectItem value="banana">98465446213215163</SelectItem>
          <SelectItem value="blueberry">Le Ngoc Bao P</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
