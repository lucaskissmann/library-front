"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { Renter } from "@/types/Renter";
import CellAction from "./cell-actions";

export const columns: ColumnDef<Renter>[] = [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "gender",
    header: "Gênero",
  },
  {
    accessorKey: "birthDate",
    header: "Data de Nascimento",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
