function VendorLiabilityInsurance({ vendor, setVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Liability Insurance Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="liProvider">Liability Insurance Provider</label>
          <input type="text" value={vendor.liab_company} onChange={(e) => setVendor({ ...vendor, liab_company: e.target.value })} id="liProvider" />
        </div>
        <div className="form-group">
          <label htmlFor="liStartDate">Start Date</label>
          <input
            type="date"
            value={vendor.liab_policy_start}
            onChange={(e) => setVendor({ ...vendor, liab_policy_start: e.target.value })}
            id="liStartDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="liEndDate">End Date</label>
          <input
            type="date"
            value={vendor.liab_policy_end}
            onChange={(e) => setVendor({ ...vendor, liab_policy_end: e.target.value })}
            id="liEndDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="liCoverage">Coverage Amount</label>
          <input type="number" value={vendor.liab_ins_amt} onChange={(e) => setVendor({ ...vendor, liab_ins_amt: e.target.value })} id="liCoverage" />
        </div>
      </div>
    </fieldset>
  );
}

export default VendorLiabilityInsurance;
