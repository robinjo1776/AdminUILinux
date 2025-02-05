import { useState, useEffect } from 'react';
import axios from 'axios';

function EditFuInfo({ followupEdit, setFolloupEdit }) {
  const [customers, setCustomers] = useState([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust based on where you store the token

        const { data } = await axios.get(`${API_URL}/lead`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        });

        console.log('Fetched leads:', data); // Debugging the fetched data

        // Transform data into the required format
        const formattedCustomers = data.map((customer) => ({
          value: customer.customer_name, // Ensure 'value' is set to a unique identifier
          label: customer.customer_name, // Label to display
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
          <label htmlFor="leadNo">Lead No*</label>
          <input
            type="number"
            value={followupEdit.lead_no}
            onChange={(e) => setFolloupEdit({ ...followupEdit, lead_no: e.target.value })}
            id="leadNo"
            required
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="leadDate">Lead Date*</label>
          <input
            type="date"
            value={followupEdit.lead_date}
            onChange={(e) =>
              setFolloupEdit({
                ...followupEdit,
                lead_date: e.target.value,
              })
            }
            id="leadDate"
            required
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="quote_customer">Lead</label>
          <select
            id="quote_customer"
            value={followupEdit.customer_name || ''}
            onChange={(e) => {
              console.log('Selected lead:', e.target.value); // Debugging selected customer
              setFolloupEdit({ ...followupEdit, customer_name: e.target.value });
            }}
            required
          >
            <option value="" disabled>
              Select a lead
            </option>
            {customers.map((customer) => (
              <option key={customer.value} value={customer.value}>
                {customer.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="phone">Phone</label>
          <input type="tel" value={followupEdit.phone} onChange={(e) => setFolloupEdit({ ...followupEdit, phone: e.target.value })} id="phone" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="email">Email</label>
          <input type="email" value={followupEdit.email} onChange={(e) => setFolloupEdit({ ...followupEdit, email: e.target.value })} id="email" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditFuInfo;
