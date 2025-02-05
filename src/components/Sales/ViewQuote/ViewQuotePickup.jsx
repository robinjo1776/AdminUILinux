function ViewQuotePickup({ pickup, index, onRemove }) {
  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Address</label>
        <p>{pickup.address || 'N/A'}</p>
      </div>
      <div className="form-group">
        <label>City</label>
        <p>{pickup.city || 'N/A'}</p>
      </div>
      <div className="form-group">
        <label>State</label>
        <p>{pickup.state || 'N/A'}</p>
      </div>
      <div className="form-group">
        <label>Postal Code</label>
        <p>{pickup.postal || 'N/A'}</p>
      </div>
      <div className="form-group">
        <label>Country</label>
        <p>{pickup.country || 'N/A'}</p>
      </div>


    </div>
  );
}

export default ViewQuotePickup;
