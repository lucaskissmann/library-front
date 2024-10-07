import { render, screen } from '@testing-library/react';
import PrincipaisAvaliacoes from '../home/principais-avaliacoes';

describe('PrincipaisAvaliacoes', () => {
	beforeEach(() => {
		render(<PrincipaisAvaliacoes />);
	});

	it('should render the correct title', () => {
		const title = screen.getByText(/Principais avaliações do Brasil/i);
		expect(title).toBeInTheDocument();
	});

	it('should render two cards with correct titles and descriptions', () => {
		const firstCardTitle = screen.getByText(/Ótimo livro/i);
		const firstCardDescription = screen.getByText(/Muito bom, trata do quão importante/i);
		const secondCardTitle = screen.getByText('Bom');
		const secondCardDescription = screen.getByText(/Bons conceitos e abordagens/i);

		expect(firstCardTitle).toBeInTheDocument();
		expect(firstCardDescription).toBeInTheDocument();
		expect(secondCardTitle).toBeInTheDocument();
		expect(secondCardDescription).toBeInTheDocument();
	});

	it('should render rater images', () => {
		const raterImages = screen.getAllByRole('img');
		expect(raterImages).toHaveLength(2);
		expect(raterImages[0]).toBeInTheDocument();
		expect(raterImages[1]).toBeInTheDocument();
	});
});
