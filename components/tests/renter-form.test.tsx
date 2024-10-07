import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import toast from "react-hot-toast";
import RenterForm from "../renters/renter-form";
import { useRouter } from "next/navigation";
import dayjs from 'dayjs';
import { act } from "react";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock("react-hot-toast");

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe("RenterForm", () => {

	const mockPush = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
      back: mockBack,
    }));

    jest.clearAllMocks();

  });

  it("should render all form fields", () => {
    render(<RenterForm />);

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gênero/i)).toBeInTheDocument();
  });

  it("should display error when submitting the form without required fields", async () => {
    render(<RenterForm />);

    const submitButton = screen.getByText(/Salvar/i);
    fireEvent.click(submitButton);

    expect(await screen.findByText(/O nome deve conter no mínimo 2 caracteres/i)).toBeInTheDocument();
    expect(await screen.findByText(/Insira um email válido/i)).toBeInTheDocument();
    expect(await screen.findByText(/O CPF deve ser inserido/i)).toBeInTheDocument();
    expect(await screen.findByText(/O telefone deve ser inserido/i)).toBeInTheDocument();
  });

  it("should submit form data correctly", async () => {
    render(<RenterForm />);

    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: "Lucas" } });
    fireEvent.change(screen.getByLabelText(/data de nascimento/i), { target: { value: dayjs('01-01-2001').format('DD-MM-YYYY') } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "lucas@test.com" } });
    fireEvent.change(screen.getByLabelText(/cpf/i), { target: { value: "123.456.789-00" } });
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: "(11) 99999-9999" } });
		fireEvent.click(screen.getByLabelText(/masculino/i));

		await act(async () => {
      fireEvent.click(screen.getByText(/Salvar/i));
    });

		expect(mockAxios.post).toHaveBeenCalledWith(
			expect.stringContaining('/renters'),
			expect.objectContaining({
				name: "Lucas",
				birthDate: "2001-01-01",
				cpf: "123.456.789-00",
				gender: "masculino",
				phone: "(11) 99999-9999",
				email: "lucas@test.com"
			})
    );

		setTimeout(() => {
      expect(screen.getByText(/locatário criado com sucesso/i)).toBeInTheDocument()
    }, 2000);
  });
});
