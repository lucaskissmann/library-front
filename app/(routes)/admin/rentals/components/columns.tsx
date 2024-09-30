"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { Rental } from "@/types/Rental";
import CellAction from "./cell-actions";

export const columns: ColumnDef<Rental>[] = [
  {
    accessorKey: "renter",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Locatário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
		cell: ({ row }) => row.original.renter.name,
  },
	{
    accessorKey: "renterEmail",
    header: "Email",
    cell: ({ row }) => row.original.renter.email,
  },
  {
    accessorKey: "rentalDate",
    header: "Data de Retirada",
    cell: ({ row }) => new Date(row.original.rentalDate).toLocaleDateString(),
  },
  {
    accessorKey: "returnDate",
    header: "Data de Devolução",
    cell: ({ row }) => new Date(row.original.returnDate).toLocaleDateString(),
  },
  {
    accessorKey: "isReturned",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Devolvido
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (row.original.isReturned ? "Sim" : "Não"),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
