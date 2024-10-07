import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {act} from 'react';
import AuthorForm from '../authors/author-form';

import '@testing-library/jest-dom'

jest.mock('axios'); 

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AuthorForm', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
      back: jest.fn(),
    }));

    render(<AuthorForm />);
  });

  it('should render component', () => {
    expect(screen.getByText("Nome Completo")).toBeInTheDocument();
  });

  it('renders form fields and submits the form', async () => {
    fireEvent.change(screen.getByLabelText(/nome completo/i), {
      target: { value: 'João Silva' },
    });

    fireEvent.change(screen.getByLabelText(/idade/i), {
      target: { value: 30 },
    });

    fireEvent.change(screen.getByLabelText(/cpf/i), {
      target: { value: '123.456.789-00' },
    });

    fireEvent.click(screen.getByLabelText(/masculino/i));

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/authors'),
      expect.objectContaining({
        name: 'João Silva',
        age: 30,
        cpf: '123.456.789-00',
        gender: 'masculino',
      })
    );

    setTimeout(() => {
      expect(screen.getByText(/autor criado com sucesso/i)).toBeInTheDocument()
    }, 2000);
  });

  it('shows validation errors when submitting invalid data', async () => {
    const submitButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/o nome deve conter no mínimo 2 caracteres/i)).toBeInTheDocument();
    expect(await screen.findByText(/A idade é obrigatória/i)).toBeInTheDocument();
    expect(await screen.findByText(/o cpf deve ser inserido/i)).toBeInTheDocument();
  });
});
