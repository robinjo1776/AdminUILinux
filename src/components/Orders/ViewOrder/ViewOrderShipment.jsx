function ViewOrderShipment({ formOrder }) {
  const euipmentOptions = ["Dry Van 53'", "Flat Bed 53'", "Reefer 53'"];
  const loadTypeOptions = ['Partial', 'FTL', 'LTL'];

  return (
    <fieldset className="form-section">
      <legend>Shipment</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="dba">Commodity</label>
          <div>{formOrder.commodity}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="creditStatus">Equipment</label>
          <div>{formOrder.equipment}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="creditStatus">Load Type</label>
          <div>{formOrder.load_type}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Temperature</label>
          <div>{formOrder.temperature}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewOrderShipment;
