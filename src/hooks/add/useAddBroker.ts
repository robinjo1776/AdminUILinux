// src/hooks/useBrokerForm.ts
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Broker } from '../../types/BrokerTypes';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const useAddBroker = (onAddBroker: (broker: Broker) => void, onClose: () => void) => {
  const [broker, setBroker] = useState<Broker>({
    id: 0,
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
  });

  const validateBroker = (): boolean => {
    return !!broker.broker_name;
  };

  const clearBrokerForm = (): void => {
    setBroker({
      id: 0,
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
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateBroker()) {
      try {
        let response;
        const token = localStorage.getItem('token');

        if (!token) {
          Swal.fire('Error', 'No token found', 'error');
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        if (broker.id) {
          response = await axios.put<Broker>(`${API_URL}/broker/${broker.id}`, broker, { headers });
          Swal.fire('Updated!', 'Broker data has been updated successfully.', 'success');
        } else {
          response = await axios.post<Broker>(`${API_URL}/broker`, broker, { headers });
          Swal.fire('Saved!', 'Broker data has been saved successfully.', 'success');
        }

        onAddBroker(response.data);
        clearBrokerForm();
        onClose();
      } catch (error: any) {
        console.error('Error saving/updating broker:', error.response ? error.response.data : error.message);
        Swal.fire('Error', 'An error occurred while saving/updating the broker.', 'error');
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  return { broker, setBroker, handleSubmit };
};
