import { useState } from 'react';
import { Carrier } from '../../../types/CarrierTypes';
import DOMPurify from 'dompurify';
import { z } from 'zod';

interface InternalNotesProps {
  carrier: Carrier;
  setCarrier: React.Dispatch<React.SetStateAction<Carrier>>;
}

const carrierSchema = z.object({
  int_notes: z
    .string()
    .max(500, 'Internal notes cannot exceed 500 characters')
    .regex(/^[a-zA-Z0-9\s.,'-]*$/, 'Only letters, numbers, spaces, apostrophes, periods, commas, and hyphens allowed')
    .optional(),
});

const InternalNotes: React.FC<InternalNotesProps> = ({ carrier, setCarrier }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndSetCarrier = (field: keyof Carrier, value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    let error = '';

    const tempCarrier = { ...carrier, [field]: sanitizedValue };
    const result = carrierSchema.safeParse(tempCarrier);

    if (!result.success) {
      const fieldError = result.error.errors.find((err) => err.path[0] === field);
      error = fieldError ? fieldError.message : '';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    setCarrier(tempCarrier);
  };

  const fields = [{ key: 'int_notes', label: 'Notes', placeholder: 'Enter notes' }];

  return (
    <fieldset className="form-section">
      <legend>Internal Notes</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {fields.map(({ label, key, placeholder }) => (
          <div className="form-group" style={{ flex: 1 }} key={key}>
            <label htmlFor={key}>{label}</label>
            <textarea
              id={key}
              value={
                typeof carrier[key as keyof Carrier] === 'string' || typeof carrier[key as keyof Carrier] === 'number'
                  ? carrier[key as keyof Carrier].toString()
                  : ''
              }
              onChange={(e) => validateAndSetCarrier(key as keyof Carrier, e.target.value)}
              placeholder={placeholder}
              rows={5}
              style={{ resize: 'vertical' }}
            />
            {errors[key] && (
              <span className="error" style={{ color: 'red' }}>
                {errors[key]}
              </span>
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default InternalNotes;
