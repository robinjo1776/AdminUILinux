function EditLeadDetails({ formLead, setFormLead }) {
  const leadTypeOptions = ['AB', 'BC', 'BDS', 'CA', 'DPD MAGMA', 'MB', 'ON', 'Super Leads', 'TBAB', 'USA'];
  const leadStatusOptions = [
    'Prospect',
    'Lanes discussed',
    'Prod/Equip noted',
    'E-mail sent',
    'Portal registration',
    'Quotations',
    'Fob/Have broker',
    'VM/No answer',
    'Diff Dept.',
    'No reply',
    'Not Int.',
    'Asset based',
  ];
  return (
    <fieldset className="form-section">
      <legend>Lead Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="leadNo">Lead No*</label>
          <input type="text" value={formLead.lead_no} onChange={(e) => setFormLead({ ...formLead, lead_no: e.target.value })} id="leadNo" required />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="leadDate">Lead Date*</label>
          <input type="date" value={formLead.lead_date} onChange={(e) => setFormLead({ ...formLead, lead_date: e.target.value })} id="leadDate" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            value={formLead.customer_name}
            onChange={(e) => setFormLead({ ...formLead, customer_name: e.target.value })}
            id="customerName"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="phone">Phone</label>
          <input type="tel" value={formLead.phone} onChange={(e) => setFormLead({ ...formLead, phone: e.target.value })} id="phone" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="email">Email</label>
          <input type="email" value={formLead.email} onChange={(e) => setFormLead({ ...formLead, email: e.target.value })} id="email" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="website">Website</label>
          <input type="text" value={formLead.website} onChange={(e) => setFormLead({ ...formLead, website: e.target.value })} id="website" />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="leadType">Lead Type*</label>
          <select id="leadType" value={formLead.lead_type} onChange={(e) => setFormLead({ ...formLead, lead_type: e.target.value })}>
            <option value="">Select Lead Type</option>
            {leadTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="leadStatus">Lead Status*</label>
          <select id="leadStatus" value={formLead.lead_status} onChange={(e) => setFormLead({ ...formLead, lead_status: e.target.value })}>
            <option value="">Select Lead Status</option>
            {leadStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </fieldset>
  );
}

export default EditLeadDetails;
