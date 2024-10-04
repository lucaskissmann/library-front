import { render, screen, fireEvent } from "@testing-library/react";
import AlertModal from "../modals/alert-modal";

describe("AlertModal", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render the modal if not mounted", () => {
    const { container } = render(<AlertModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} loading={false} description="Test description" />);
    
    container.firstChild?.remove();
    
    expect(container.firstChild).toBeNull();
  });

  it("should render the modal when mounted and open", () => {
    render(<AlertModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} loading={false} description="Test description" />);

    expect(screen.getByText(/você tem certeza\?/i)).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument();
  });

  it("should call onClose when cancel button is clicked", () => {
    render(<AlertModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} loading={false} description="Test description" />);

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onConfirm when confirm button is clicked", () => {
    render(<AlertModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} loading={false} description="Test description" />);

    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("should disable buttons when loading is true", () => {
    render(<AlertModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} loading={true} description="Test description" />);

    expect(screen.getByRole('button', { name: /cancelar/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /confirmar/i })).toBeDisabled();
  });

  it("should enable buttons when loading is false", () => {
    render(<AlertModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} loading={false} description="Test description" />);

    expect(screen.getByRole('button', { name: /cancelar/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /confirmar/i })).not.toBeDisabled();
  });
});
