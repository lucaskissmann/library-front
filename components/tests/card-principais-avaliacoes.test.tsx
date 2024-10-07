import { render, screen } from "@testing-library/react";
import CardPrincipaisAvaliacoes from "../home/card-principais-avaliacoes";

describe("CardPrincipaisAvaliacoes Component", () => {
  const cardProps = {
    title: "Título do Livro",
    description: "Descrição da avaliação.",
    bookRef: "Referência do Livro",
    raterImg: "/rater.png",
    raterName: "Nome do Avaliador",
  };

	beforeEach(() => {
    render(<CardPrincipaisAvaliacoes {...cardProps} />);
	})

  it("should render the CardPrincipaisAvaliacoes component correctly", () => {
    const title = screen.getByText(cardProps.title);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(cardProps.description);
    expect(description).toBeInTheDocument();

    const bookRef = screen.getByText(cardProps.bookRef);
    expect(bookRef).toBeInTheDocument();

    const raterName = screen.getByText(cardProps.raterName);
    expect(raterName).toBeInTheDocument();
  });

  it("should render the rater's image with the correct src containing the provided image path", () => {
    const raterImage = screen.getByAltText("Imagem do avaliador");

    expect(raterImage).toHaveAttribute("src");
    expect(raterImage.getAttribute("src")).toContain(encodeURIComponent(cardProps.raterImg));
  });
});
