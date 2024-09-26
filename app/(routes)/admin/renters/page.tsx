import axios from "axios";
import { API_BASE_URL } from "@/config";
import { DataTable } from "@/components/ui/data-table";
import RegisterButton from "@/components/register-button";
import { Renter } from "@/types/Renter";
import { columns } from "./components/columns";

async function getData(): Promise<Renter[]> {
	try {
		const response = await axios.get(`${API_BASE_URL}/renters`);
		return response.data;
	} catch (error) {
		console.error("Erro ao realizar a busca:", error);
		return [];
	}
}

const BookAdmin = async () => {
	const data = await getData();
	return (
		<div className="mx-20 mt-16">
			<h1 className="text-4xl font-bold">Painel de Administração.</h1>
			<div className="p-4">
				<h3 className="mt-6 text-xl">Lista de locatários</h3>
				<h6 className="text-sm text-zinc-700">Gerencie e adicione novos locatários</h6>
			</div>
			<RegisterButton
				label="Adicionar Locatário"
				href="/admin/renters/register"
			/>
			<DataTable columns={columns} data={data} searchKey="name"/>
		</div>
	);
}

export default BookAdmin;