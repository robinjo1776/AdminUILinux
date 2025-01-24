function VendorAR({ vendor, setVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Account Receivable Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">Name</label>
          <input
            type="text"
            value={vendor.ar_name}
            onChange={(e) => setVendor({ ...vendor, ar_name: e.target.value })}
            id="legalName"
            placeholder="Name"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Email</label>
          <input
            type="text"
            value={vendor.ar_email}
            onChange={(e) => setVendor({ ...vendor, ar_email: e.target.value })}
            id="remitName"
            placeholder="Email"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Contact No</label>
          <input
            type="text"
            value={vendor.ar_contact_no}
            onChange={(e) => setVendor({ ...vendor, ar_contact_no: e.target.value })}
            id="accNo"
            placeholder="Contact No"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Ext</label>
          <input type="text" value={vendor.ar_ext} onChange={(e) => setVendor({ ...vendor, ar_ext: e.target.value })} id="accNo" placeholder="Ext" />
        </div>
      </div>
    </fieldset>
  );
}

export default VendorAR;
