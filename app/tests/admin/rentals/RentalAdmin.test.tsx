import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import RentalAdmin from "@/app/(routes)/admin/rentals/page";
import { useRouter } from "next/navigation";

// Mock do axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockData = [
  {
    id: 1,
    renter: { name: "Lucas", email: "lucas@mail.com" },
    books: [{ title: "Livro A" }],
    rentalDate: "2024-01-01",
    returnDate: "2024-01-03",
    isReturned: true,
  },
  {
    id: 2,
    renter: { name: "Bruna", email: "bruna@mail.com" },
    books: [{ title: "Livro B" }],
    rentalDate: "2024-01-01",
    returnDate: "2024-01-03",
    isReturned: false,
  },
];

describe("RentalAdmin", () => {
	const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(async () => {
		jest.clearAllMocks();
		
		mockUseRouter.mockReturnValue({ push: mockPush });

    mockedAxios.get.mockResolvedValue({ data: mockData });
    render(await RentalAdmin());
  });

  it("should render the main heading", () => {
    const mainHeading = screen.getByText(/Painel de Administração/i);
    expect(mainHeading).toBeInTheDocument();
  });

  it("should render the 'Lista de aluguéis' section", () => {
    const listHeading = screen.getByText(/Lista de aluguéis/i);
    expect(listHeading).toBeInTheDocument();
  });

  it("should render the subtitle for managing rentals", () => {
    const subtitle = screen.getByText(/Gerencie e adicione novos aluguéis/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("should navigate to the 'Adicionar Aluguel' page on button click", () => {
    const addButton = screen.getByText(/Adicionar Aluguel/i);
    expect(addButton).toBeInTheDocument();

		fireEvent.click(addButton);

		expect(mockPush).toHaveBeenCalledWith("/admin/rentals/register");

  });

  it("should render the DataTable with correct rental data", () => {
    const renterEmail1 = screen.getByText(/lucas@mail.com/i);
    expect(renterEmail1).toBeInTheDocument();

    const renterEmail2 = screen.getByText(/bruna@mail.com/i);
    expect(renterEmail2).toBeInTheDocument();
  });
});
