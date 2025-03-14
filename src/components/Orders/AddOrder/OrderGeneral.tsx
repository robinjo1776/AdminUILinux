import { useEffect, useState } from 'react';
import axios from 'axios';
import { Order } from '../../../types/OrderTypes';
import { Customer } from '../../../types/CustomerTypes';

interface OrderGeneralProps {
  order: Order;
  setOrder: (order: Order) => void;
}

const OrderGeneral: React.FC<OrderGeneralProps> = ({ order, setOrder }) => {
  const [customers, setCustomers] = useState<{ value: string; label: string; refNo: string }[]>([]);
  const [customerRefNos, setCustomerRefNos] = useState<{ value: string; label: string }[]>([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Customer[]>(`${API_URL}/customer`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response || !response.data) {
          console.error('API response is undefined or invalid:', response);
          return;
        }

        console.log('Fetched customers:', response.data);

        const formattedCustomers = response.data.map((customer) => ({
          value: customer.cust_name,
          label: customer.cust_name,
          refNo: customer.cust_ref_no,
        }));

        setCustomers(formattedCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

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
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customer">Customer</label>
          <select id="quote_customer" value={order.customer || ''} onChange={(e) => setOrder({ ...order, customer: e.target.value })} required>
            <option value="" disabled>
              Select a customer
            </option>
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <option key={`${customer.refNo}-${index}`} value={customer.value}>
                  {customer.label}
                </option>
              ))
            ) : (
              <option disabled>No customers found</option>
            )}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customerRefNo">Customer Ref. No</label>
          <select
            id="quote_customer_ref_no"
            value={order.customer_ref_no || ''}
            onChange={(e) => setOrder({ ...order, customer_ref_no: e.target.value })}
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
          <input
            type="text"
            value={order.branch || ''}
            onChange={(e) => setOrder({ ...order, branch: e.target.value })}
            id="remitName"
            placeholder="Branch"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Booked By</label>
          <input
            type="text"
            value={order.booked_by || ''}
            onChange={(e) => setOrder({ ...order, booked_by: e.target.value })}
            id="accNo"
            placeholder="Booked By"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="branch">Account Rep</label>
          <input
            type="text"
            value={order.account_rep || ''}
            onChange={(e) => setOrder({ ...order, account_rep: e.target.value })}
            id="branch"
            placeholder="Account Rep"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="website">Sales Rep</label>
          <input
            type="text"
            value={order.sales_rep || ''}
            onChange={(e) => setOrder({ ...order, sales_rep: e.target.value })}
            id="website"
            placeholder="Sales Rep"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="fedIdNo">Customer PO Number</label>
          <input
            type="text"
            value={order.customer_po_no || ''}
            onChange={(e) => setOrder({ ...order, customer_po_no: e.target.value })}
            id="fedIdNo"
            placeholder="Customer PO Number"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OrderGeneral;
