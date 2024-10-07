import RentalForm from "@/components/rentals/rental-form";
import Image from "next/image";

const RegisterRental = () => {
	return (
		<div className="pl-11 py-16">
			<h1 className="text-4xl font-light">Cadastro do aluguel</h1>
			<div className="flex mt-11 w-full">
				<section className="w-1/3 pr-8">
					<h2 className="text-2xl ">Criar Perfil</h2>
					<h3 className="text-xl text-muted-foreground">Informações do aluguel</h3>
					<RentalForm isEdit={false} />
				</section>
				<section className="w-1/2 flex justify-center items-center">
					<Image src={"/female-avatar-home.svg"} height={200} width={200} alt="Imagem de um personagem feminino"/>
				</section>
			</div>
		</div>
	);
}

export default RegisterRental;