import { Author } from "./Author";

export enum Category {
	FICÇÃO = "FICÇÃO",
	ROMANCE = "ROMANCE",
	TERROR = "TERROR",
	CIÊNCIA = "CIÊNCIA",
	INFANTIL = "INFANTIL",
}

export enum BookState {
  DISPONÍVEL = "0",
  INDISPONÍVEL = "1",
}

export type Book = {
	id: number;
	category: Category;
	isbn: string;
	publicationDate: string;
	state: BookState;
	title: string;
	authors: Author[];
}