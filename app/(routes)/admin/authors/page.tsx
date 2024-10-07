import { Button } from "@/components/ui/button";
import { columns } from "./components/columns";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { DataTable } from "@/components/ui/data-table";
import RegisterButton from "@/components/ui/register-button";
import { Author } from "@/types/Author";

async function getData(): Promise<Author[]> {
	try {
		const response = await axios.get(`${API_BASE_URL}/authors`);
		return response.data;
	} catch (error) {
		console.error("Erro ao realizar a busca:", error);
		return [];
	}
}

const AuthorAdmin = async () => {
	const data = await getData();
	return (
		<div className="mx-20 mt-16">
			<h1 className="text-4xl font-bold">Painel de Administração.</h1>
			<div className="p-4">
				<h3 className="mt-6 text-xl">Lista de pessoas autoras</h3>
				<h6 className="text-sm text-zinc-700">Gerencie e adicione novas pessoas autoras</h6>
			</div>
			<RegisterButton
				label="Adicionar pessoa autora"
				href="/admin/authors/register"
			/>
			<DataTable columns={columns} data={data} searchKey="name"/>
		</div>
	);
}

export default AuthorAdmin;