import axios from "axios";
import { API_BASE_URL } from "@/config";
import { DataTable } from "@/components/ui/data-table";
import RegisterButton from "@/components/register-button";
import { columns } from "./components/columns";
import { Rental } from "@/types/Rental";

async function getData(): Promise<Rental[]> {
	try {
		const response = await axios.get(`${API_BASE_URL}/rentals`);
		return response.data;
	} catch (error) {
		console.error("Erro ao realizar a busca:", error);
		return [];
	}
}

const transformData = (data: Rental[]): Rental[] => {
  return data.map((rental) => ({
    id: rental.id,
		renter: rental.renter,
		books: rental.books,
    rentalDate: rental.rentalDate,
    returnDate: rental.returnDate,
    isReturned: rental.isReturned,
    renterEmail: rental.renter.email,
    renterName: rental.renter.name,
  }));
};

const RentalAdmin = async () => {
	const data = await getData();
	return (
		<div className="mx-20 mt-16">
			<h1 className="text-4xl font-bold">Painel de Administração.</h1>
			<div className="p-4">
				<h3 className="mt-6 text-xl">Lista de aluguéis</h3>
				<h6 className="text-sm text-zinc-700">Gerencie e adicione novos aluguéis</h6>
			</div>
			<RegisterButton
				label="Adicionar Aluguel"
				href="/admin/rentals/register"
			/>
			<DataTable columns={columns}
				data={transformData(data)}
				searchKey="renterEmail"
			/>

		</div>
	);
}

export default RentalAdmin;