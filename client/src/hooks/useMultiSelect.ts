import { create } from "zustand";

type MultiSelectStore = {
  selected: string[];
  setSelected: (val: string[]) => void;
};

export const useMultiSelectStore = create<MultiSelectStore>((set)=>({
    selected: [],
    setSelected: (val)=>set({selected: val})
}))
