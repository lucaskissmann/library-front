'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdSettings } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

const SideBar = () => {
	const router = useRouter();
	const currentRoute = usePathname();

	const handleNavigation = (path: string) => {
			router.push(path);
	};
	
	return (
		<div className="fixed left-0 w-[256px] h-full border-x border-solid border-zinc-500 p-4">
			<Input className="mb-10"/>
			<section className="flex flex-col gap-2 items-start">
				<Button className="flex justify-start bg-transparent border-none text-black hover:bg-[#0000001F] w-full">
					<IoMdSettings fill="grey" className="w-6 h-6"/>
					<span className="pl-3">Configurações</span>
				</Button>
				<Button 
					onClick={() => handleNavigation("/admin/books")}
					className={`flex justify-start bg-transparent border-none text-black hover:bg-[#0000001F] w-full ${currentRoute === "/admin/books" ? "bg-[#0000001F]" : ""}`}>
					<span>Gerenciar Ebooks</span>
				</Button>
				<Button 
					onClick={() => handleNavigation("/admin/authors")}
					className={`flex justify-start bg-transparent border-none text-black hover:bg-[#0000001F] w-full ${currentRoute === "/admin/authors" ? "bg-[#0000001F]" : ""}`}>
					<span>Gerenciar Autores</span>
				</Button>
				<Button className="flex justify-start bg-transparent border-none text-black hover:bg-[#0000001F] w-full">
					<FaUserAlt fill="grey" className="w-5 h-5"/>					
					<span className="pl-3">Perfil</span>
				</Button>
				<Button className="flex justify-start bg-transparent border-none text-black hover:bg-[#0000001F] w-full">
					<span>Dados pessoais</span>
				</Button>
				<Button className="flex justify-start bg-transparent border-none text-black hover:bg-[#0000001F] w-full">
					<span>Privacidade</span>
				</Button>
			</section>
		</div>
	);
}

export default SideBar;