import { FC, useState } from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface VendorCargoInsuranceProps {
  vendor: Vendor;
  setVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

const VendorCargoInsurance: FC<VendorCargoInsuranceProps> = ({ vendor, setVendor }) => {
  const [errors, setErrors] = useState({
    cargo_company: '',
    cargo_policy_start: '',
    cargo_policy_end: '',
    cargo_ins_amt: '',
  });

  const validateAndSetVendor = (field: keyof Vendor, value: string | number) => {
    let errorMessage = '';

    // Sanitize inputs
    if (typeof value === 'string') value = value.trim();

    // Validation rules
    if (field === 'cargo_company' && !value) errorMessage = 'Cargo insurance provider is required.';
    if (field === 'cargo_policy_start' && !value) errorMessage = 'Start date is required.';
    if (field === 'cargo_policy_end' && !value) errorMessage = 'End date is required.';
    if (field === 'cargo_ins_amt') {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 0) errorMessage = 'Coverage amount must be a valid number and at least 0.';
    }

    // Ensure start date is before end date
    if (field === 'cargo_policy_start' || field === 'cargo_policy_end') {
      const startDate = new Date(field === 'cargo_policy_start' ? value : vendor.cargo_policy_start);
      const endDate = new Date(field === 'cargo_policy_end' ? value : vendor.cargo_policy_end);

      if (startDate > endDate) errorMessage = 'Start date cannot be after end date.';
    }

    // Update state
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    if (!errorMessage) setVendor((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <fieldset className="form-section">
      <legend>Cargo Insurance Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciProvider">Cargo Insurance Provider</label>
          <input
            type="text"
            id="ciProvider"
            placeholder="Cargo Insurance Provider"
            value={vendor.cargo_company}
            onChange={(e) => validateAndSetVendor('cargo_company', e.target.value)}
          />
          {errors.cargo_company && <span className="error">{errors.cargo_company}</span>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciStartDate">Start Date</label>
          <input
            type="date"
            id="ciStartDate"
            value={vendor.cargo_policy_start}
            onChange={(e) => validateAndSetVendor('cargo_policy_start', e.target.value)}
          />
          {errors.cargo_policy_start && <span className="error">{errors.cargo_policy_start}</span>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciEndDate">End Date</label>
          <input
            type="date"
            id="ciEndDate"
            value={vendor.cargo_policy_end}
            onChange={(e) => validateAndSetVendor('cargo_policy_end', e.target.value)}
          />
          {errors.cargo_policy_end && <span className="error">{errors.cargo_policy_end}</span>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciCoverage">Coverage Amount</label>
          <input
            type="number"
            id="ciCoverage"
            placeholder="Coverage Amount"
            value={vendor.cargo_ins_amt}
            onChange={(e) => validateAndSetVendor('cargo_ins_amt', Number(e.target.value))}
          />
          {errors.cargo_ins_amt && <span className="error">{errors.cargo_ins_amt}</span>}
        </div>
      </div>
    </fieldset>
  );
};

export default VendorCargoInsurance;
