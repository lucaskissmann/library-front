import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RentalForm from '../rentals/rental-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { act } from 'react';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('RentalForm Component', () => {
  const mockBooks = [
    { id: 1, title: 'Livro A' },
    { id: 2, title: 'Livro B' },
  ];

  const mockRenters = [
    { id: 1, name: 'Lucas' },
    { id: 2, name: 'Bruna' },
  ];

  const mockPush = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
      back: mockBack,
    }));

    jest.clearAllMocks();

  });

  it('should render RentalForm correctly', () => {
    render(<RentalForm />);
    
    expect(screen.getByLabelText(/locatário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/livros/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de retirada/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de devolução/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument();
  });

  it('should submit the form with valid data', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockBooks });
		mockAxios.get.mockResolvedValueOnce({ data: mockRenters });
    
    render(<RentalForm isEdit={false}/>);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(2)); 

    fireEvent.mouseDown(screen.getByRole('combobox', { name: /livros/i }));
    fireEvent.click(screen.getByText(/livro a/i));
    
    fireEvent.mouseDown(screen.getByLabelText('Locatário'));
    fireEvent.click(screen.getByText(/lucas/i));

    fireEvent.change(screen.getByLabelText(/data de retirada/i), { target: { value: dayjs('01-01-2024').format('DD-MM-YYYY') } });
    fireEvent.change(screen.getByLabelText(/data de devolução/i), { target: { value: dayjs('01-01-2024').format('DD-MM-YYYY') } });

    const submitButton = screen.getByText(/salvar/i);

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/rentals'),
      expect.objectContaining({
      bookIds: [1],
      renterId: 1,
      rentalDate: '2024-01-01',
      returnDate: '2024-01-01',
    }));
  });

  it('should show error messages when required fields are missing', async () => {
    render(<RentalForm />);

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    expect(await screen.findByText(/Selecione um locatário./i)).toBeInTheDocument();
    expect(await screen.findByText(/Selecione pelo menos um livro./i)).toBeInTheDocument();
  });
});
