import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EditQuoteGeneral({ formQuote, setFormQuote }) {
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
        const formattedCustomers = data.map((quote_customer) => ({
          value: quote_customer.cust_name, // Ensure 'value' is set to 'customer.id'
          label: quote_customer.cust_name, // Label to display
          refNo: quote_customer.cust_ref_no, // Reference number
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
    if (formQuote.quote_customer) {
      const selectedCustomer = customers.find((c) => c.value === formQuote.quote_customer);
      setCustomerRefNos(selectedCustomer ? [{ value: selectedCustomer.refNo, label: selectedCustomer.refNo }] : []);
    } else {
      setCustomerRefNos([]);
    }
  }, [formQuote.quote_customer, customers]);

  const quoteTypeOptions = ['FTL', 'LTL'];

  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="quoteType">Quote Type*</label>

          <select id="quoteType" value={formQuote.quote_type} onChange={(e) => setFormQuote({ ...formQuote, quote_type: e.target.value })} required>
            {quoteTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="quote_customer">Customer</label>
          <select
            id="quote_customer"
            value={formQuote.quote_customer || ''}
            onChange={(e) => {
              console.log('Selected customer:', e.target.value); // Debugging selected customer
              setFormQuote({ ...formQuote, quote_customer: e.target.value });
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
            value={formQuote.quote_cust_ref_no || ''}
            onChange={(e) => {
              console.log('Selected customer:', e.target.value);
              setFormQuote({ ...formQuote, quote_cust_ref_no: e.target.value });
            }}
            required
          >
            <option value="" disabled>
              Select a reference number
            </option>
            {customerRefNos.map((quote_cust_ref_no) => (
              <option key={quote_cust_ref_no.value} value={quote_cust_ref_no.value}>
                {quote_cust_ref_no.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Booked By</label>
          <input
            type="text"
            value={formQuote.quote_booked_by}
            onChange={(e) => setFormQuote({ ...formQuote, quote_booked_by: e.target.value })}
            id="accNo"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="branch">Temperature</label>
          <input
            type="text"
            value={formQuote.quote_temperature}
            onChange={(e) => setFormQuote({ ...formQuote, quote_temperature: e.target.value })}
            id="branch"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Hot
            <input
              type="checkbox"
              id="creditApplication"
              checked={formQuote.quote_hot}
              onChange={(e) =>
                setFormQuote({
                  ...formQuote,
                  quote_hot: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Team
            <input
              type="checkbox"
              id="creditApplication"
              checked={formQuote.quote_team}
              onChange={(e) =>
                setFormQuote({
                  ...formQuote,
                  quote_team: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Air Ride
            <input
              type="checkbox"
              id="creditApplication"
              checked={formQuote.quote_air_ride}
              onChange={(e) =>
                setFormQuote({
                  ...formQuote,
                  quote_air_ride: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            TARP
            <input
              type="checkbox"
              id="creditApplication"
              checked={formQuote.quote_tarp}
              onChange={(e) =>
                setFormQuote({
                  ...formQuote,
                  quote_tarp: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Hazmat
            <input
              type="checkbox"
              id="creditApplication"
              checked={formQuote.quote_hazmat}
              onChange={(e) =>
                setFormQuote({
                  ...formQuote,
                  quote_hazmat: e.target.checked,
                })
              }
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default EditQuoteGeneral;
