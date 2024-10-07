import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import SearchBook from "../home/search-book";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SearchBook Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the search input and button", async () => {
    render(<SearchBook />);
		
		const searchInput = await screen.findByPlaceholderText(/Pesquisar livros.../i);
		expect(searchInput).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should update the searchBook state on input change", async () => {
    render(<SearchBook />);

    const searchInput = await screen.findByPlaceholderText(/Pesquisar livros.../i);
    
    fireEvent.change(searchInput, { target: { value: "Harry Potter" } });
    
    expect(searchInput).toHaveValue("Harry Potter");
  });

  it("should call API when the search button is clicked", async () => {
		mockedAxios.get.mockResolvedValue({ data: [{ id: 1, title: "Harry Potter" }] });
		
		render(<SearchBook />);

    const searchInput = await screen.findByPlaceholderText(/Pesquisar livros.../i);
    const searchButton = screen.getByRole("button");

    fireEvent.change(searchInput, { target: { value: "Harry Potter" } });

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE_URL}/books?title=Harry Potter`);
    });
  });

  it("should not call API if input is empty", async () => {
		render(<SearchBook />);

    const searchButton = screen.getByRole("button");

    fireEvent.click(searchButton);

    expect(mockedAxios.get).not.toHaveBeenCalled();
  });
});
