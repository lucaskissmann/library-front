import RegisterRenter from "@/app/(routes)/admin/renters/register/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/renter-form", () => {
  return function MockRenterForm() {
    return <div data-testid="mock-renter-form">Mock Renter Form</div>;
  };
});

describe("RegisterRenter", () => {
  beforeEach(() => {
    render(<RegisterRenter />);
  });

  it("should render the main heading", () => {
    const mainHeading = screen.getByText(/Cadastro do locatário/i);
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

  it("should render the RenterForm component", () => {
    const renterForm = screen.getByTestId("mock-renter-form");
    expect(renterForm).toBeInTheDocument();
  });

  it("should render the image with the correct alt text", () => {
    const image = screen.getByAltText(/Imagem de um personagem feminino/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/female-avatar-home.svg");
  });
});
