import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditBrokerDetails from './EditBrokerDetails';

function EditBrokerForm({ broker, onClose, onUpdate }) {
  const [formBroker, setFormBroker] = useState({
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

  useEffect(() => {
    if (broker) {
      console.log('Selected Broker:', broker); // Log selectedBroker to see the value

      setFormBroker({
        id: broker.id,
        broker_name: broker.broker_name || '',
        broker_address: broker.broker_address || '',
        broker_city: broker.broker_city || '',
        broker_state: broker.broker_state || '',
        broker_country: broker.broker_country || '',
        broker_postal: broker.broker_postal || '',
        broker_email: broker.broker_email || '',
        broker_phone: broker.broker_phone || '',
        broker_ext: broker.broker_ext || '',
        broker_fax: broker.broker_fax || '',
      });
    }
  }, [broker]);

  const updateBroker = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You are not logged in. Please log in again.',
        });
        return;
      }

      const response = await axios.put(`${API_URL}/api/broker/${formBroker.id}`, formBroker, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Broker data has been updated successfully.',
      });
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating broker:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update broker.',
      });
    }
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateBroker();
        }}
        className="form-main"
      >
        <EditBrokerDetails formBroker={formBroker} setFormBroker={setFormBroker} />
        <button type="submit" className="btn-submit">
          Update Broker
        </button>
      </form>
    </div>
  );
}

export default EditBrokerForm;
