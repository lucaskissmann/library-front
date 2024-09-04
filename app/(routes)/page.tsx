'use client'

import ComoFunciona from "@/components/como-funciona";
import DownloadApp from "@/components/download-app";
import FAQ from "@/components/faq";
import PrincipaisAvaliacoes from "@/components/principais-avaliacoes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/config";
import axios from "axios";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const HomePage = () => {

	const [searchBook, setSearchBook] = useState('');

	const handleSearchBook = (event: any) => {
    setSearchBook(event.target.value);
  }

	const handleSearch = () => {
    if (searchBook) {
      axios.get(`${API_BASE_URL}/books?title=${searchBook}`)
			.then((data) => {
				console.log("Dados retornados:", data.data);
			})
			.catch((error) => {
				console.error("Erro ao realizar a busca:", error);
			});
    }
  };

	return(
		<div className="bg-[#F7F7F7] pb-40">
			<div className="flex justify-evenly bg-[#1A237E] w-100% h-[600px]">
				<section className="flex flex-col items-center justify-center gap-20 pt-32">
					<h2 className="text-white text-4xl font-light">
						Encontre os <span className="text-[#FFD166] font-bold">melhores títulos</span>
						<br /> em um só lugar.
					</h2>
					<div className="flex items-center border border-white rounded-md w-full">
						<Input 
							type="search"
							placeholder="Pesquisar livros..."
							className="bg-transparent border-none text-zinc-400"
							value={searchBook}
							onChange={handleSearchBook}
						/>
						<Button 
							className="border-none bg-transparent hover:bg-[#31388a]" 
							variant={"outline"}
							onClick={handleSearch}
						>
							<Search className="bg-transparent" color="white" width={15} height={15}/>
						</Button>
					</div>
				</section>
				<section className="flex gap-9">
					<Image src={"/male-avatar-home.svg"} width={239} height={433} alt="Imagem de um avatar homem"/>
					<Image src={"/female-avatar-home.svg"} width={200} height={200} alt="Imagem de um avatar mulher"/>
				</section>
			</div>
			<div className="flex bg-[#FFD166] gap-8 w-100% h-[94px] items-center pl-48">
				<h3 className="text-[#1A237E] font-bold">Categoria de livros:</h3>
				<ul className="flex gap-6 text-[#0B78D0]">
					<li>Ficção</li>
					<li>Romance</li>
					<li>Terror</li>
					<li>Ciência</li>
					<li>Infantil</li>
				</ul>
			</div>
			<div className="px-36 pt-16">
				<ComoFunciona />
				<PrincipaisAvaliacoes />
				<FAQ />
				<DownloadApp />
			</div>
		</div>
	)
}

export default HomePage;
 