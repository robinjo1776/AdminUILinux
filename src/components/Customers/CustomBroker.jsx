function CustomBroker({ formCustomer, setformCustomer }) {
  const brokerOptions = ['Broker 1', 'Broker 2', 'Broker 3'];

  return (
    <fieldset>
      <legend>Custom Broker</legend>

      <div className="form-group">
        <label htmlFor="broker">Broker</label>
        <select
          id="customerType"
          value={formCustomer.cust_broker_name}
          onChange={(e) =>
            setformCustomer({
              ...formCustomer,
              cust_broker_name: e.target.value,
            })
          }
        >
          {brokerOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="paymentNotes">Payment Notes</label>
        <input
          type="text"
          id="paymentNotes"
          value={formCustomer.cust_bkp_notes}
          onChange={(e) =>
            setformCustomer({
              ...formCustomer,
              cust_bkp_notes: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="specialNotes">Special Notes for Confirmation Doc</label>
        <textarea
          id="specialNotes"
          value={formCustomer.cust_bkspl_notes}
          onChange={(e) =>
            setformCustomer({
              ...formCustomer,
              cust_bkspl_notes: e.target.value,
            })
          }
          rows="4"
        />
      </div>
    </fieldset>
  );
}

export default CustomBroker;
