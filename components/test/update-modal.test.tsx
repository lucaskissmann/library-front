import { fireEvent, render, screen } from "@testing-library/react";
import UpdateModal from "../modals/update-modal";

describe("UpdateModal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render the modal if not mounted", () => {
    const { container } = render(
      <UpdateModal isOpen={true} onClose={mockOnClose} title="titulo" description="descrição">
        <div>Conteúdo</div>
      </UpdateModal>
    );
    
    container.firstChild?.remove();
    
    expect(container.firstChild).toBeNull();
  });

  it("should render the modal when mounted and open", () => {
    render(
      <UpdateModal isOpen={true} onClose={mockOnClose} title="titulo" description="descrição">
        <div>Conteúdo</div>
      </UpdateModal>
    );

    expect(screen.getByText(/titulo/i)).toBeInTheDocument();
    expect(screen.getByText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByText(/conteúdo/i)).toBeInTheDocument();
  });

  it("should not render the modal when isOpen is false", () => {
    const { container } = render(
      <UpdateModal isOpen={false} onClose={mockOnClose} title="titulo" description="descrição">
        <div>Conteúdo</div>
      </UpdateModal>
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render the children inside the modal", () => {
    render(
      <UpdateModal isOpen={true} onClose={mockOnClose} title="titulo" description="descrição">
        <div>Conteúdo</div>
      </UpdateModal>
    );

    expect(screen.getByText(/conteúdo/i)).toBeInTheDocument();
  });

  it("should call onClose when the modal close button is clicked", () => {
     render(
      <UpdateModal isOpen={true} onClose={mockOnClose} title="titulo" description="descrição">
        <div>Conteúdo</div>
      </UpdateModal>
    );

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
