import ComoFunciona from "@/components/home/como-funciona";
import DownloadApp from "@/components/home/download-app";
import FAQ from "@/components/home/faq";
import PrincipaisAvaliacoes from "@/components/home/principais-avaliacoes";
import SearchBook from "@/components/home/search-book";
import categories from "@/public/categories";
import Image from "next/image";

const HomePage = () => {

	return(
		<div className="bg-[#F7F7F7] pb-40">
			<div className="flex justify-evenly bg-[#1A237E] w-100% h-[600px]">
				<section className="flex flex-col items-center justify-center gap-20 pt-32">
					<h2 className="text-white text-4xl font-light">
						Encontre os <span className="text-[#FFD166] font-bold">melhores títulos</span>
						<br /> em um só lugar.
					</h2>
					<SearchBook />
				</section>
				<section className="flex gap-9">
					<Image src={"/male-avatar-home.svg"} width={239} height={433} alt="Imagem de um avatar homem"/>
					<Image src={"/female-avatar-home.svg"} width={200} height={200} alt="Imagem de um avatar mulher"/>
				</section>
			</div>
			<div className="flex bg-[#FFD166] gap-8 w-100% h-[94px] items-center pl-48">
				<h3 className="text-[#1A237E] font-bold">Categoria de livros:</h3>
				<ul className="flex gap-6 text-[#0B78D0]">
					{categories.map((category) => {
						return (
              <li key={category.value}>
                {category.value.charAt(0).toUpperCase() + category.value.slice(1).toLowerCase()}
              </li>
            );
					})}
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
 