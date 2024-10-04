import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import BookAdmin from "@/app/(routes)/admin/books/page";
import { useRouter } from "next/navigation";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockData = [
  { id: 1, title: "Livro 1" },
  { id: 2, title: "Livro 2" },
];

describe("BookAdmin", () => {
	const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(async () => {
		jest.clearAllMocks();

		mockUseRouter.mockReturnValue({ push: mockPush });
    mockedAxios.get.mockResolvedValue({ data: mockData });

    render(await BookAdmin());
  });

  it("should render the main heading", () => {
    const mainHeading = screen.getByText(/Painel de Administração/i);
    expect(mainHeading).toBeInTheDocument();
  });

  it("should render the 'Lista de livros' section", () => {
    const listHeading = screen.getByText(/Lista de livros/i);
    expect(listHeading).toBeInTheDocument();
  });

  it("should render the 'Gerencie e adicione novos livros' subtitle", () => {
    const subtitle = screen.getByText(/Gerencie e adicione novos livros/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("should navigate to the 'Adicionar Livro' page on button click", () => {
    const addButton = screen.getByText(/Adicionar Livro/i);
    expect(addButton).toBeInTheDocument();

		fireEvent.click(addButton);

		expect(mockPush).toHaveBeenCalledWith("/admin/books/register");
  });

  it("should render the DataTable with correct data", () => {
    const dataTable = screen.getByText(/Livro 1/i);
    expect(dataTable).toBeInTheDocument();

    const secondBook = screen.getByText(/Livro 2/i);
    expect(secondBook).toBeInTheDocument();
  });
});
