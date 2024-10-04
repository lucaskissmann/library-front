import { render, screen } from "@testing-library/react";
import ComoFunciona from "../como-funciona";

describe("ComoFunciona Component", () => {
  beforeEach(() => {
    render(<ComoFunciona />);
  });

  it("should render the title", () => {
    const title = screen.getByRole("heading", { name: /como funciona/i });
    expect(title).toBeInTheDocument();
  });

  it("should render three CardComoFunciona components", () => {
    const cards = screen.getAllByText(/sem limites|modo offline|multiplataforma/i);
    expect(cards).toHaveLength(3); 
  });

  it("should render correct descriptions for each CardComoFunciona", () => {
    expect(screen.getByText(/Leve uma biblioteca recheada de conteúdos na palma da sua mão, para acessar a qualquer momento, quantas vezes quiser./i)).toBeInTheDocument();
    expect(screen.getByText(/Economize seu pacote de dados baixando seus títulos favoritos para acessar em momentos em que não há conexão à internet./i)).toBeInTheDocument();
    expect(screen.getByText(/Alterne entre diferentes dispositivos sempre que quiser e continue de onde parou. Seu histórico fica gravado na sua conta./i)).toBeInTheDocument();
  });

  it("should render images with correct src and alt attributes", () => {
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3); 

    expect(images[0]).toBeInTheDocument();
    expect(images[0]).toHaveAttribute("alt", "Imagem de avatar");

    expect(images[1]).toBeInTheDocument();
    expect(images[1]).toHaveAttribute("alt", "Imagem de avatar");

    expect(images[2]).toBeInTheDocument();
    expect(images[2]).toHaveAttribute("alt", "Imagem de avatar");
  });
});
