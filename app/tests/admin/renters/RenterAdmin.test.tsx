import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import RenterAdmin from "@/app/(routes)/admin/renters/page";
import { useRouter } from "next/navigation";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockData = [
  { id: 1, name: "Lucas", email: "lucas@mail.com" },
  { id: 2, name: "Bruna", email: "bruna@mail.com" },
];

describe("RenterAdmin", () => {
	const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(async () => {
		jest.clearAllMocks();

		mockUseRouter.mockReturnValue({ push: mockPush });

    mockedAxios.get.mockResolvedValue({ data: mockData });
    render(await RenterAdmin());
  });

  it("should render the main heading", () => {
    const mainHeading = screen.getByText(/Painel de Administração/i);
    expect(mainHeading).toBeInTheDocument();
  });

  it("should render the 'Lista de locatários' section", () => {
    const listHeading = screen.getByText(/Lista de locatários/i);
    expect(listHeading).toBeInTheDocument();
  });

  it("should render the subtitle for managing renters", () => {
    const subtitle = screen.getByText(/Gerencie e adicione novos locatários/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("should navigate to the 'Adicionar Locatário' on button click", () => {
    const addButton = screen.getByText(/Adicionar Locatário/i);
    expect(addButton).toBeInTheDocument();

		fireEvent.click(addButton);

		expect(mockPush).toHaveBeenCalledWith("/admin/renters/register");
  });

  it("should render renter emails in the DataTable", () => {
    const renterEmail1 = screen.getByText(/lucas@mail.com/i);
    expect(renterEmail1).toBeInTheDocument();

    const renterEmail2 = screen.getByText(/bruna@mail.com/i);
    expect(renterEmail2).toBeInTheDocument();
  });
});
