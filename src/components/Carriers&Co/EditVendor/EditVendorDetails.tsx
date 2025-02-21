import React from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface EditVendorDetailsProps {
  formVendor: Vendor;
  setFormVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

const sanitizeInput = (value: string) => {
  return value.replace(/[^a-zA-Z0-9 \-.,]/g, '');
};

const EditVendorDetails: React.FC<EditVendorDetailsProps> = ({ formVendor, setFormVendor }) => {
  const handleChange = (field: keyof Vendor) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    setFormVendor({ ...formVendor, [field]: sanitizedValue });
  };

  return (
    <fieldset className="form-section">
      <legend>Vendor Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">Legal Name</label>
          <input type="text" value={formVendor.legal_name} onChange={handleChange('legal_name')} id="legalName" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Remit Name</label>
          <input type="text" value={formVendor.remit_name} onChange={handleChange('remit_name')} id="remitName" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="vendorType">Vendor Type</label>
          <input type="text" value={formVendor.vendor_type} onChange={handleChange('vendor_type')} id="vendorType" />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="service">Service</label>
          <input type="text" value={formVendor.service} onChange={handleChange('service')} id="service" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="scac">SCAC</label>
          <input type="text" value={formVendor.scac} onChange={handleChange('scac')} id="scac" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="docketNumber">Docket#</label>
          <input type="text" value={formVendor.docket_number} onChange={handleChange('docket_number')} id="docketNumber" />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="vendorCode">Vendor Code</label>
          <input type="text" value={formVendor.vendor_code} onChange={handleChange('vendor_code')} id="vendorCode" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="gstHstNumber">GST/HST#</label>
          <input type="text" value={formVendor.gst_hst_number} onChange={handleChange('gst_hst_number')} id="gstHstNumber" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="qstNumber">QST#</label>
          <input type="text" value={formVendor.qst_number} onChange={handleChange('qst_number')} id="qstNumber" />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="caBondNumber">CA bond#</label>
          <input type="text" value={formVendor.ca_bond_number} onChange={handleChange('ca_bond_number')} id="caBondNumber" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="website">Website</label>
          <input type="text" value={formVendor.website} onChange={handleChange('website')} id="website" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <input type="hidden" />
        </div>
      </div>
    </fieldset>
  );
};

export default EditVendorDetails;
