import { Book } from "./Book";
import { Renter } from "./Renter"

export type Rental = {
	id: string;
	renter: Renter;
	books: Book[];
	rentalDate: Date;
	returnDate: Date;
	isReturned: boolean;
}