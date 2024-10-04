import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { act } from 'react';
import BookUiForm from '../book-ui-form';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';

// Mock axios and next/router
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('BookUiForm', () => {
	const mockAuthors = [
    { id: 1, name: 'Autor 1' },
    { id: 2, name: 'Autor 2' },
  ];
	
  const mockPush = jest.fn();
  const mockBack = jest.fn();
	const onClose = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
      back: mockBack,
    }));

    jest.clearAllMocks();

		mockAxios.get.mockResolvedValueOnce({ data: mockAuthors });

		render(<BookUiForm isEdit={false} onClose={onClose}/>);
  });

  it('should render component', () => {
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/isbn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de publicação/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', {name:/categoria/i})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: 'Livro Teste' },
    });

    fireEvent.change(screen.getByLabelText(/isbn/i), {
      target: { value: '9783161484100' },
    });

    fireEvent.change(screen.getByLabelText(/data de publicação/i), {
      target: { value: dayjs('01-01-2024').format('DD-MM-YYYY') },
    });

		fireEvent.mouseDown(screen.getByRole('combobox', {name:/categoria/i}));
		fireEvent.click(screen.getByText(/terror/i));
		
		fireEvent.mouseDown(screen.getByRole('combobox', {name:/autores/i}));
		fireEvent.click(screen.getByText(/Autor 1/i));
		fireEvent.click(screen.getByText(/Autor 2/i));

    const submitButton = screen.getByText(/salvar/i);

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/books'),
      expect.objectContaining({
        title: 'Livro Teste',
        isbn: '9783161484100',
        publicationDate: '2024-01-01',
        category: 'TERROR',
        authorIds: [1, 2],
      })
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/books');
    });

		setTimeout(() => {
			expect(screen.getByText(/livro criado com sucesso/i)).toBeInTheDocument()
    }, 2000);
   
  });

  it('shows validation errors when submitting invalid data', async () => {
    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    expect(await screen.findByText(/o título deve conter no mínimo 2 caracteres/i)).toBeInTheDocument();
    expect(await screen.findByText(/o isbn é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/selecione uma categoria/i)).toBeInTheDocument();
    expect(await screen.findByText(/selecione pelo menos um autor/i)).toBeInTheDocument();
  });

  it('calls onClose when cancel is clicked', () => {
    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/admin/books');
  });
});
