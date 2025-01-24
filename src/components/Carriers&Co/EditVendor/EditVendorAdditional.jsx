function EditVendorAdditional({ formVendor, setFormVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Additional Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">US Tax id</label>
          <input
            type="text"
            value={formVendor.us_tax_id}
            onChange={(e) => setFormVendor({ ...formVendor, us_tax_id: e.target.value })}
            id="legalName"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Payroll#</label>
          <input
            type="text"
            value={formVendor.payroll_no}
            onChange={(e) => setFormVendor({ ...formVendor, payroll_no: e.target.value })}
            id="remitName"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">WCB#</label>
          <input type="text" value={formVendor.wcb_no} onChange={(e) => setFormVendor({ ...formVendor, wcb_no: e.target.value })} id="accNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditVendorAdditional;
