import { render, screen } from "@testing-library/react";
import RegisterBook from "@/app/(routes)/admin/books/register/page";

jest.mock("@/components/book-ui-form", () => {
  return function MockBookUiForm() {
    return <div data-testid="mock-book-ui-form">Mock Book UI Form</div>;
  };
});

describe("RegisterBook", () => {
  beforeEach(() => {
    render(<RegisterBook />);
  });

  it("should render the main heading", () => {
    const mainHeading = screen.getByText(/Cadastro do livro/i);
    expect(mainHeading).toBeInTheDocument();
  });

  it("should render the 'Criar Perfil' section", () => {
    const profileHeading = screen.getByText(/Criar Perfil/i);
    expect(profileHeading).toBeInTheDocument();
  });

  it("should render the 'Informações pessoais' subtitle", () => {
    const subtitle = screen.getByText(/Informações pessoais/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("should render the BookUiForm component", () => {
    const bookForm = screen.getByTestId("mock-book-ui-form");
    expect(bookForm).toBeInTheDocument();
  });

  it("should render the image with the correct alt text", () => {
    const image = screen.getByAltText(/Imagem de um personagem feminino/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/female-avatar-home.svg");
  });
});
