function EditOrderCharges({ setFormOrder, order, charge = {}, index, onRemove }) {
  const rateOptions = ['Flat', 'Percentage'];

  const handleOrderChange = (e) => {
    const { name, value } = e.target;

    setFormOrder((prevOrder) => ({
      ...prevOrder,
      charges: prevOrder.charges.map((loc, idx) => (idx === index ? { ...loc, [name]: value } : loc)),
    }));
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Type</label>
        <input
          type="text"
          name="type"
          value={charge.type || ''}
          onChange={handleOrderChange}
        />
      </div>
      <div className="form-group">
        <label>Charge</label>
        <input
          type="tel"
          name="charge"
          value={charge.charge || ''}
          onChange={handleOrderChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="percent">Percent/Flat Rate</label>
        <select
          name="percent"
          value={charge.percent || ''}
          onChange={handleOrderChange}
        >
          <option value="">Select..</option>
          {rateOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={() => onRemove(index)} className="remove">
        Remove
      </button>
    </div>
  );
}

export default EditOrderCharges;
