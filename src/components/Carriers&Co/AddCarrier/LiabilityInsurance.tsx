import React, { useState } from 'react';
import { Carrier } from '../../../types/CarrierTypes';

interface LiabilityInsuranceProps {
  carrier: Carrier;
  setCarrier: React.Dispatch<React.SetStateAction<Carrier>>;
}

const MAX_TEXT_LENGTH = 255;

const LiabilityInsurance: React.FC<LiabilityInsuranceProps> = ({ carrier, setCarrier }) => {
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  // Function to sanitize input
  const sanitizeInput = (input: string) => {
    return input.replace(/<[^>]*>/g, '').trim(); // Remove HTML tags & trim spaces
  };

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const sanitizedValue = sanitizeInput(value);

    if (sanitizedValue.length > MAX_TEXT_LENGTH) {
      setErrors((prev) => ({ ...prev, [id]: `Cannot exceed ${MAX_TEXT_LENGTH} characters.` }));
      return;
    }

    setErrors((prev) => ({ ...prev, [id]: null }));
    setCarrier((prev) => ({ ...prev, [id]: sanitizedValue }));
  };

  // Handle number input change
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const numericValue = Number(value);

    if (numericValue < 0 || isNaN(numericValue)) {
      setErrors((prev) => ({ ...prev, [id]: 'Coverage amount must be a positive number.' }));
      return;
    }

    setErrors((prev) => ({ ...prev, [id]: null }));
    setCarrier((prev) => ({ ...prev, [id]: numericValue }));
  };

  // Handle date input change (Fixed!)
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setErrors((prevErrors) => {
      const newErrors =
        id === 'li_end_date' && carrier.li_start_date && value < carrier.li_start_date
          ? { ...prevErrors, li_end_date: 'End date cannot be before start date.' }
          : { ...prevErrors, li_end_date: null };

      console.log('Updated errors:', newErrors);
      return newErrors;
    });

    setCarrier((prev) => {
      if (id === 'li_end_date' && prev.li_start_date && value < prev.li_start_date) {
        console.log('Not updating carrier due to invalid date.');
        return prev;
      }
      return { ...prev, [id]: value };
    });
  };

  return (
    <fieldset className="form-section">
      <legend>Liability Insurance Details</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="li_provider">Liability Insurance Provider</label>
          <input type="text" id="li_provider" value={carrier.li_provider} onChange={handleTextChange} placeholder="Liability Insurance Provider" />
          {errors.li_provider && <p style={{ color: 'red' }}>{errors.li_provider}</p>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="li_policy_no">Policy Number</label>
          <input type="text" id="li_policy_no" value={carrier.li_policy_no} onChange={handleTextChange} placeholder="Policy Number" />
          {errors.li_policy_no && <p style={{ color: 'red' }}>{errors.li_policy_no}</p>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="li_coverage">Coverage Amount</label>
          <input type="number" id="li_coverage" value={carrier.li_coverage} onChange={handleNumberChange} placeholder="Coverage Amount" />
          {errors.li_coverage && <p style={{ color: 'red' }}>{errors.li_coverage}</p>}
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="li_start_date">Start Date</label>
          <input type="date" id="li_start_date" value={carrier.li_start_date} onChange={handleDateChange} />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="li_end_date">End Date</label>
          <input type="date" id="li_end_date" value={carrier.li_end_date} onChange={handleDateChange} />
          {errors.li_end_date && <p style={{ color: 'red' }}>{errors.li_end_date}</p>}
        </div>
      </div>
    </fieldset>
  );
};

export default LiabilityInsurance;
