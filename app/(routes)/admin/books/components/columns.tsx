"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { Book } from "@/types/Book";
import CellAction from "./cell-actions";
import StateCell from "./state-cell";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "publicationDate",
    header: "Data de Publicação",
  },
  {
    accessorKey: "state",
    header: "Status",
    cell: ({ row }) => <StateCell state={row.original.state} />
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
