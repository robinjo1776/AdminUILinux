import { FC, useState } from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface VendorLiabilityInsuranceProps {
  vendor: Vendor;
  setVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

const VendorLiabilityInsurance: FC<VendorLiabilityInsuranceProps> = ({ vendor, setVendor }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndSetVendor = (field: keyof Vendor, value: string) => {
    let errorMessage = '';

    value = value.trim();

    // Validation rules
    if (field === 'liab_company' && value && !/^[a-zA-Z0-9\s.,&'-]+$/.test(value)) {
      errorMessage = 'Invalid characters in provider name.';
    }

    if (field === 'liab_policy_start' || field === 'liab_policy_end') {
      const startDate = new Date(vendor.liab_policy_start);
      const endDate = new Date(value);

      if (field === 'liab_policy_end' && startDate && endDate < startDate) {
        errorMessage = 'End date cannot be before start date.';
      }
    }

    if (field === 'liab_ins_amt' && value && (isNaN(Number(value)) || Number(value) < 0)) {
      errorMessage = 'Coverage amount must be a positive number.';
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));

    if (!errorMessage) {
      setVendor((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <fieldset className="form-section">
      <legend>Liability Insurance Details</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liProvider">Liability Insurance Provider</label>
          <input
            type="text"
            id="liProvider"
            placeholder="Liability Insurance Provider"
            value={vendor.liab_company || ''}
            onChange={(e) => validateAndSetVendor('liab_company', e.target.value)}
          />
          {errors.liab_company && <span className="error">{errors.liab_company}</span>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liStartDate">Start Date</label>
          <input
            type="date"
            id="liStartDate"
            value={vendor.liab_policy_start || ''}
            onChange={(e) => validateAndSetVendor('liab_policy_start', e.target.value)}
          />
          {errors.liab_policy_start && <span className="error">{errors.liab_policy_start}</span>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liEndDate">End Date</label>
          <input
            type="date"
            id="liEndDate"
            value={vendor.liab_policy_end || ''}
            onChange={(e) => validateAndSetVendor('liab_policy_end', e.target.value)}
          />
          {errors.liab_policy_end && <span className="error">{errors.liab_policy_end}</span>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liCoverage">Coverage Amount</label>
          <input
            type="number"
            id="liCoverage"
            placeholder="Coverage Amount"
            value={vendor.liab_ins_amt || ''}
            onChange={(e) => validateAndSetVendor('liab_ins_amt', e.target.value)}
          />
          {errors.liab_ins_amt && <span className="error">{errors.liab_ins_amt}</span>}
        </div>
      </div>
    </fieldset>
  );
};

export default VendorLiabilityInsurance;
