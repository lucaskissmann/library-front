import AdminPage from "@/app/(routes)/admin/page";
import { render, screen } from "@testing-library/react";

describe("AdminPage", () => {
  beforeEach(() => {
    render(<AdminPage />);
  });

  it("should render the main headings", () => {
    expect(screen.getByRole("heading", { name: /serviços/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /administrador/i })).toBeInTheDocument();
  });

  it("should render the CardAdmin components with correct labels", () => {
    const labels = [
      "Novo Aluguel",
      "Gerenciar Pessoas Autoras",
      "Gerenciar Locatários",
      "Gerenciar Livros",
    ];

    labels.forEach((label) => {
      expect(screen.getByText(new RegExp(label, "i"))).toBeInTheDocument();
    });
  });

  it("should render the CardAdmin component for 'Novo Aluguel' with correct href", () => {
    const newRentalCard = screen.getByText(/novo aluguel/i).closest("a");
    expect(newRentalCard).toHaveAttribute("href", "/admin/rentals");
  });

  it("should render the correct hrefs for other CardAdmin components", () => {
    const adminCards = [
      { label: "Gerenciar Pessoas Autoras", href: "/admin/authors" },
      { label: "Gerenciar Locatários", href: "/admin" },
      { label: "Gerenciar Livros", href: "/admin/books" },
    ];

    adminCards.forEach(({ label, href }) => {
      const card = screen.getByText(new RegExp(label, "i")).closest("a");
      expect(card).toHaveAttribute("href", href);
    });
  });
});
