import Image from "next/image";

interface CardProps {
	title: string;
	description: string;
	bookRef: string;
	raterImg: string;
	raterName: string;
}

const CardPrincipaisAvaliacoes: React.FC<CardProps> = ({
	title,
  description,
  bookRef,
  raterImg,
  raterName,
}) => {
	return (
		<div className="flex-1 bg-white p-4 border border-solid border-black border-opacity-10 rounded-sm shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
			<h3 className="font-bold">{title}</h3>
			<p>{description}</p>
			<span className="font-[400] text-xs py-4 block">{bookRef}</span>
			<div className="flex gap-3 items-center">
				<Image src={raterImg} height={36} width={36} alt="Imagem do avaliador"/>
				<h2 className="font-bold">{raterName}</h2>
			</div>
		</div>
	);
}

export default CardPrincipaisAvaliacoes;