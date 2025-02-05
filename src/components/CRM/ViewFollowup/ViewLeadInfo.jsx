function ViewLeadInfo({ followupEdit }) {
  return (
    <fieldset className="form-section">
      <legend>Lead Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Lead No*</label>
          <div>{followupEdit.lead_no || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Lead Date</label>
          <div>{followupEdit.lead_date || 'N/A'}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Customer Name</label>
          <div>{followupEdit.customer_name || 'N/A'}</div>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Phone</label>
          <div>{followupEdit.phone || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Email</label>
          <div>{followupEdit.email || 'N/A'}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewLeadInfo;
