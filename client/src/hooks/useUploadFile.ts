import { create } from "zustand";

type UploadFileStore = {
  files: File[];
  setFiles: (files: File[]) => void;
};

export const useUploadFileStore = create<UploadFileStore>((set) => ({
  files: [],
  setFiles: (val) => set({ files: val }),
}));
