import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BrokerDetails from '../../src/components/Carriers&Co/AddBroker/BrokerDetails';
import { Broker } from '../../src/types/BrokerTypes';

describe('BrokerDetails Component', () => {
  let mockBroker: Broker;
  let mockSetBroker: React.Dispatch<React.SetStateAction<Broker>>;

  beforeEach(() => {
    mockBroker = {
      id: 1,
      broker_name: '',
      broker_address: '',
      broker_city: '',
      broker_state: '',
      broker_country: '',
      broker_postal: '',
      broker_email: '',
      broker_phone: '',
      broker_ext: '',
      broker_fax: '',
      created_at: '',
      updated_at: '',
    };

    mockSetBroker = vi.fn();
  });

  it('renders input fields correctly', () => {
    render(<BrokerDetails broker={mockBroker} setBroker={mockSetBroker} />);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Street')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('State')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Country')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Postal Code')).toBeInTheDocument();
  });

  it('updates the broker name when input changes', () => {
    render(<BrokerDetails broker={mockBroker} setBroker={mockSetBroker} />);

    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'Test Broker' } });

    expect(mockSetBroker).toHaveBeenCalledWith(expect.objectContaining({ broker_name: 'Test Broker' }));
  });

  it('updates the broker address when input changes', () => {
    render(<BrokerDetails broker={mockBroker} setBroker={mockSetBroker} />);

    const addressInput = screen.getByPlaceholderText('Street');
    fireEvent.change(addressInput, { target: { value: '123 Test Street' } });

    expect(mockSetBroker).toHaveBeenCalledWith(expect.objectContaining({ broker_address: '123 Test Street' }));
  });

  it('updates the broker city when input changes', () => {
    render(<BrokerDetails broker={mockBroker} setBroker={mockSetBroker} />);

    const cityInput = screen.getByPlaceholderText('City');
    fireEvent.change(cityInput, { target: { value: 'Test City' } });

    expect(mockSetBroker).toHaveBeenCalledWith(expect.objectContaining({ broker_city: 'Test City' }));
  });

  it('updates the broker state when input changes', () => {
    render(<BrokerDetails broker={mockBroker} setBroker={mockSetBroker} />);

    const stateInput = screen.getByPlaceholderText('State');
    fireEvent.change(stateInput, { target: { value: 'Test State' } });

    expect(mockSetBroker).toHaveBeenCalledWith(expect.objectContaining({ broker_state: 'Test State' }));
  });

  it('updates the broker country when input changes', () => {
    render(<BrokerDetails broker={mockBroker} setBroker={mockSetBroker} />);

    const countryInput = screen.getByPlaceholderText('Country');
    fireEvent.change(countryInput, { target: { value: 'Test Country' } });

    expect(mockSetBroker).toHaveBeenCalledWith(expect.objectContaining({ broker_country: 'Test Country' }));
  });

  it('updates the broker postal code when input changes', () => {
    render(<BrokerDetails broker={mockBroker} setBroker={mockSetBroker} />);

    const postalCodeInput = screen.getByPlaceholderText('Postal Code');
    fireEvent.change(postalCodeInput, { target: { value: '12345' } });

    expect(mockSetBroker).toHaveBeenCalledWith(expect.objectContaining({ broker_postal: '12345' }));
  });
});
