function EditVendorAR({ formVendor, setFormVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Account Receivable Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="legalName">Name</label>
          <input type="text" value={formVendor.ar_name} onChange={(e) => setFormVendor({ ...formVendor, ar_name: e.target.value })} id="legalName" />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Email</label>
          <input
            type="text"
            value={formVendor.ar_email}
            onChange={(e) => setFormVendor({ ...formVendor, ar_email: e.target.value })}
            id="remitName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Contact No</label>
          <input
            type="text"
            value={formVendor.ar_contact_no}
            onChange={(e) => setFormVendor({ ...formVendor, ar_contact_no: e.target.value })}
            id="accNo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Ext</label>
          <input type="text" value={formVendor.ar_ext} onChange={(e) => setFormVendor({ ...formVendor, ar_ext: e.target.value })} id="accNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditVendorAR;
