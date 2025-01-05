function OrderShipment({ order, setOrder }) {
  const euipmentOptions = ["Dry Van 53'", "Flat Bed 53'", "Reefer 53'"];
  const loadTypeOptions = ['Partial', 'FTL', 'LTL'];

  return (
    <fieldset className="form-section">
      <legend>Shipment</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dba">Commodity</label>
          <input type="text" value={order.commodity} onChange={(e) => setOrder({ ...order, commodity: e.target.value })} id="dba" />
        </div>
        <div className="form-group">
          <label htmlFor="creditStatus">Equipment</label>
          <select
            name="creditStatus"
            value={order.equipment}
            onChange={(e) =>
              setOrder({
                ...order,
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
            value={order.load_type}
            onChange={(e) =>
              setOrder({
                ...order,
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
          <input type="text" value={order.temperature} onChange={(e) => setOrder({ ...order, temperature: e.target.value })} id="accNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default OrderShipment;
