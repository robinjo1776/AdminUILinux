import React, { useState } from 'react';
import { Carrier } from '../../../types/CarrierTypes';

// Define component props
interface EditInternalNotesProps {
  formCarrier: Carrier;
  setFormCarrier: (carrier: Carrier) => void;
}

const MAX_CHAR_LIMIT = 1000;

const EditInternalNotes: React.FC<EditInternalNotesProps> = ({ formCarrier, setFormCarrier }) => {
  const [error, setError] = useState<string | null>(null);

  // Function to sanitize input
  const sanitizeInput = (input: string) => {
    return input.replace(/<[^>]*>/g, '').trim(); // Removes HTML tags & trims spaces
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitizedValue = sanitizeInput(e.target.value);

    if (sanitizedValue.length > MAX_CHAR_LIMIT) {
      setError(`Notes cannot exceed ${MAX_CHAR_LIMIT} characters.`);
      return;
    }

    setError(null); // Clear error if valid
    setFormCarrier({ ...formCarrier, int_notes: sanitizedValue });
  };

  return (
    <fieldset className="form-section">
      <legend>Internal Notes</legend>
      <div className="form-group" style={{ flex: 1 }}>
        <label htmlFor="internalNotes">Notes</label>
        <textarea
          id="internalNotes"
          value={formCarrier.int_notes}
          onChange={handleChange}
          placeholder="Enter internal notes (max 1000 characters)"
          rows={4}
          style={{ width: '100%' }}
        />
        {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
      </div>
    </fieldset>
  );
};

export default EditInternalNotes;
