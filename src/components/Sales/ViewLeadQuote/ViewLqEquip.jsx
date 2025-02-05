function ViewLqEquip({ formLead }) {
  return (
    <fieldset className="form-section">
      <legend>Equipment & Lead Type</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Equipment Type</label>
          <p>{formLead.equipment_type || 'N/A'}</p>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Lead Type</label>
          <p>{formLead.lead_type || 'N/A'}</p>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Lead Status</label>
          <p>{formLead.lead_status || 'N/A'}</p>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewLqEquip;
