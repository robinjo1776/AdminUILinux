function VendorAdditional({ vendor, setVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Additional Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">US Tax id</label>
          <input
            type="text"
            value={vendor.us_tax_id}
            onChange={(e) => setVendor({ ...vendor, us_tax_id: e.target.value })}
            id="legalName"
            placeholder="US Tax id"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Payroll#</label>
          <input
            type="text"
            value={vendor.payroll_no}
            onChange={(e) => setVendor({ ...vendor, payroll_no: e.target.value })}
            id="remitName"
            placeholder="Payroll#"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">WCB#</label>
          <input type="text" value={vendor.wcb_no} onChange={(e) => setVendor({ ...vendor, wcb_no: e.target.value })} id="accNo" placeholder="WCB#" />
        </div>
      </div>
    </fieldset>
  );
}

export default VendorAdditional;
