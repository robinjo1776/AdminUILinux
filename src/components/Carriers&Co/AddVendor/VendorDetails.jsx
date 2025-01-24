function VendorDetails({ vendor, setVendor }) {
  return (
    <fieldset className="form-section">
      <legend>Vendor Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">Legal Name</label>
          <input
            type="text"
            value={vendor.legal_name}
            onChange={(e) => setVendor({ ...vendor, legal_name: e.target.value })}
            id="legalName"
            placeholder="Legal Name"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Remit Name</label>
          <input
            type="text"
            value={vendor.remit_name}
            onChange={(e) => setVendor({ ...vendor, remit_name: e.target.value })}
            id="remitName"
            placeholder="Remit Name"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Vendor Type</label>
          <input
            type="text"
            value={vendor.vendor_type}
            onChange={(e) => setVendor({ ...vendor, vendor_type: e.target.value })}
            id="accNo"
            placeholder="Vendor Type"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="wcbNo">Service</label>
          <input
            type="text"
            value={vendor.service}
            onChange={(e) => setVendor({ ...vendor, service: e.target.value })}
            id="wcbNo"
            placeholder="Service"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">SCAC</label>
          <input type="text" value={vendor.scac} onChange={(e) => setVendor({ ...vendor, scac: e.target.value })} id="legalName" placeholder="SCAC" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Docket#</label>
          <input
            type="text"
            value={vendor.docket_number}
            onChange={(e) => setVendor({ ...vendor, docket_number: e.target.value })}
            id="remitName"
            placeholder="Docket#"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Vendor Code</label>
          <input
            type="text"
            value={vendor.vendor_code}
            onChange={(e) => setVendor({ ...vendor, vendor_code: e.target.value })}
            id="accNo"
            placeholder="Vendor Code"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">GST/HST#</label>
          <input
            type="text"
            value={vendor.gst_hst_number}
            onChange={(e) => setVendor({ ...vendor, gst_hst_number: e.target.value })}
            id="legalName"
            placeholder="GST/HST#"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">QST#</label>
          <input
            type="text"
            value={vendor.qst_number}
            onChange={(e) => setVendor({ ...vendor, qst_number: e.target.value })}
            id="remitName"
            placeholder="QST#"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">CA bond#</label>
          <input
            type="text"
            value={vendor.ca_bond_number}
            onChange={(e) => setVendor({ ...vendor, ca_bond_number: e.target.value })}
            id="accNo"
            placeholder="CA bond#"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="wcbNo">Website</label>
          <input
            type="text"
            value={vendor.website}
            onChange={(e) => setVendor({ ...vendor, website: e.target.value })}
            id="wcbNo"
            placeholder="Website"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <input type="hidden" />
        </div>
      </div>
    </fieldset>
  );
}

export default VendorDetails;
