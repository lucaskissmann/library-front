import Image from "next/image";

const DownloadApp = () => {
	return (
		<div className="flex items-center px-40 mt-44 justify-evenly">
			<p className="font-bold text-xl">Faça o download gratuito de nossos aplicativos</p>
			<div className="flex gap-4">
				<Image src={"/app-store.svg"} width={144} height={44} alt="Imagem do download na AppStore"/>
				<Image src={"/google-play.svg"} width={144} height={44} alt="Imagem do download na AppStore"/>
			</div>
		</div>
	);
}

export default DownloadApp;