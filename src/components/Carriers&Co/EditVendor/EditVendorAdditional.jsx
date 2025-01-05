function EditVendorAdditional({ formVendor, setFormVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Additional Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="legalName">US Tax id</label>
          <input
            type="text"
            value={formVendor.us_tax_id}
            onChange={(e) => setFormVendor({ ...formVendor, us_tax_id: e.target.value })}
            id="legalName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Payroll#</label>
          <input
            type="text"
            value={formVendor.payroll_no}
            onChange={(e) => setFormVendor({ ...formVendor, payroll_no: e.target.value })}
            id="remitName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">WCB#</label>
          <input type="text" value={formVendor.wcb_no} onChange={(e) => setFormVendor({ ...formVendor, wcb_no: e.target.value })} id="accNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditVendorAdditional;
