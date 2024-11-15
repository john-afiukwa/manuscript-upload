"use client"

import React from "react"
import {
  ColumnDef,
} from "@tanstack/react-table"
import { ArrowUpDown, Download } from "lucide-react"

import { Button } from "@/components/ui/button"

import { DataTable } from "@src/app/components/DataTable"
import { getUserManuscriptsAction, ManuscriptRecord } from "@src/app/api/manuscripts"
import { useQuery } from "@tanstack/react-query"

export const columns: ColumnDef<ManuscriptRecord>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Title</span>
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ManuscriptRecord = row.original

      return (
        <div className="w-full text-right">
          <Button
            className={`self-end hover:bg-gray-200`}
            size={"icon"}
            variant={"link"}
            onClick={() => {
              const link = document.createElement("a");
              link.href = ManuscriptRecord.docUrl;
              link.download = ManuscriptRecord.title;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download />
          </Button>
        </div>
      )
    },
  },
]

export function ManuscriptsDataTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["manuscripts"],
    queryFn: getUserManuscriptsAction,
  })

  return <DataTable<ManuscriptRecord> data={data || []} columns={columns} searchBy="title" loading={isLoading} />
}
