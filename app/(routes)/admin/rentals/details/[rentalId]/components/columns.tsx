"use client";

import StateCell from "@/app/(routes)/admin/books/components/state-cell";
import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "bookTitle",
    headerName: "Título do Livro",
		flex: 1
  },
  {
    field: "bookState",
    headerName: "Status do livro",
		flex: 1,
		renderCell: (params) => <StateCell state={params.value} />
  },
  {
    field: "rentalDate",
    headerName: "Data de Retirada",
		flex: 1
  },
  {
    field: "returnDate",
    headerName: "Data de Devolução",
		flex: 1
  },
];
