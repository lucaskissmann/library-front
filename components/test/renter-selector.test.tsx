import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import RenterSelector from '../renter-selector';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RenterSelector Component', () => {
  const rentersMock = [
    { id: 1, name: 'Lucas' },
    { id: 2, name: 'Bruna' },
  ];

  const onChangeMock = jest.fn();

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: rentersMock });
    render(<RenterSelector defaultValue={1} onChange={onChangeMock} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with the default value', async () => {
    expect(screen.getByLabelText('Locatário')).toBeInTheDocument();
		expect(await screen.findByText('Lucas')).toBeInTheDocument();
  });

  it('should update the selected renter when changed', async () => {
		expect(await screen.findByText('Lucas')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByLabelText('Locatário'));

    fireEvent.click(screen.getByText('Bruna'));
  
    expect(onChangeMock).toHaveBeenCalledWith(2);
  
    expect(await screen.findByText('Bruna')).toBeInTheDocument();

  });

  it('should handle API errors gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE_URL}/renters`);
    });

    expect(screen.queryByDisplayValue('Lucas')).not.toBeInTheDocument();
  });
});
