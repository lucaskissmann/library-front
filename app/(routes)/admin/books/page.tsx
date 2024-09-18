import axios from "axios";
import { API_BASE_URL } from "@/config";
import { DataTable } from "@/components/ui/data-table";
import RegisterButton from "@/components/register-button";
import { columns } from "./components/columns";
import { Book } from "@/types/Book";

async function getData(): Promise<Book[]> {
	try {
		const response = await axios.get(`${API_BASE_URL}/books`);
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
				<h3 className="mt-6 text-xl">Lista de livros</h3>
				<h6 className="text-sm text-zinc-700">Gerencie e adicione novos livros</h6>
			</div>
			<RegisterButton
				label="Adicionar Livro"
				href="/admin/books/register"
			/>
			<DataTable columns={columns} data={data} searchKey="title"/>
		</div>
	);
}

export default BookAdmin;