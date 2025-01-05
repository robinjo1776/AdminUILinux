import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../styles/Form.css';
import BrokerDetails from './BrokerDetails';

const AddBrokerForm = ({ onClose, onAddBroker }) => {
  const [broker, setBroker] = useState({
    id: '',
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
  });
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateBroker()) {
      try {
        let response;
        const token = localStorage.getItem('token');

        if (!token) {
          Swal.fire('Error', 'No token found', 'error');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        if (broker.id) {
          response = await axios.put(`${API_URL}/broker/${broker.id}`, broker, { headers });
          Swal.fire('Updated!', 'Broker data has been updated successfully.', 'success');
        } else {
          response = await axios.post(`${API_URL}api/broker`, broker, {
            headers,
          });
          Swal.fire('Saved!', 'Broker data has been saved successfully.', 'success');
        }

        onAddBroker(response.data);
        clearBrokerForm();
        onClose();
      } catch (error) {
        console.error('Error saving/updating broker:', error.response ? error.response.data : error.message);
        Swal.fire('Error', 'An error occurred while saving/updating the broker.', 'error');
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  const validateBroker = () => {
    return broker.broker_name;
  };

  const clearBrokerForm = () => {
    setBroker({
      id: '',
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
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <BrokerDetails broker={broker} setBroker={setBroker} />
        <div className="submit-button-container">
          <button type="submit" className="btn-submit">
            Submit Broker
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrokerForm;
