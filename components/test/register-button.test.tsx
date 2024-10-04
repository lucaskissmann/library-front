import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import RegisterButton from '../register-button';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

describe('RegisterButton', () => {
	const mockPush = jest.fn();
	const mockUseRouter = useRouter as jest.Mock;

	beforeEach(() => {
		mockUseRouter.mockReturnValue({ push: mockPush });
		render(<RegisterButton label="Register" href="/register" />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render the button with the correct label', () => {
		const button = screen.getByRole('button', { name: /register/i });
		expect(button).toBeInTheDocument();
	});

	it('should navigate to the correct href when clicked', () => {
		const button = screen.getByRole('button', { name: /register/i });
		fireEvent.click(button);
		expect(mockPush).toHaveBeenCalledWith('/register');
	});
});
