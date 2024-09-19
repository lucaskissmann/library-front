export enum Gender {
	Masculino = "masculino",
  Feminino = "feminino",
  Outros = "outros",
}

export type Author = {
  id: number;
  name: string;
  age: number;
  cpf: string;
	gender: Gender;
}