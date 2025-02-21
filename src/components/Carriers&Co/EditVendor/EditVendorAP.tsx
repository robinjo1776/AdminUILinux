import React from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface EditVendorAPProps {
  formVendor: Vendor;
  setFormVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

// Sanitization functions
const sanitizeName = (value: string) => value.replace(/[^a-zA-Z\s-]/g, ''); // Only letters, spaces, and dashes
const sanitizeEmail = (value: string) => value.replace(/[^\w@.-]/g, ''); // Removes invalid email characters
const sanitizeNumber = (value: string) => value.replace(/\D/g, ''); // Removes non-numeric characters

const EditVendorAP: React.FC<EditVendorAPProps> = ({ formVendor, setFormVendor }) => {
  return (
    <fieldset className="form-section">
      <legend>Account Payable Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {/* AP Name */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="apName">Name</label>
          <input
            type="text"
            id="apName"
            value={formVendor.ap_name ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeName(e.target.value);
              setFormVendor((prev) => ({ ...prev, ap_name: sanitizedValue }));
            }}
            maxLength={50}
            required
          />
        </div>

        {/* AP Email */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="apEmail">Email</label>
          <input
            type="email"
            id="apEmail"
            value={formVendor.ap_email ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeEmail(e.target.value);
              setFormVendor((prev) => ({ ...prev, ap_email: sanitizedValue }));
            }}
            maxLength={100}
            required
          />
        </div>

        {/* AP Contact Number */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="apContact">Contact No</label>
          <input
            type="tel"
            id="apContact"
            value={formVendor.ap_contact_no ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeNumber(e.target.value);
              setFormVendor((prev) => ({ ...prev, ap_contact_no: sanitizedValue }));
            }}
            maxLength={15}
            pattern="\d{10,15}"
            title="Enter a valid contact number"
            required
          />
        </div>

        {/* AP Extension */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="apExt">Ext</label>
          <input
            type="text"
            id="apExt"
            value={formVendor.ap_ext ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeNumber(e.target.value);
              setFormVendor((prev) => ({ ...prev, ap_ext: sanitizedValue }));
            }}
            maxLength={5}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default EditVendorAP;
