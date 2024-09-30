import { Author } from "./Author";

export enum Category {
	FICÇÃO = "FICÇÃO",
	ROMANCE = "ROMANCE",
	TERROR = "TERROR",
	CIÊNCIA = "CIÊNCIA",
	INFANTIL = "INFANTIL",
}

export enum BookState {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
}

export type Book = {
	id: number;
	category: Category;
	isbn: string;
	publicationDate: Date;
	state: BookState;
	title: string;
	authors: Author[];
}