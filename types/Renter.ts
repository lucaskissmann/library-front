import { Gender } from "./Author";

export type Renter = {
	id: number;
  name: string;
  birthDate: number;
  cpf: string;
	gender: Gender;
	phone: string;
	email: string;
}