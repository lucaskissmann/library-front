import AuthorAdmin from "@/app/(routes)/admin/authors/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/navigation";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AuthorAdmin", () => {
	const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;

  const mockData = [
    { id: 1, name: "Autor Teste 1" },
    { id: 2, name: "Autor Teste 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

		mockUseRouter.mockReturnValue({ push: mockPush });

    mockedAxios.get.mockResolvedValue({ data: mockData });
  });

  it("should render the main heading", async () => {
    render(await AuthorAdmin());
    
		expect(screen.getByText(/Painel de Administração/i)).toBeInTheDocument();
  });

  it("should render the list of authors", async () => {
    render(await AuthorAdmin());
    
		expect(screen.getByText(/Lista de pessoas autoras/i)).toBeInTheDocument();
		expect(screen.getByText(/Gerencie e adicione novas pessoas autoras/i)).toBeInTheDocument();
  });

  it("should navigate to the 'Adicionar pessoa autora' page on button click", async () => {
    render(await AuthorAdmin());
    
		const addButton = screen.getByText(/Adicionar pessoa autora/i);
		expect(addButton).toBeInTheDocument();

		fireEvent.click(addButton);

		expect(mockPush).toHaveBeenCalledWith("/admin/authors/register");
  });

  it("should render the authors' data", async () => {
    render(await AuthorAdmin());

		mockData.forEach((author) => {
			expect(screen.getByText(author.name)).toBeInTheDocument();
		});
  });
});
