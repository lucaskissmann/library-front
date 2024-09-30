import { LogInIcon } from "lucide-react";
import CardAdmin from "./components/card-admin";

const AdminPage = () => {
	return (
		<div className="pl-11 pt-16">
			<section>
				<h1 className="text-4xl font-light">Serviços</h1>
				<div className="flex">
					<CardAdmin label="Novo Aluguel" href="/admin/rentals" icon={<LogInIcon/>} />
				</div>
				<h1 className="text-4xl font-light mt-10">Administrador</h1>
				<div className="flex gap-9">
					<CardAdmin label="Gerenciar Pessoas Autoras" href="/admin/authors"/>
					<CardAdmin label="Gerenciar Locatários" href="/admin"/>
					<CardAdmin label="Gerenciar Livros" href="/admin/books"/>
				</div>
			</section>
		</div>
	);
}

export default AdminPage;