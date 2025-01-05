import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EditFollowupInfo({ followupEdit, setFolloupEdit }) {
  const [customers, setCustomers] = useState([]);
  const [customerRefNos, setCustomerRefNos] = useState([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch customers and their reference numbers on component mount
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

        // Transform data into the required format for react-select
        const formattedCustomers = data.map((customer_name) => ({
          value: customer_name.customer_name, // Ensure 'value' is set to 'customer.id'
          label: customer_name.customer_name, // Label to display
        }));

        setCustomers(formattedCustomers);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Update customer reference numbers based on the selected customer
  useEffect(() => {
    if (followupEdit.customer_name) {
      const selectedCustomer = customers.find((c) => c.value === followupEdit.customer_name);
      setCustomerRefNos(selectedCustomer ? [{ value: selectedCustomer.refNo, label: selectedCustomer.refNo }] : []);
    } else {
      setCustomerRefNos([]);
    }
  }, [followupEdit.customer_name, customers]);
  return (
    <fieldset className="form-section">
      <legend>Follow-up Information</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="leadNo">Lead No*</label>
          <input
            type="text"
            value={followupEdit.lead_no}
            onChange={(e) => setFolloupEdit({ ...followupEdit, lead_no: e.target.value })}
            id="leadNo"
            required
          />
        </div>
        <div className="form-group">
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
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="quote_customer">Lead</label>
          <Select
            id="quote_customer"
            options={customers}
            value={customers.find((c) => c.value === followupEdit.customer_name) || null}
            onChange={(selected) => {
              console.log('Selected lead:', selected); // Debugging selected customer
              setFolloupEdit({ ...followupEdit, customer_name: selected ? selected.value : '' });
            }}
            placeholder="Select a lead"
            isClearable
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" value={followupEdit.phone} onChange={(e) => setFolloupEdit({ ...followupEdit, phone: e.target.value })} id="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" value={followupEdit.email} onChange={(e) => setFolloupEdit({ ...followupEdit, email: e.target.value })} id="email" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditFollowupInfo;
