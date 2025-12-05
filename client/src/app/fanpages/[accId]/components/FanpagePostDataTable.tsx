"use client";
import { FBPostItemResponse } from "@/app/fanpages/[accId]/schemas/fanpage-post.schema";
import { findAllPagePost } from "@/app/fanpages/[accId]/services/fanpage-post.service";
import { FanpageTable } from "@/app/fanpages/[accId]/types/fanpage-post.type";
import { FanpagePostColumns } from "@/app/common/columns/fanpage-post.columns";
import { dialogPropsCommentLink } from "@/domain/props/dialog.data";
import { useEffect, useState } from "react";
import { DialogModal } from "../../../components/modal/DialogModal";
import { DataTableApp } from "../../../components/table/DataTableApp";
import { mapperFanpagePost } from "../mappers/fanpage-post.mapper";

export default function PostDataTable({ pageId }: { pageId: string }) {
  const [dataRaw, setDataRaw] = useState<FanpageTable[]>([]);
  useEffect(() => {
    findAllPagePost(pageId).then((results) => {
      const raws = results.data.map((raw: FBPostItemResponse) =>
        mapperFanpagePost(raw)
      );
      setDataRaw(raws);
    });
  }, [pageId]);

  return (
    <DataTableApp filter="title" columns={FanpagePostColumns} data={dataRaw}>
      <DialogModal
        isOpen={false}
        handleSave={() => console.log("handleSave")}
        handleOpenChange={() => console.log("handleOpenChange")}
        dialogProps={dialogPropsCommentLink}
      ></DialogModal>
    </DataTableApp>
  );
}
