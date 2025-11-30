"use client";
import { PostPageData } from "@/app/mock/posts.data";
import { postColumns } from "@/domain/posts/post.columns";
import { DataTableApp } from "./DataTableApp";

export default function PostTableApp() {
  return (
    <DataTableApp filter="title" columns={postColumns} data={PostPageData}>
      {/* <DialogModal
        dialogProps={dialogPropsFromAccount}
        handleSave={() => console.log("123")}
        handleOpenChange={() => console.log("123")}
      >
        <TabFromAccount></TabFromAccount>
      </DialogModal> */}
    </DataTableApp>
  );
}
