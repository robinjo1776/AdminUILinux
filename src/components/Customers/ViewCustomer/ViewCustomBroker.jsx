function ViewCustomBroker({ formCustomer, setformCustomer }) {
  const brokerOptions = ['Broker 1', 'Broker 2', 'Broker 3'];

  return (
    <fieldset>
      <legend>Custom Broker</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Broker</label>
          <div>{formCustomer.cust_broker_name}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Payment Notes</label>
          <div>{formCustomer.cust_bkp_notes}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Special Notes for Confirmation Doc</label>
          <div>{formCustomer.cust_bkspl_notes}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewCustomBroker;
