function VendorCargoInsurance({ vendor, setVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Cargo Insurance Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciProvider">Cargo Insurance Provider</label>
          <input
            type="text"
            value={vendor.cargo_company}
            onChange={(e) => setVendor({ ...vendor, cargo_company: e.target.value })}
            id="ciProvider"
            placeholder="Cargo Insurance Provider"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciStartDate">Start Date</label>
          <input
            type="date"
            value={vendor.cargo_policy_start}
            onChange={(e) => setVendor({ ...vendor, cargo_policy_start: e.target.value })}
            id="ciStartDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciEndDate">End Date</label>
          <input
            type="date"
            value={vendor.cargo_policy_end}
            onChange={(e) => setVendor({ ...vendor, cargo_policy_end: e.target.value })}
            id="ciEndDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciCoverage">Coverage Amount</label>
          <input
            type="number"
            value={vendor.cargo_ins_amt}
            onChange={(e) => setVendor({ ...vendor, cargo_ins_amt: e.target.value })}
            id="ciCoverage"
            placeholder="Coverage Amount"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default VendorCargoInsurance;
