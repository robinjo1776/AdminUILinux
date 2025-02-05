function ViewMailingAddress({ formCarrier }) {
  return (
    <fieldset>
      <legend>Mailing Address</legend>

      <div className="form-group">
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            width: '100%',
          }}
          htmlFor="mailingAddressSame"
        >
          Same as Primary Address
        </label>
        <span>{formCarrier.sameAsPrimary ? 'Yes' : 'No'}</span>
      </div>

      {/* Only show the mailing address form if sameAsPrimary is false */}
      {!formCarrier.sameAsPrimary && (
        <>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressStreet">Street</label>
              <span>{formCarrier.mailing_address}</span>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressCity">City</label>
              <span>{formCarrier.mailing_city}</span>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressState">State</label>
              <span>{formCarrier.mailing_state}</span>
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressCountry">Country</label>
              <span>{formCarrier.mailing_country}</span>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressPostalCode">Postal Code</label>
              <span>{formCarrier.mailing_postal}</span>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressUnitNo">Phone</label>
              <span>{formCarrier.mailing_phone}</span>
            </div>
          </div>
        </>
      )}
    </fieldset>
  );
}

export default ViewMailingAddress;
