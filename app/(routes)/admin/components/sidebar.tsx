import { Input } from "@/components/ui/input";
import { IoMdSettings } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { LogInIcon } from "lucide-react";
import SideBarButton from "./sidebar-button";

const SideBar = () => {
	return (
		<div className="fixed left-0 w-[256px] h-full border-x border-solid border-zinc-500 p-4">
			<Input className="mb-4" placeholder="Pesquisar"/>
			<section className="flex flex-col gap-2 items-start">
				<SideBarButton label="Aluguel" href="/admin/rentals" icon={<LogInIcon />} />
				<Separator />
				<div className="inline-flex items-center justify-start bg-transparent border-none text-black w-full whitespace-nowrap rounded-md text-sm font-medium px-4">
					<IoMdSettings fill="grey" className="w-6 h-6" name="settings"/>
					<span className="pl-3">Gerenciador</span>
				</div>
				<Separator />
				<SideBarButton label="Gerenciar Autores" href="/admin/authors" />
				<SideBarButton label="Gerenciar Locatários" href="/admin/renters" />
				<SideBarButton label="Gerenciar Livros" href="/admin/books" />
			</section>
		</div>
	);
}

export default SideBar;