import RegisterRental from "@/app/(routes)/admin/rentals/register/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/rental-form", () => {
  return function MockRentalForm() {
    return <div data-testid="mock-rental-form">Mock Rental Form</div>;
  };
});

describe("RegisterRental", () => {
  beforeEach(() => {
    render(<RegisterRental />);
  });

  it("should render the main heading", () => {
    const mainHeading = screen.getByText(/Cadastro do aluguel/i);
    expect(mainHeading).toBeInTheDocument();
  });

  it("should render the 'Criar Perfil' section", () => {
    const profileHeading = screen.getByText(/Criar Perfil/i);
    expect(profileHeading).toBeInTheDocument();
  });

  it("should render the 'Informações do aluguel' subtitle", () => {
    const subtitle = screen.getByText(/Informações do aluguel/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("should render the RentalForm component", () => {
    const rentalForm = screen.getByTestId("mock-rental-form");
    expect(rentalForm).toBeInTheDocument();
  });

  it("should render the image with the correct alt text", () => {
    const image = screen.getByAltText(/Imagem de um personagem feminino/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/female-avatar-home.svg");
  });
});
