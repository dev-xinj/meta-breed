"use client";
import { BackendApi } from "@/app/api/internal/backend.api";
import { PostPageData } from "@/app/mock/posts.data";
import { postColumns } from "@/domain/posts/post.columns";
import { dialogPropsCommentLink } from "@/domain/props/dialog.data";
import { useEffect, useState } from "react";
import { DialogModal } from "../modal/DialogModal";
import { DataTableApp } from "./DataTableApp";

export default function PostTableApp({ pageId }: { pageId: string }) {
  const [dataRaw, setDataRaw] = useState([]);
  useEffect(() => {
    BackendApi.getPagePosts(pageId);
  }, [pageId]);
  return (
    <DataTableApp filter="title" columns={postColumns} data={PostPageData}>
      <DialogModal
        isOpen={false}
        handleSave={() => console.log("handleSave")}
        handleOpenChange={() => console.log("handleOpenChange")}
        dialogProps={dialogPropsCommentLink}
      ></DialogModal>
    </DataTableApp>
  );
}
