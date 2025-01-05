function EditOrderRevenue({ formOrder, setFormOrder }) {
  const currencyOptions = ['CAD', 'USD'];

  return (
    <fieldset className="form-section">
      <legend>Revenue</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="creditStatus">Currency</label>
          <select
            name="creditStatus"
            value={formOrder.currency}
            onChange={(e) =>
              setFormOrder({
                ...formOrder,
                currency: e.target.value,
              })
            }
          >
            <option value="">Select..</option>
            {currencyOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="accNo">Base Price</label>
          <input type="text" value={formOrder.base_price} onChange={(e) => setFormOrder({ ...formOrder, base_price: e.target.value })} id="accNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditOrderRevenue;
