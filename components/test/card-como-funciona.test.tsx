import { render, screen } from "@testing-library/react";
import CardComoFunciona from "../card-como-funciona";

describe("CardComoFunciona Component", () => {
  const cardProps = {
    src: "/sem-limites.png",
    alt: "Imagem de exemplo",
    title: "Título de exemplo",
    description: "Descrição de exemplo",
  };

	beforeEach(() => {
		render(<CardComoFunciona {...cardProps} />);
	})

  it("should render the CardComoFunciona component correctly", () => {
    const image = screen.getByAltText(cardProps.alt);
    expect(image).toBeInTheDocument();;

    const title = screen.getByText(cardProps.title);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(cardProps.description);
    expect(description).toBeInTheDocument();
  });

  it("should render the image with correct width and height", () => {
    const image = screen.getByAltText(cardProps.alt);

    expect(image).toHaveAttribute("width", "100");
    expect(image).toHaveAttribute("height", "106");
  });
});
