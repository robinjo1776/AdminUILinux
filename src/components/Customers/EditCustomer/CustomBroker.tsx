import React from 'react';

type Customer = {
  cust_broker_name: string;
  cust_bkp_notes: string;
  cust_bkspl_notes: string;
};

type CustomBrokerProps = {
  formCustomer: Customer;
  setformCustomer: React.Dispatch<React.SetStateAction<Customer>>;
};

const CustomBroker: React.FC<CustomBrokerProps> = ({ formCustomer, setformCustomer }) => {
  const brokerOptions = ['Broker 1', 'Broker 2', 'Broker 3'];

  return (
    <fieldset>
      <legend>Custom Broker</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="broker">Broker</label>
          <select
            id="broker"
            value={formCustomer.cust_broker_name}
            onChange={(e) =>
              setformCustomer((prev) => ({
                ...prev,
                cust_broker_name: e.target.value,
              }))
            }
          >
            {brokerOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="paymentNotes">Payment Notes</label>
          <input
            type="text"
            id="paymentNotes"
            value={formCustomer.cust_bkp_notes}
            onChange={(e) =>
              setformCustomer((prev) => ({
                ...prev,
                cust_bkp_notes: e.target.value,
              }))
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="specialNotes">Special Notes for Confirmation Doc</label>
          <textarea
            id="specialNotes"
            value={formCustomer.cust_bkspl_notes}
            onChange={(e) =>
              setformCustomer((prev) => ({
                ...prev,
                cust_bkspl_notes: e.target.value,
              }))
            }
            rows={4}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default CustomBroker;
