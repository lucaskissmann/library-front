import Image from "next/image";
import React from "react";

interface CardProps {
	src: string;
	alt: string;
	title: string;
	description: string;
}

const CardComoFunciona: React.FC<CardProps> = ({
	src,
	alt,
	title,
	description
}) => {
	return (
		<div className="w-[231px]">
			<Image src={src} width={100} height={106} alt={alt}/>
			<h3 className="font-bold py-2">{title}</h3>
			<p>{description}</p>
		</div>
	);
}

export default CardComoFunciona;