"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import CellAction from "./cell-actions";
import { Author } from "@/types/Author";

export const columns: ColumnDef<Author>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "age",
    header: "Idade",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
