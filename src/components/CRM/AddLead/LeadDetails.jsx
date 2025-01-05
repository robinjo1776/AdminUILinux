function LeadDetails({ lead, setLead }) {
  return (
    <fieldset className="form-section">
      <legend>Lead Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="leadNo">Lead No*</label>
          <input type="text" value={lead.lead_no} onChange={(e) => setLead({ ...lead, lead_no: e.target.value })} id="leadNo" required />
        </div>
        <div className="form-group">
          <label htmlFor="leadDate">Lead Date*</label>
          <input type="date" value={lead.lead_date} onChange={(e) => setLead({ ...lead, lead_date: e.target.value })} id="leadDate" required />
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input type="text" value={lead.customer_name} onChange={(e) => setLead({ ...lead, customer_name: e.target.value })} id="customerName" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} id="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input type="text" value={lead.website} onChange={(e) => setLead({ ...lead, website: e.target.value })} id="website" />
        </div>
      </div>
    </fieldset>
  );
}

export default LeadDetails;
