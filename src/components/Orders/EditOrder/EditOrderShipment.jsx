function EditOrderShipment({ formOrder, setFormOrder }) {
  const euipmentOptions = ["Dry Van 53'", "Flat Bed 53'", "Reefer 53'"];
  const loadTypeOptions = ['Partial', 'FTL', 'LTL'];

  return (
    <fieldset className="form-section">
      <legend>Shipment</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dba">Commodity</label>
          <input type="text" value={formOrder.commodity} onChange={(e) => setFormOrder({ ...formOrder, commodity: e.target.value })} id="dba" />
        </div>
        <div className="form-group">
          <label htmlFor="creditStatus">Equipment</label>
          <select
            name="creditStatus"
            value={formOrder.equipment}
            onChange={(e) =>
              setFormOrder({
                ...formOrder,
                equipment: e.target.value,
              })
            }
          >
            <option value="">Select..</option>
            {euipmentOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="creditStatus">Load Type</label>
          <select
            name="creditStatus"
            value={formOrder.load_type}
            onChange={(e) =>
              setFormOrder({
                ...formOrder,
                load_type: e.target.value,
              })
            }
          >
            <option value="">Select..</option>
            {loadTypeOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Temperature</label>
          <input type="text" value={formOrder.temperature} onChange={(e) => setFormOrder({ ...formOrder, temperature: e.target.value })} id="accNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditOrderShipment;
