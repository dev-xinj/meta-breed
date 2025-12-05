"use client";
import { Account } from "@/app/accounts/types/account.type";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
export const AccountColumns = ({
  onDelete,
  onEdit,
}: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}): ColumnDef<Account>[] => [
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
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "uuid",
    header: () => <div className="text-center">UUID</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("uuid")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const account = row.original;

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
              onClick={() => navigator.clipboard.writeText(account.id)}
            >
              Copy ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer justify-between hover:bg-violet-50 hover:text-violet-500"
              onClick={() => onDelete(account.id)}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`cursor-pointer justify-between hover:bg-violet-50 hover:text-violet-500`}
              onClick={() => onEdit(account.id)}
            >
              Edit
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <Link
                href={`/fanpages/${account.uuid}`}
                className={`cursor-pointer justify-between hover:bg-violet-50 hover:text-violet-500`}
              >
                Danh sách posts
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
