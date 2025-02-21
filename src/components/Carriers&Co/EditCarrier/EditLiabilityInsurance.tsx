import React from 'react';
import { Carrier } from '../../../types/CarrierTypes';

interface EditLiabilityInsuranceProps {
  formCarrier: Carrier;
  setFormCarrier: (carrier: Carrier) => void;
}

const EditLiabilityInsurance: React.FC<EditLiabilityInsuranceProps> = ({ formCarrier, setFormCarrier }) => {
  const handleInputChange = (field: keyof Carrier, value: string) => {
    setFormCarrier({ ...formCarrier, [field]: value.trim() });
  };

  const handleNumberChange = (field: keyof Carrier, value: string) => {
    const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
    setFormCarrier({ ...formCarrier, [field]: numericValue });
  };

  const handleCoverageChange = (value: string) => {
    const amount = parseFloat(value);
    setFormCarrier({ ...formCarrier, li_coverage: isNaN(amount) || amount < 0 ? 0 : amount });
  };

  const handleDateChange = (field: 'li_start_date' | 'li_end_date', value: string) => {
    if (field === 'li_end_date' && formCarrier.li_start_date && value < formCarrier.li_start_date) {
      alert('End date cannot be before start date.');
      return;
    }
    setFormCarrier({ ...formCarrier, [field]: value });
  };

  return (
    <fieldset className="form-section">
      <legend>Liability Insurance Details</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liProvider">Liability Insurance Provider</label>
          <input
            type="text"
            value={formCarrier.li_provider || ''}
            onChange={(e) => handleInputChange('li_provider', e.target.value)}
            id="liProvider"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liPolicyNo">Policy Number</label>
          <input
            type="text"
            value={formCarrier.li_policy_no || ''}
            onChange={(e) => handleInputChange('li_policy_no', e.target.value)}
            id="liPolicyNo"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liCoverage">Coverage Amount</label>
          <input type="number" min="0" value={formCarrier.li_coverage || ''} onChange={(e) => handleCoverageChange(e.target.value)} id="liCoverage" />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liStartDate">Start Date</label>
          <input
            type="date"
            value={formCarrier.li_start_date || ''}
            onChange={(e) => handleDateChange('li_start_date', e.target.value)}
            id="liStartDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="liEndDate">End Date</label>
          <input type="date" value={formCarrier.li_end_date || ''} onChange={(e) => handleDateChange('li_end_date', e.target.value)} id="liEndDate" />
        </div>
      </div>
    </fieldset>
  );
};

export default EditLiabilityInsurance;
