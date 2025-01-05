import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EditLeadDetails({ formLead, setFormLead }) {
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
    if (formLead.customer_name) {
      const selectedCustomer = customers.find((c) => c.value === formLead.customer_name);
      setCustomerRefNos(selectedCustomer ? [{ value: selectedCustomer.refNo, label: selectedCustomer.refNo }] : []);
    } else {
      setCustomerRefNos([]);
    }
  }, [formLead.customer_name, customers]);
  return (
    <fieldset className="form-section">
      <legend>Lead Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="leadNo">Lead No*</label>
          <input type="text" value={formLead.lead_no} onChange={(e) => setFormLead({ ...formLead, lead_no: e.target.value })} id="leadNo" required />
        </div>
        <div className="form-group">
          <label htmlFor="leadDate">Lead Date*</label>
          <input
            type="date"
            value={formLead.lead_date}
            onChange={(e) => setFormLead({ ...formLead, lead_date: e.target.value })}
            id="leadDate"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quote_customer">Customer</label>
          <Select
            id="quote_customer"
            options={customers}
            value={customers.find((c) => c.value === formLead.customer_name) || null}
            onChange={(selected) => {
              console.log('Selected customer:', selected); // Debugging selected customer
              setFormLead({ ...formLead, customer_name: selected ? selected.value : '' });
            }}
            placeholder="Select a customer"
            isClearable
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" value={formLead.phone} onChange={(e) => setFormLead({ ...formLead, phone: e.target.value })} id="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" value={formLead.email} onChange={(e) => setFormLead({ ...formLead, email: e.target.value })} id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input type="text" value={formLead.website} onChange={(e) => setFormLead({ ...formLead, website: e.target.value })} id="website" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditLeadDetails;
