import { useEffect, useState } from 'react';
import axios from 'axios';
import { Order } from '../../../types/OrderTypes';

type API_Customer = {
  cust_name: string;
  cust_ref_no: string;
};

type Customer = {
  value: string;
  label: string;
  refNo: string;
};

type EditOrderGeneralProps = {
  formOrder: Order;
  setFormOrder: (order: Order) => void;
};

function EditOrderGeneral({ formOrder, setFormOrder }: EditOrderGeneralProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerRefNos, setCustomerRefNos] = useState<{ value: string; label: string }[]>([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No auth token found');
        return;
      }

      try {
        const { data } = await axios.get<API_Customer[]>(`${API_URL}/customer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched customers:', data);

        const formattedCustomers: Customer[] = data.map((customer) => ({
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
    const selectedCustomer = customers.find((c) => c.value === formOrder.customer);
    const newRefNos = selectedCustomer ? [{ value: selectedCustomer.refNo, label: selectedCustomer.refNo }] : [];

    if (JSON.stringify(newRefNos) !== JSON.stringify(customerRefNos)) {
      setCustomerRefNos(newRefNos);
    }
  }, [formOrder.customer, customers]);

  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customer">Customer</label>
          <select id="customer" value={formOrder.customer || ''} onChange={(e) => setFormOrder({ ...formOrder, customer: e.target.value })} required>
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
            id="customerRefNo"
            value={formOrder.customer_ref_no || ''}
            onChange={(e) => setFormOrder({ ...formOrder, customer_ref_no: e.target.value })}
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
          <label htmlFor="branch">Branch</label>
          <input type="text" id="branch" value={formOrder.branch || ''} onChange={(e) => setFormOrder({ ...formOrder, branch: e.target.value })} />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bookedBy">Booked By</label>
          <input
            type="text"
            id="bookedBy"
            value={formOrder.booked_by || ''}
            onChange={(e) => setFormOrder({ ...formOrder, booked_by: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accountRep">Account Rep</label>
          <input
            type="text"
            id="accountRep"
            value={formOrder.account_rep || ''}
            onChange={(e) => setFormOrder({ ...formOrder, account_rep: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="salesRep">Sales Rep</label>
          <input
            type="text"
            id="salesRep"
            value={formOrder.sales_rep || ''}
            onChange={(e) => setFormOrder({ ...formOrder, sales_rep: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customerPoNo">Customer PO Number</label>
          <input
            type="text"
            id="customerPoNo"
            value={formOrder.customer_po_no || ''}
            onChange={(e) => setFormOrder({ ...formOrder, customer_po_no: e.target.value })}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditOrderGeneral;
