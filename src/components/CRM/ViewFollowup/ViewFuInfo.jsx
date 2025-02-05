import { useState, useEffect } from 'react';
import axios from 'axios';

function ViewFuInfo({ followupEdit }) {
  const [customers, setCustomers] = useState([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');

        const { data } = await axios.get(`${API_URL}/lead`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched leads:', data);

        const formattedCustomers = data.map((customer) => ({
          value: customer.customer_name,
          label: customer.customer_name,
        }));

        setCustomers(formattedCustomers);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <fieldset className="form-section">
      <legend>Follow-up Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Lead No</label>
          <div>{followupEdit.lead_no || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Lead Date</label>
          <div>{followupEdit.lead_date || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Lead</label>
          <div>{followupEdit.customer_name || 'N/A'}</div>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Phone</label>
          <div>{followupEdit.phone || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Email</label>
          <div>{followupEdit.email || 'N/A'}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewFuInfo;
