"use client";
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
import { Post } from "@/domain/posts/post.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
export const postColumns: ColumnDef<Post>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "title",
    header: () => {
      return <div className="text-center">Title</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-left text-wrap w-64  font-medium">
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    accessorKey: "viewNum",
    header: () => {
      return <div className="text-center">Lượt xem</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("viewNum")}</div>
      );
    },
  },
  {
    accessorKey: "viewerNum",
    header: () => {
      return <div className="text-center">Người xem</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("viewerNum")}
        </div>
      );
    },
  },
  {
    accessorKey: "followerNum",
    header: () => {
      return <div className="text-center">Lượt theo dõi</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("followerNum")}
        </div>
      );
    },
  },
  {
    accessorKey: "interactNum",
    header: () => {
      return <div className="text-center">Lượt tương tác</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("interactNum")}
        </div>
      );
    },
  },
  {
    accessorKey: "reactionNum",
    header: () => {
      return <div className="text-center">Cảm xúc</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("reactionNum")}
        </div>
      );
    },
  },
  {
    accessorKey: "commentNum",
    header: () => {
      return <div className="text-center">Lượt bình luận</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("commentNum")}
        </div>
      );
    },
  },
  {
    accessorKey: "shareNum",
    header: () => {
      return <div className="text-center">Chia sẻ</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("shareNum")}
        </div>
      );
    },
  },
  {
    accessorKey: "saveNum",
    header: () => {
      return <div className="text-center">Lượt lưu</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("saveNum")}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert("Clicked!")}>
              View customer
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
