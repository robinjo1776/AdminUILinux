function LiabilityInsurance({ carrier, setCarrier }) {
  return (
    <fieldset className="form-section">
      <legend>Liability Insurance Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liProvider">Liability Insurance Provider</label>
          <input
            type="text"
            value={carrier.li_provider}
            onChange={(e) => setCarrier({ ...carrier, li_provider: e.target.value })}
            id="liProvider"
            placeholder="Liability Insurance Provider"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liPolicyNo">Policy Number</label>
          <input
            type="text"
            value={carrier.li_policy_no}
            onChange={(e) => setCarrier({ ...carrier, li_policy_no: e.target.value })}
            id="liPolicyNo"
            placeholder="Policy Number"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liCoverage">Coverage Amount</label>
          <input
            type="number"
            value={carrier.li_coverage}
            onChange={(e) => setCarrier({ ...carrier, li_coverage: e.target.value })}
            id="liCoverage"
            placeholder="Coverage Amount"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liStartDate">Start Date</label>
          <input
            type="date"
            value={carrier.li_start_date}
            onChange={(e) => setCarrier({ ...carrier, li_start_date: e.target.value })}
            id="liStartDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liEndDate">End Date</label>
          <input type="date" value={carrier.li_end_date} onChange={(e) => setCarrier({ ...carrier, li_end_date: e.target.value })} id="liEndDate" />
        </div>
      </div>
    </fieldset>
  );
}

export default LiabilityInsurance;
