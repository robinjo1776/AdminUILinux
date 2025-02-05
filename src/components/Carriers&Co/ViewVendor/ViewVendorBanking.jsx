import { useEffect, useRef } from 'react';

function ViewVendorBanking({ formVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Bank Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Name</label>
          <p>{formVendor.bank_name || 'N/A'}</p>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Phone</label>
          <p>{formVendor.bank_phone || 'N/A'}</p>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Email</label>
          <p>{formVendor.bank_email || 'N/A'}</p>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>US Account No</label>
          <p>{formVendor.bank_us_acc_no || 'N/A'}</p>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Canadian Account No</label>
          <p>{formVendor.bank_cdn_acc_no || 'N/A'}</p>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Address</label>
          <p>{formVendor.bank_address || 'N/A'}</p>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewVendorBanking;
