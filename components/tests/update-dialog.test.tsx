import { render, screen, fireEvent } from "@testing-library/react";
import { Author, Gender } from "@/types/Author";
import UpdateDialog from "../ui/update-dialog";
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe("UpdateDialog Component", () => {
	const mockAuthor: Author = {
		id: 1,
		name: "Lucas",
		age: 23,
		cpf: "12345678900",
		gender: Gender.Masculino
	};

  const onCloseMock = jest.fn();

	const mockPush = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
		(useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
      back: mockBack,
    }));

		jest.clearAllMocks();

    render(<UpdateDialog data={mockAuthor} onClose={onCloseMock} />);
  });

  it("should render the dialog with the correct title and description", async () => {
    expect(screen.getByText("Editar Autor")).toBeInTheDocument();
    
    expect(screen.getByText(/Você está editando o autor:/i)).toBeInTheDocument();
		expect(await screen.findByText((content, element) => content.includes(mockAuthor.name))).toBeInTheDocument();
  });
});
