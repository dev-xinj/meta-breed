"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    title: "Tư liệu quý cho anh em đi làm trễ hoặc muốn nghỉ 1 2 ng",
    createdDate: new Date(),
    viewNum: 0,
    viewerNum: 0,
    followerNum: 0,
    interactNum: 0,
    reactionNum: 0,
    commentNum: 0,
    shareNum: 0,
    saveNum: 0,
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    title: "Tư liệu quý cho anh em đi làm trễ hoặc muốn nghỉ 1 2 ng",
    createdDate: new Date(),
    viewNum: 0,
    viewerNum: 0,
    followerNum: 0,
    interactNum: 0,
    reactionNum: 0,
    commentNum: 0,
    shareNum: 0,
    saveNum: 0,
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    title: "Tư liệu quý cho anh em đi làm trễ hoặc muốn nghỉ 1 2 ng",
    createdDate: new Date(),
    viewNum: 0,
    viewerNum: 0,
    followerNum: 0,
    interactNum: 0,
    reactionNum: 0,
    commentNum: 0,
    shareNum: 0,
    saveNum: 0,
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    title: "Tư liệu quý cho anh em đi làm trễ hoặc muốn nghỉ 1 2 ng",
    createdDate: new Date(),
    viewNum: 0,
    viewerNum: 0,
    followerNum: 0,
    interactNum: 0,
    reactionNum: 0,
    commentNum: 0,
    shareNum: 0,
    saveNum: 0,
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    title: "Tư liệu quý cho anh em đi làm trễ anh em đi làm trễ hoặc muốn nghỉanh em đi làm trễ hoặc muốn nghỉanh em đi làm trễ hoặc muốn nghỉhoặc muốn nghỉ 1 2 ng",
    createdDate: new Date(),
    viewNum: 0,
    viewerNum: 0,
    followerNum: 0,
    interactNum: 0,
    reactionNum: 0,
    commentNum: 0,
    shareNum: 0,
    saveNum: 0,
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  ///
  title: string;
  createdDate: Date;
  viewNum: number;
  viewerNum: number;
  followerNum: number;
  interactNum: number;
  reactionNum: number;
  commentNum: number;
  shareNum: number;
  saveNum: number;
};

export const columns: ColumnDef<Payment>[] = [
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
      return <div className="text-left text-wrap w-64  font-medium">{row.getValue("title")}</div>;
    },
  },
   {
    accessorKey: "viewNum",
    header: () => {
      return <div className="text-center">Lượt xem</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("viewNum")}</div>;
    },
  },{
    accessorKey: "viewerNum",
    header: () => {
      return <div className="text-center">Người xem</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("viewerNum")}</div>;
    },
  },
  {
    accessorKey: "followerNum",
    header: () => {
      return <div className="text-center">Lượt theo dõi</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("followerNum")}</div>;
    },
  },
  {
    accessorKey: "interactNum",
    header: () => {
      return <div className="text-center">Lượt tương tác</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("interactNum")}</div>;
    },
  },
  {
    accessorKey: "reactionNum",
    header: () => {
      return <div className="text-center">Cảm xúc</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("reactionNum")}</div>;
    },
  },
  {
    accessorKey: "commentNum",
    header: () => {
      return <div className="text-center">Lượt bình luận</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("commentNum")}</div>;
    },
  },
  {
    accessorKey: "shareNum",
    header: () => {
      return <div className="text-center">Chia sẻ</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("shareNum")}</div>;
    },
  },
  {
    accessorKey: "saveNum",
    header: () => {
      return <div className="text-center">Lượt lưu</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("saveNum")}</div>;
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

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="sm:max-w-[1100px]">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
