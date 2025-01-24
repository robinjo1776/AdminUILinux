function EditLiabilityInsurance({ formCarrier, setformCarrier }) {
  return (
    <fieldset className="form-section">
      <legend>Liability Insurance Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liProvider">Liability Insurance Provider</label>
          <input
            type="text"
            value={formCarrier.li_provider}
            onChange={(e) => setformCarrier({ ...formCarrier, li_provider: e.target.value })}
            id="liProvider"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liPolicyNo">Policy Number</label>
          <input
            type="text"
            value={formCarrier.li_policy_no}
            onChange={(e) => setformCarrier({ ...formCarrier, li_policy_no: e.target.value })}
            id="liPolicyNo"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liCoverage">Coverage Amount</label>
          <input
            type="number"
            value={formCarrier.li_coverage}
            onChange={(e) => setformCarrier({ ...formCarrier, li_coverage: e.target.value })}
            id="liCoverage"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liStartDate">Start Date</label>
          <input
            type="date"
            value={formCarrier.li_start_date}
            onChange={(e) => setformCarrier({ ...formCarrier, li_start_date: e.target.value })}
            id="liStartDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liEndDate">End Date</label>
          <input
            type="date"
            value={formCarrier.li_end_date}
            onChange={(e) => setformCarrier({ ...formCarrier, li_end_date: e.target.value })}
            id="liEndDate"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditLiabilityInsurance;
