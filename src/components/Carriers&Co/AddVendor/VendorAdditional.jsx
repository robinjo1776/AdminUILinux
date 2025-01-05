function VendorAdditional({ vendor, setVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Additional Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="legalName">US Tax id</label>
          <input type="text" value={vendor.us_tax_id} onChange={(e) => setVendor({ ...vendor, us_tax_id: e.target.value })} id="legalName" />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Payroll#</label>
          <input type="text" value={vendor.payroll_no} onChange={(e) => setVendor({ ...vendor, payroll_no: e.target.value })} id="remitName" />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">WCB#</label>
          <input type="text" value={vendor.wcb_no} onChange={(e) => setVendor({ ...vendor, wcb_no: e.target.value })} id="accNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default VendorAdditional;
