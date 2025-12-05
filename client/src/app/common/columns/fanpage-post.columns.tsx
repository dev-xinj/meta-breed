"use client";
import { FanpageTable } from "@/app/fanpages/[accId]/types/fanpage-post.type";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
export const FanpagePostColumns: ColumnDef<FanpageTable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pageUUID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className=" w-24 lowercase">{row.getValue("pageUUID")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className=" text-wrap w-64 lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "created_time",
    header: () => {
      return <div className="text-center">Ngày tạo</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("created_time")}</div>
      );
    },
  },
  {
    accessorKey: "updated_time",
    header: () => {
      return <div className="text-center">Lần chỉnh sửa</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("updated_time")}
        </div>
      );
    },
  },
  {
    accessorKey: "status_type",
    header: () => {
      return <div className="text-center">Loại bài viết</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("status_type")}
        </div>
      );
    },
  },
  {
    accessorKey: "totalComments",
    header: () => {
      return <div className="text-center">Lượt bình luận</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("totalComments")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const fanpagePost = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(fanpagePost.fanpagePostUUID)}
            >
              Copy postUUID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert("Clicked!")}>
              Comment hàng loạt
            </DropdownMenuItem>
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
