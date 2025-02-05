import { useEffect, useState } from 'react';
import axios from 'axios';

function EditOrderGeneral({ formOrder, setFormOrder }) {
  const [customers, setCustomers] = useState([]);
  const [customerRefNos, setCustomerRefNos] = useState([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch customers and their reference numbers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust based on where you store the token

        const { data } = await axios.get(`${API_URL}/customer`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        });

        console.log('Fetched customers:', data); // Debugging the fetched data

        // Transform data into the required format for react-select
        const formattedCustomers = data.map((customer) => ({
          value: customer.cust_name, // Assuming each customer has an 'id'
          label: customer.cust_name, // Assuming each customer has a 'cust_name'
          refNo: customer.cust_ref_no, // Corrected field name here
        }));

        setCustomers(formattedCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Update customer reference numbers based on the selected customer
  useEffect(() => {
    if (formOrder.customer) {
      const selectedCustomer = customers.find((c) => c.value === formOrder.customer);
      setCustomerRefNos(selectedCustomer ? [{ value: selectedCustomer.refNo, label: selectedCustomer.refNo }] : []);
    } else {
      setCustomerRefNos([]);
    }
  }, [formOrder.customer, customers]);

  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customer">Customer</label>
          <select
            id="quote_customer"
            value={formOrder.customer || ''}
            onChange={(e) => {
              console.log('Selected customer:', e.target.value); // Debugging selected customer
              setFormOrder({ ...formOrder, customer: e.target.value });
            }}
            required
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((customer) => (
              <option key={customer.value} value={customer.value}>
                {customer.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customerRefNo">Customer Ref. No</label>
          <select
            id="quote_customer"
            value={formOrder.customer_ref_no || ''}
            onChange={(e) => {
              console.log('Selected customer:', e.target.value);
              setFormOrder({ ...formOrder, customer_ref_no: e.target.value });
            }}
            required
          >
            <option value="" disabled>
              Select a reference number
            </option>
            {customerRefNos.map((customer_ref_no) => (
              <option key={customer_ref_no.value} value={customer_ref_no.value}>
                {customer_ref_no.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Branch</label>
          <input type="text" value={formOrder.branch} onChange={(e) => setFormOrder({ ...formOrder, branch: e.target.value })} id="remitName" />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Booked By</label>
          <input type="text" value={formOrder.booked_by} onChange={(e) => setFormOrder({ ...formOrder, booked_by: e.target.value })} id="accNo" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="branch">Account Rep</label>
          <input
            type="text"
            value={formOrder.account_rep}
            onChange={(e) => setFormOrder({ ...formOrder, account_rep: e.target.value })}
            id="branch"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="website">Sales Rep</label>
          <input type="text" value={formOrder.sales_rep} onChange={(e) => setFormOrder({ ...formOrder, sales_rep: e.target.value })} id="website" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="fedIdNo">Customer PO Number</label>
          <input
            type="text"
            value={formOrder.customer_po_no}
            onChange={(e) => setFormOrder({ ...formOrder, customer_po_no: e.target.value })}
            id="fedIdNo"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditOrderGeneral;
