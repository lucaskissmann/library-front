import CardPrincipaisAvaliacoes from "./card-principais-avaliacoes";


const PrincipaisAvaliacoes = () => {
	return (
		<>
			<h1 className="mb-8 text-3xl font-bold pt-16">Principais avaliações do Brasil</h1>
			<section className="flex gap-4">
				<CardPrincipaisAvaliacoes 
					title="Ótimo livro"
					description="Muito bom, trata do quão importante é ter um branding para uma empresa nos dias atuais, além de trazer informações relativas à marketing digital, como métricas e questões relacionadas à tráfego de dados."
					bookRef="Comentário no livro: XPTO"
					raterImg="/rater.png"
					raterName="Eduardo Melo"
				/>
				<CardPrincipaisAvaliacoes 
					title="Bom"
					description="Bons conceitos e abordagens ampla sobre o Digital Branding. Para quem já é da área e tem forte atuação, muitas passagens do livro se tornam “lugar comum”. Porém, quem está chegando ou busca esse conhecimento a leitura é extremamente didática. Um bom primeiro passo. Reforçando, claro, que na prática a tentativa e erro é rotina..."
					bookRef="Comentário no livro: XPTO"
					raterImg="/rater.png"
					raterName="Eduardo Melo"
				/>
			</section>
		</>
	);
}

export default PrincipaisAvaliacoes;