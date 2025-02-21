import { FC, useState } from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface VendorAPProps {
  vendor: Vendor;
  setVendor: (vendor: Vendor) => void;
}

const VendorAP: FC<VendorAPProps> = ({ vendor, setVendor }) => {
  const [errors, setErrors] = useState<{ apName?: string; apEmail?: string; apContactNo?: string; apExt?: string }>({});

  const validateAndSetVendor = (field: keyof Vendor, value: string) => {
    let error = '';
    let sanitizedValue = value.trim();

    switch (field) {
      case 'ap_name':
        sanitizedValue = sanitizedValue.replace(/[^a-zA-Z\s]/g, ''); // Remove non-alphabetic chars
        if (sanitizedValue.length < 2 || sanitizedValue.length > 50) {
          error = 'Name must be between 2 and 50 alphabetic characters';
        }
        break;
      case 'ap_email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedValue)) {
          error = 'Invalid email format';
        }
        break;
      case 'ap_contact_no':
        sanitizedValue = sanitizedValue.replace(/\D/g, ''); // Keep only numbers
        if (sanitizedValue.length < 7) error = 'Contact number must be at least 7 digits';
        break;
      case 'ap_ext':
        sanitizedValue = sanitizedValue.replace(/\D/g, ''); // Keep only numbers
        if (sanitizedValue && isNaN(Number(sanitizedValue))) error = 'Extension must be numeric';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    setVendor({ ...vendor, [field]: sanitizedValue });
  };

  return (
    <fieldset className="form-section">
      <legend>Account Payable Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {/* Name */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="apName">Name</label>
          <input
            type="text"
            value={vendor.ap_name}
            onChange={(e) => validateAndSetVendor('ap_name', e.target.value)}
            id="apName"
            placeholder="Name"
          />
          {errors.apName && <small className="error">{errors.apName}</small>}
        </div>

        {/* Email */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="apEmail">Email</label>
          <input
            type="text"
            value={vendor.ap_email}
            onChange={(e) => validateAndSetVendor('ap_email', e.target.value)}
            id="apEmail"
            placeholder="Email"
          />
          {errors.apEmail && <small className="error">{errors.apEmail}</small>}
        </div>

        {/* Contact No */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="apContactNo">Contact No</label>
          <input
            type="text"
            value={vendor.ap_contact_no}
            onChange={(e) => validateAndSetVendor('ap_contact_no', e.target.value)}
            id="apContactNo"
            placeholder="Contact No"
          />
          {errors.apContactNo && <small className="error">{errors.apContactNo}</small>}
        </div>

        {/* Extension */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="apExt">Ext</label>
          <input type="text" value={vendor.ap_ext} onChange={(e) => validateAndSetVendor('ap_ext', e.target.value)} id="apExt" placeholder="Ext" />
          {errors.apExt && <small className="error">{errors.apExt}</small>}
        </div>
      </div>
    </fieldset>
  );
};

export default VendorAP;
