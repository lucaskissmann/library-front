import { render, screen } from "@testing-library/react";
import categories from "@/public/categories";
import HomePage from "../(routes)/page";

jest.mock("@/components/home/como-funciona", () => () => <div>Como Funciona Component</div>);
jest.mock("@/components/home/download-app", () => () => <div>Download App Component</div>);
jest.mock("@/components/home/faq", () => () => <div>FAQ Component</div>);
jest.mock("@/components/home/principais-avaliacoes", () => () => <div>Principais Avaliacoes Component</div>);
jest.mock("@/components/home/search-book", () => () => <div>Search Book Component</div>);

describe("HomePage", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it("should render the title and subtitle", () => {
    expect(screen.getByText(/encontre os/i)).toBeInTheDocument();
    expect(screen.getByText(/melhores títulos/i)).toBeInTheDocument();
    expect(screen.getByText(/em um só lugar/i)).toBeInTheDocument();
  });

  it("should render the SearchBook component", () => {
    expect(screen.getByText(/search book component/i)).toBeInTheDocument();
  });

  it("should render avatar images", () => {
    const maleAvatar = screen.getByAltText(/imagem de um avatar homem/i);
    const femaleAvatar = screen.getByAltText(/imagem de um avatar mulher/i);
    
    expect(maleAvatar).toBeInTheDocument();
    expect(femaleAvatar).toBeInTheDocument();
  });

  it("should display the categories", () => {
    const categoryList = screen.getByRole("list");
    
    expect(categoryList).toBeInTheDocument();
    categories.forEach((category) => {
      expect(screen.getByText(category.value.charAt(0).toUpperCase() + category.value.slice(1).toLowerCase())).toBeInTheDocument();
    });
  });

  it("should render child components", () => {
    expect(screen.getByText(/como funciona component/i)).toBeInTheDocument();
    expect(screen.getByText(/principais avaliacoes component/i)).toBeInTheDocument();
    expect(screen.getByText(/faq component/i)).toBeInTheDocument();
    expect(screen.getByText(/download app component/i)).toBeInTheDocument();
  });
});
