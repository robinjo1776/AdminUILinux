import React from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface EditVendorARProps {
  formVendor: Vendor;
  setFormVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

// Sanitization functions
const sanitizeName = (value: string) => value.replace(/[^a-zA-Z\s-]/g, ''); // Only letters, spaces, and dashes
const sanitizeEmail = (value: string) => value.replace(/[^\w@.-]/g, ''); // Removes invalid email characters
const sanitizeNumber = (value: string) => value.replace(/\D/g, ''); // Removes non-numeric characters

const EditVendorAR: React.FC<EditVendorARProps> = ({ formVendor, setFormVendor }) => {
  return (
    <fieldset className="form-section">
      <legend>Account Receivable Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {/* AR Name */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="arName">Name</label>
          <input
            type="text"
            id="arName"
            value={formVendor.ar_name ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeName(e.target.value);
              setFormVendor((prev) => ({ ...prev, ar_name: sanitizedValue }));
            }}
            maxLength={50}
            required
          />
        </div>

        {/* AR Email */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="arEmail">Email</label>
          <input
            type="email"
            id="arEmail"
            value={formVendor.ar_email ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeEmail(e.target.value);
              setFormVendor((prev) => ({ ...prev, ar_email: sanitizedValue }));
            }}
            maxLength={100}
            required
          />
        </div>

        {/* AR Contact Number */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="arContact">Contact No</label>
          <input
            type="tel"
            id="arContact"
            value={formVendor.ar_contact_no ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeNumber(e.target.value);
              setFormVendor((prev) => ({ ...prev, ar_contact_no: sanitizedValue }));
            }}
            maxLength={15}
            pattern="\d{10,15}"
            title="Enter a valid contact number"
            required
          />
        </div>

        {/* AR Extension */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="arExt">Ext</label>
          <input
            type="text"
            id="arExt"
            value={formVendor.ar_ext ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeNumber(e.target.value);
              setFormVendor((prev) => ({ ...prev, ar_ext: sanitizedValue }));
            }}
            maxLength={5}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default EditVendorAR;
