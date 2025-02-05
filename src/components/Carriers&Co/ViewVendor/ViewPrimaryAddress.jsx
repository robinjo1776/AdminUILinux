function ViewPrimaryAddress({ formCarrier }) {
  return (
    <fieldset>
      <legend>Primary Address</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressStreet">Street</label>
          <span>{formCarrier.primary_address}</span>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCity">City</label>
          <span>{formCarrier.primary_city}</span>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressState">State</label>
          <span>{formCarrier.primary_state}</span>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCountry">Country</label>
          <span>{formCarrier.primary_country}</span>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressPostalCode">Postal Code</label>
          <span>{formCarrier.primary_postal}</span>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressUnitNo">Phone</label>
          <span>{formCarrier.primary_phone}</span>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewPrimaryAddress;
