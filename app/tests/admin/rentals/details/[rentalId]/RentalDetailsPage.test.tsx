import RentalDetailsPage from "@/app/(routes)/admin/rentals/details/[rentalId]/page";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Mock da biblioteca axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("RentalDetailsPage", () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;

  const rentalData = {
    id: "1",
    rentalDate: "2024-10-01",
    returnDate: "2024-10-10",
    isReturned: false,
    books: [
      { id: "book1", title: "Book 1" },
      { id: "book2", title: "Book 2" },
    ],
  };

  beforeEach( async () => {
    jest.clearAllMocks();

		mockUseRouter.mockReturnValue({ push: mockPush });

    mockedAxios.get.mockResolvedValueOnce({ data: rentalData });
    render(await RentalDetailsPage({params: { rentalId: "1" }}));
  })

  it("should render rental details when data is fetched successfully", async () => {
    expect(await screen.findByText(/Detalhes ID: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Book 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Book 2/i)).toBeInTheDocument();
  });
});
