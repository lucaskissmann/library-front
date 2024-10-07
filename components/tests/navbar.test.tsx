import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Navbar from "../ui/navbar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it("should render the logo", () => {
    const logo = screen.getByAltText("Imagem do logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the navigation links", () => {
    const bookclubLink = screen.getByText(/O que é Bookclub?/i);
    const contatoLink = screen.getByText(/Contato/i);
    expect(bookclubLink).toBeInTheDocument();
    expect(contatoLink).toBeInTheDocument();
  });

  it("should render the admin button", () => {
    const adminButton = screen.getByRole("button", { name: /Administrador/i });
    expect(adminButton).toBeInTheDocument();
  });
});
