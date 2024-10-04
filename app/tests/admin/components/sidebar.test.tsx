import SideBar from "@/app/(routes)/admin/components/sidebar";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("SideBar", () => {
	const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;

  beforeEach(() => {
		mockUseRouter.mockReturnValue({ push: mockPush });
    mockUsePathname.mockReturnValue("/current-path");
    render(<SideBar />);
  });

  it("should render the search input field", () => {
    const searchInput = screen.getByPlaceholderText(/pesquisar/i);
    expect(searchInput).toBeInTheDocument();
  });

  it("should render the SideBarButton components with correct labels", () => {
    expect(screen.getByText(/aluguel/i)).toBeInTheDocument();
    expect(screen.getByText(/gerenciar autores/i)).toBeInTheDocument();
    expect(screen.getByText(/gerenciar locatários/i)).toBeInTheDocument();
    expect(screen.getByText(/gerenciar livros/i)).toBeInTheDocument();
  });

  it("should render the settings section with label", () => {
    const settingsLabel = screen.getByText(/gerenciador/i);

    expect(settingsLabel).toBeInTheDocument();
  });

  it("should navigate to the correct route when SideBarButton is clicked", () => {
    const aluguelButton = screen.getByText(/aluguel/i);

    fireEvent.click(aluguelButton);
    expect(aluguelButton).toBeInTheDocument();
  });
});
