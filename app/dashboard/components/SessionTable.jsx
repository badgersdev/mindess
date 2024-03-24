"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import { printColumns } from "@/app/dashboard/components/columns/columns";

// ui
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SessionTable = ({ prints }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [sorting, setSorting] = useState([]);

  const sortedPrints = prints.sort((p1, p2) => {
    const date1 = new Date(p1.created_at);
    const date2 = new Date(p2.created_at);
    if (date1 < date2) {
      return 1;
    }
    if (date1 > date2) {
      return -1;
    }
    return 0;
  });

  useEffect(() => {
    const channel = supabase
      .channel("all-changes-print-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "prints",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [supabase, router]);

  const table = useReactTable({
    data: sortedPrints,
    columns: printColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="mt-10 flex flex-col items-center">
      {prints && (
        <ScrollArea className="h-[450px] min-w-fit border-[1px] rounded-sm">
          <Table className="w-full rounded-sm bg-[#0000004d] px-4">
            <TableHeader className="px-4">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="pt-2">
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
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-customTextDark ">
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
        </ScrollArea>
      )}
    </div>
  );
};

export default SessionTable;
