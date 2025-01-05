function EditVendorDetails({ formVendor, setFormVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Vendor Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="legalName">Legal Name</label>
          <input
            type="text"
            value={formVendor.legal_name}
            onChange={(e) => setFormVendor({ ...formVendor, legal_name: e.target.value })}
            id="legalName"
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Remit Name</label>
          <input
            type="text"
            value={formVendor.remit_name}
            onChange={(e) => setFormVendor({ ...formVendor, remit_name: e.target.value })}
            id="remitName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Vendor Type</label>
          <input
            type="text"
            value={formVendor.vendor_type}
            onChange={(e) => setFormVendor({ ...formVendor, vendor_type: e.target.value })}
            id="accNo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="wcbNo">Service</label>
          <input type="text" value={formVendor.service} onChange={(e) => setFormVendor({ ...formVendor, service: e.target.value })} id="wcbNo" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="legalName">SCAC</label>
          <input type="text" value={formVendor.scac} onChange={(e) => setFormVendor({ ...formVendor, scac: e.target.value })} id="legalName" />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Docket#</label>
          <input
            type="text"
            value={formVendor.docket_number}
            onChange={(e) => setFormVendor({ ...formVendor, docket_number: e.target.value })}
            id="remitName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Vendor Code</label>
          <input
            type="text"
            value={formVendor.vendor_code}
            onChange={(e) => setFormVendor({ ...formVendor, vendor_code: e.target.value })}
            id="accNo"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="legalName">GST/HST#</label>
          <input
            type="text"
            value={formVendor.gst_hst_number}
            onChange={(e) => setFormVendor({ ...formVendor, gst_hst_number: e.target.value })}
            id="legalName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">QST#</label>
          <input
            type="text"
            value={formVendor.qst_number}
            onChange={(e) => setFormVendor({ ...formVendor, qst_number: e.target.value })}
            id="remitName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">CA bond#</label>
          <input
            type="text"
            value={formVendor.ca_bond_number}
            onChange={(e) => setFormVendor({ ...formVendor, ca_bond_number: e.target.value })}
            id="accNo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="wcbNo">Website</label>
          <input type="text" value={formVendor.website} onChange={(e) => setFormVendor({ ...formVendor, website: e.target.value })} id="wcbNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditVendorDetails;
