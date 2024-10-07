import { render, screen } from "@testing-library/react";
import RegisterAuthor from "@/app/(routes)/admin/authors/register/page";

jest.mock("@/components/authors/author-form", () => {
  return jest.fn(() => <div data-testid="author-form" />);
});

describe("RegisterAuthor", () => {
  it("should render the main heading", () => {
    render(<RegisterAuthor />);

    const mainHeading = screen.getByText(/Cadastro da pessoa autora/i);
    expect(mainHeading).toBeInTheDocument();
  });

  it("should render the 'Criar Perfil' section", () => {
    render(<RegisterAuthor />);

    const createProfileHeading = screen.getByText(/Criar Perfil/i);
    expect(createProfileHeading).toBeInTheDocument();
  });

  it("should render the 'Informações pessoais' subtitle", () => {
    render(<RegisterAuthor />);

    const personalInfoHeading = screen.getByText(/Informações pessoais/i);
    expect(personalInfoHeading).toBeInTheDocument();
  });

  it("should render the AuthorForm component", () => {
    render(<RegisterAuthor />);

    const authorForm = screen.getByTestId("author-form");
    expect(authorForm).toBeInTheDocument();
  });

  it("should render the avatar image", () => {
    render(<RegisterAuthor />);

    const avatarImage = screen.getByAltText(/Imagem de um personagem feminino/i);
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute("src", "/female-avatar-home.svg");
  });
});
