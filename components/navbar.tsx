import Image from "next/image";
import Link from "next/link";
import { Select } from "antd";
import categories from "@/public/categories";
import Combobox from "./combobox";
import { Button } from "./ui/button";

const Navbar = () => {
	return (
		<div className="bg-[#0B78D0] flex justify-between">
			<section className="pl-16 pt-3 pb-5 flex items-center">
				<Link className="pr-7" key={"home"} href={"/"}>
					<Image src={"/logo.svg"} width={85} height={45} alt="Imagem do logo"/>
				</Link>
				<nav className="flex gap-7 text-white font-semibold">
					<Link key={"bookclub"} href={"/"} className="pt-2">
						O que é Bookclub?
					</Link>
					<Link key={"bookclub"} href={"/"} className="pt-2">
						Contato
					</Link>
				</nav>
			</section>
			<section className="flex items-center gap-4 pr-[184px]">
				<Link key={"admin"} href={"/admin"}>
					<Button className="bg-[#FFD166] text-black font-bold hover:bg-[#ebbb4c]">
						Administrador
					</Button>
				</Link>
			</section>
		</div>
	)
}

export default Navbar;