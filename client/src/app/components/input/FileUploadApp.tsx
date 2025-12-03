/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { useUploadFileStore } from "@/hooks/useUploadFile";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
export function FileUploadApp({ ...props }) {
  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);
  const files = useUploadFileStore((state) => state.files);
  const setFiles = useUploadFileStore((state) => state.setFiles);
  return (
    <FileUpload
      multiple={false}
      className="w-full max-w-md"
      value={files}
      onValueChange={(val: File[]) => setFiles(val)}
      onFileReject={onFileReject}
      {...props}
    >
      <FileUploadDropzone className=" hover:bg-violet-50">
        <div className="flex flex-col items-center gap-1 text-center ">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className=" size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drag & drop files here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (max 2 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-fit bg-violet-500 text-violet-50 hover:bg-violet-200 hover:text-violet-500"
          >
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <FileUploadItemPreview></FileUploadItemPreview>
            <FileUploadItemMetadata></FileUploadItemMetadata>
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <X />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}
