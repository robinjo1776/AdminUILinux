function VendorAP({ vendor, setVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Account Payable Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">Name</label>
          <input
            type="text"
            value={vendor.ap_name}
            onChange={(e) => setVendor({ ...vendor, ap_name: e.target.value })}
            id="legalName"
            placeholder="Name"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Email</label>
          <input
            type="text"
            value={vendor.ap_email}
            onChange={(e) => setVendor({ ...vendor, ap_email: e.target.value })}
            id="remitName"
            placeholder="Email"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Contact No</label>
          <input
            type="text"
            value={vendor.ap_contact_no}
            onChange={(e) => setVendor({ ...vendor, ap_contact_no: e.target.value })}
            id="accNo"
            placeholder="Contact No"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Ext</label>
          <input type="text" value={vendor.ap_ext} onChange={(e) => setVendor({ ...vendor, ap_ext: e.target.value })} id="accNo" placeholder="Ext" />
        </div>
      </div>
    </fieldset>
  );
}

export default VendorAP;
