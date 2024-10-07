import Image from "next/image";
import CardComoFunciona from "./card-como-funciona";

const ComoFunciona = () => {
	return (
		<>
			<h1 className="mb-20 text-4xl font-light">Como funciona?</h1>
			<section className="flex h-[1176] w-full justify-between gap-12 px-48">
				<CardComoFunciona 
					src="/sem-limites.png"
					alt="Imagem de avatar"
					title="Sem limites"
          description="Leve uma biblioteca recheada de conteúdos na palma da sua mão, para acessar a qualquer momento, quantas vezes quiser."
				/>
				<CardComoFunciona 
					src="/modo-offline.png"
					alt="Imagem de avatar"
					title="Modo offline"
          description="Economize seu pacote de dados baixando seus títulos favoritos para acessar em momentos em que não há conexão à internet."
				/>
				<CardComoFunciona 
					src="/multiplataforma.png"
					alt="Imagem de avatar"
					title="Multiplataforma"
          description="Alterne entre diferentes dispositivos sempre que quiser e continue de onde parou. Seu histórico fica gravado na sua conta."
				/>
			</section>
		</>
	);
}

export default ComoFunciona;