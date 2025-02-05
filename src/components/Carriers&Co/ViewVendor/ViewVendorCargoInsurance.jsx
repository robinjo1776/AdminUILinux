function ViewVendorCargoInsurance({ formVendor }) {
  // Helper function to format the date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
  };

  return (
    <fieldset className="form-section">
      <legend>Cargo Insurance Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Cargo Insurance Provider</label>
          <p>{formVendor.cargo_company || 'N/A'}</p>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Start Date</label>
          <p>{formatDate(formVendor.cargo_policy_start)}</p>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>End Date</label>
          <p>{formatDate(formVendor.cargo_policy_end)}</p>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Coverage Amount</label>
          <p>{formVendor.cargo_ins_amt || 'N/A'}</p>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewVendorCargoInsurance;
