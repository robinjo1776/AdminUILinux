function ViewGeneral({ formCarrier }) {
  const currencyOptions = ['CAD', 'USD'];
  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="dba">DBA</label>
          <span>{formCarrier.dba}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">Legal Name</label>
          <span>{formCarrier.legal_name}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Remit Name</label>
          <span>{formCarrier.remit_name}</span>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Account Number</label>
          <span>{formCarrier.acc_no}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="branch">Branch</label>
          <span>{formCarrier.branch}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="website">Website</label>
          <span>{formCarrier.website}</span>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="fedIdNo">Federal ID Number</label>
          <span>{formCarrier.fed_id_no}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="creditStatus">Preferred Currency</label>
          <span>{formCarrier.pref_curr}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="payTerms">Payment Terms</label>
          <span>{formCarrier.pay_terms}</span>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', width: '100%' }}>
            1099
            <span>{formCarrier.form_1099 ? 'Yes' : 'No'}</span>
          </label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', width: '100%' }}>
            Advertise
            <span>{formCarrier.advertise ? 'Yes' : 'No'}</span>
          </label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="advertiseEmail">Advertise Email</label>
          <span>{formCarrier.advertise_email}</span>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewGeneral;
