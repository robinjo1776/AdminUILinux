import { FC, useState } from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface VendorDetailsProps {
  vendor: Vendor;
  setVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

const VendorDetails: FC<VendorDetailsProps> = ({ vendor, setVendor }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndSetVendor = (field: keyof Vendor, value: string) => {
    let errorMessage = '';

    value = value.trim();

    if (field === 'website' && value && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
      errorMessage = 'Invalid website URL.';
    }

    if (['scac', 'gst_hst_number', 'qst_number', 'docket_number', 'ca_bond_number'].includes(field)) {
      if (value && !/^[a-zA-Z0-9-]+$/.test(value)) {
        errorMessage = 'Only letters, numbers, and dashes allowed.';
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));

    if (!errorMessage) {
      setVendor((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <fieldset className="form-section">
      <legend>Vendor Details</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {[
          { label: 'Legal Name', id: 'legalName', field: 'legal_name' as keyof Vendor },
          { label: 'Remit Name', id: 'remitName', field: 'remit_name' as keyof Vendor },
          { label: 'Vendor Type', id: 'vendorType', field: 'vendor_type' as keyof Vendor },
        ].map(({ label, id, field }) => (
          <div className="form-group" style={{ flex: 1 }} key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              type="text"
              id={id}
              placeholder={label}
              value={typeof vendor[field] === 'string' || typeof vendor[field] === 'number' ? vendor[field] : ''}
              onChange={(e) => validateAndSetVendor(field as keyof Vendor, e.target.value)}
            />

            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        {[
          { label: 'Service', id: 'service', field: 'service' },
          { label: 'SCAC', id: 'scac', field: 'scac' },
          { label: 'Docket#', id: 'docketNumber', field: 'docket_number' },
        ].map(({ label, id, field }) => (
          <div className="form-group" style={{ flex: 1 }} key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              type="text"
              id={id}
              placeholder={label}
              value={(vendor[field as keyof Vendor] as string | number) || ''}
              onChange={(e) => validateAndSetVendor(field as keyof Vendor, e.target.value)}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        {[
          { label: 'Vendor Code', id: 'vendorCode', field: 'vendor_code' },
          { label: 'GST/HST#', id: 'gstHstNumber', field: 'gst_hst_number' },
          { label: 'QST#', id: 'qstNumber', field: 'qst_number' },
        ].map(({ label, id, field }) => (
          <div className="form-group" style={{ flex: 1 }} key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              type="text"
              id={id}
              placeholder={label}
              value={(vendor[field as keyof Vendor] as string | number) || ''}
              onChange={(e) => validateAndSetVendor(field as keyof Vendor, e.target.value)}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        {[
          { label: 'CA Bond#', id: 'caBondNumber', field: 'ca_bond_number' },
          { label: 'Website', id: 'website', field: 'website' },
        ].map(({ label, id, field }) => (
          <div className="form-group" style={{ flex: 1 }} key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              type="text"
              id={id}
              placeholder={label}
              value={(vendor[field as keyof Vendor] as string | number) || ''}
              onChange={(e) => validateAndSetVendor(field as keyof Vendor, e.target.value)}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
        <div className="form-group" style={{ flex: 1 }}>
          <input type="hidden" />
        </div>
      </div>
    </fieldset>
  );
};

export default VendorDetails;
