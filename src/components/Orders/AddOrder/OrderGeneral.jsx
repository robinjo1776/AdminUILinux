import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderGeneral = ({ order, setOrder }) => {
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
    if (order.customer) {
      const selectedCustomer = customers.find((c) => c.value === order.customer);
      setCustomerRefNos(selectedCustomer ? [{ value: selectedCustomer.refNo, label: selectedCustomer.refNo }] : []);
    } else {
      setCustomerRefNos([]);
    }
  }, [order.customer, customers]);

  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="customer">Customer</label>
          <Select
            id="customer"
            options={customers}
            value={customers.find((c) => c.value === order.customer) || null}
            onChange={(selected) => setOrder({ ...order, customer: selected ? selected.value : '' })}
            placeholder="Select a customer"
            isClearable
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerRefNo">Customer Ref. No</label>
          <Select
            id="customerRefNo"
            options={customerRefNos}
            value={customerRefNos.find((c) => c.value === order.customer_ref_no) || null}
            onChange={(selected) => setOrder({ ...order, customer_ref_no: selected ? selected.value : '' })}
            placeholder="Select a reference number"
            isClearable
          />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Branch</label>
          <input type="text" value={order.branch} onChange={(e) => setOrder({ ...order, branch: e.target.value })} id="remitName" />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Booked By</label>
          <input type="text" value={order.booked_by} onChange={(e) => setOrder({ ...order, booked_by: e.target.value })} id="accNo" />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Account Rep</label>
          <input type="text" value={order.account_rep} onChange={(e) => setOrder({ ...order, account_rep: e.target.value })} id="branch" />
        </div>
        <div className="form-group">
          <label htmlFor="website">Sales Rep</label>
          <input type="text" value={order.sales_rep} onChange={(e) => setOrder({ ...order, sales_rep: e.target.value })} id="website" />
        </div>
        <div className="form-group">
          <label htmlFor="fedIdNo">Customer PO Number</label>
          <input type="text" value={order.customer_po_no} onChange={(e) => setOrder({ ...order, customer_po_no: e.target.value })} id="fedIdNo" />
        </div>
      </div>
    </fieldset>
  );
};

export default OrderGeneral;
