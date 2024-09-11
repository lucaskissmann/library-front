import { ColumnDef } from "@tanstack/react-table"

export type AuthorColumns = {
  id: string;
  name: number;
  age: number;
  cpf: string;
	gender: string;
}

export const columns: ColumnDef<AuthorColumns>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "age",
    header: "Ano Nascimento",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "gender",
    header: "Sexo",
  },
]
