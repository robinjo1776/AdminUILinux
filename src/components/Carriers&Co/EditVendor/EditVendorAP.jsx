function EditVendorAP({ formVendor, setFormVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Account Payable Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">Name</label>
          <input type="text" value={formVendor.ap_name} onChange={(e) => setFormVendor({ ...formVendor, ap_name: e.target.value })} id="legalName" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Email</label>
          <input
            type="text"
            value={formVendor.ap_email}
            onChange={(e) => setFormVendor({ ...formVendor, ap_email: e.target.value })}
            id="remitName"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Contact No</label>
          <input
            type="text"
            value={formVendor.ap_contact_no}
            onChange={(e) => setFormVendor({ ...formVendor, ap_contact_no: e.target.value })}
            id="accNo"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Ext</label>
          <input type="text" value={formVendor.ap_ext} onChange={(e) => setFormVendor({ ...formVendor, ap_ext: e.target.value })} id="accNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditVendorAP;
