function ViewOrderCharges({ order, charge = {}, index, onRemove }) {
  const rateOptions = ['Flat', 'Percentage'];

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Type</label>
        <div>{charge.type || ''}</div>
      </div>
      <div className="form-group">
        <label>Charge</label>
        <div>{charge.charge || ''}</div>
      </div>
      <div className="form-group">
        <label>Percent/Flat Rate</label>
        <div>{charge.percent || ''}</div>
      </div>
    </div>
  );
}

export default ViewOrderCharges;
