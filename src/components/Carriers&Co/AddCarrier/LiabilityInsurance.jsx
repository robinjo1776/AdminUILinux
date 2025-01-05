function LiabilityInsurance({ carrier, setCarrier }) {
  return (
    <fieldset className="form-section">
      <legend>Liability Insurance Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="liProvider">Liability Insurance Provider</label>
          <input
            type="text"
            value={carrier.li_provider}
            onChange={(e) =>
              setCarrier({ ...carrier, li_provider: e.target.value })
            }
            id="liProvider"
          />
        </div>
        <div className="form-group">
          <label htmlFor="liPolicyNo">Policy Number</label>
          <input
            type="text"
            value={carrier.li_policy_no}
            onChange={(e) =>
              setCarrier({ ...carrier, li_policy_no: e.target.value })
            }
            id="liPolicyNo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="liCoverage">Coverage Amount</label>
          <input
            type="number"
            value={carrier.li_coverage}
            onChange={(e) =>
              setCarrier({ ...carrier, li_coverage: e.target.value })
            }
            id="liCoverage"
          />
        </div>
        <div className="form-group">
          <label htmlFor="liStartDate">Start Date</label>
          <input
            type="date"
            value={carrier.li_start_date}
            onChange={(e) =>
              setCarrier({ ...carrier, li_start_date: e.target.value })
            }
            id="liStartDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="liEndDate">End Date</label>
          <input
            type="date"
            value={carrier.li_end_date}
            onChange={(e) =>
              setCarrier({ ...carrier, li_end_date: e.target.value })
            }
            id="liEndDate"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default LiabilityInsurance;
