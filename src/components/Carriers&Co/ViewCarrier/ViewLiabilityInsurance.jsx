function ViewLiabilityInsurance({ formCarrier }) {
  return (
    <fieldset className="form-section">
      <legend>Liability Insurance Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liProvider">Liability Insurance Provider</label>
          <span>{formCarrier.li_provider}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liPolicyNo">Policy Number</label>
          <span>{formCarrier.li_policy_no}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liCoverage">Coverage Amount</label>
          <span>{formCarrier.li_coverage}</span>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liStartDate">Start Date</label>
          <span>{formCarrier.li_start_date}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liEndDate">End Date</label>
          <span>{formCarrier.li_end_date}</span>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewLiabilityInsurance;
