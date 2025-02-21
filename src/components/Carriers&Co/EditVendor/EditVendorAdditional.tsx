import React from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface EditVendorAdditionalProps {
  formVendor: Vendor;
  setFormVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

const sanitizeInput = (value: string) => {
  return value.replace(/[^a-zA-Z0-9\s-]/g, ''); // Allows alphanumeric, spaces, and dashes only
};

const EditVendorAdditional: React.FC<EditVendorAdditionalProps> = ({ formVendor, setFormVendor }) => {
  return (
    <fieldset className="form-section">
      <legend>Additional Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {/* US Tax ID */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="usTaxId">US Tax ID</label>
          <input
            type="text"
            id="usTaxId"
            value={formVendor.us_tax_id ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeInput(e.target.value);
              setFormVendor((prev) => ({ ...prev, us_tax_id: sanitizedValue }));
            }}
            maxLength={20} // Prevents overly long input
            required
          />
        </div>

        {/* Payroll Number */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="payrollNo">Payroll#</label>
          <input
            type="text"
            id="payrollNo"
            value={formVendor.payroll_no ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeInput(e.target.value);
              setFormVendor((prev) => ({ ...prev, payroll_no: sanitizedValue }));
            }}
            maxLength={15}
          />
        </div>

        {/* WCB Number */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="wcbNo">WCB#</label>
          <input
            type="text"
            id="wcbNo"
            value={formVendor.wcb_no ?? ''}
            onChange={(e) => {
              const sanitizedValue = sanitizeInput(e.target.value);
              setFormVendor((prev) => ({ ...prev, wcb_no: sanitizedValue }));
            }}
            maxLength={15}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default EditVendorAdditional;
