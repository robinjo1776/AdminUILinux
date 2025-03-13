import React from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify for input sanitization
import { Carrier } from '../../../types/CarrierTypes'; // Adjust the import path as needed

interface EditGeneralProps {
  formCarrier: Carrier;
  setFormCarrier: (carrier: Carrier) => void;
}

const EditGeneral: React.FC<EditGeneralProps> = ({ formCarrier, setFormCarrier }) => {
  const currencyOptions = ['CAD', 'USD'];

  // Utility function to sanitize and trim input
  const sanitizeInput = (input: string) => DOMPurify.sanitize(input.trim());

  return (
    <fieldset className="form-section">
      <legend>General</legend>

      {/* First Row */}
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="dba">DBA*</label>
          <input
            type="text"
            value={formCarrier.dba}
            onChange={(e) => setFormCarrier({ ...formCarrier, dba: sanitizeInput(e.target.value) })}
            id="dba"
            required
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">Legal Name</label>
          <input
            type="text"
            value={formCarrier.legal_name}
            onChange={(e) => setFormCarrier({ ...formCarrier, legal_name: sanitizeInput(e.target.value) })}
            id="legalName"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Remit Name</label>
          <input
            type="text"
            value={formCarrier.remit_name}
            onChange={(e) => setFormCarrier({ ...formCarrier, remit_name: sanitizeInput(e.target.value) })}
            id="remitName"
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Account Number</label>
          <input
            type="text"
            value={formCarrier.acc_no}
            onChange={(e) => {
              const sanitizedValue = sanitizeInput(e.target.value);
              if (/^\d*$/.test(sanitizedValue)) {
                // Allow only numbers
                setFormCarrier({ ...formCarrier, acc_no: sanitizedValue });
              }
            }}
            id="accNo"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            value={formCarrier.branch}
            onChange={(e) => setFormCarrier({ ...formCarrier, branch: sanitizeInput(e.target.value) })}
            id="branch"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="website">Website</label>
          <input
            type="url"
            value={formCarrier.website}
            onChange={(e) => setFormCarrier({ ...formCarrier, website: sanitizeInput(e.target.value) })}
            id="website"
          />
        </div>
      </div>

      {/* Third Row */}
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="fedIdNo">Federal ID Number</label>
          <input
            type="text"
            value={formCarrier.fed_id_no}
            onChange={(e) => setFormCarrier({ ...formCarrier, fed_id_no: sanitizeInput(e.target.value) })}
            id="fedIdNo"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="creditStatus">Preferred Currency</label>
          <select
            name="creditStatus"
            value={formCarrier.pref_curr}
            onChange={(e) =>
              setFormCarrier({
                ...formCarrier,
                pref_curr: e.target.value,
              })
            }
          >
            <option value="">Select..</option>
            {currencyOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="payTerms">Payment Terms</label>
          <input
            type="text"
            value={formCarrier.pay_terms}
            onChange={(e) => setFormCarrier({ ...formCarrier, pay_terms: sanitizeInput(e.target.value) })}
            id="payTerms"
          />
        </div>
      </div>

      {/* Fourth Row */}
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ display: 'flex', flex: 1, verticalAlign: 'center', gap: '1rem' }}>
          <input
            type="checkbox"
            id="creditApplication"
            checked={formCarrier.form_1099}
            onChange={(e) =>
              setFormCarrier({
                ...formCarrier,
                form_1099: e.target.checked,
              })
            }
            style={{ width: '16px', height: '16px' }}
          />
          <label htmlFor="advertise">1099</label>
        </div>
        <div className="form-group" style={{ display: 'flex', flex: 1, verticalAlign: 'center', gap: '1rem' }}>
          <input
            type="checkbox"
            id="advertise"
            checked={formCarrier.advertise}
            onChange={(e) =>
              setFormCarrier({
                ...formCarrier,
                advertise: e.target.checked,
              })
            }
            style={{ width: '16px', height: '16px' }}
          />
          <label htmlFor="advertise">Advertise</label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="advertiseEmail">Advertise Email</label>
          <input
            type="email"
            value={formCarrier.advertise_email}
            onChange={(e) => {
              const email = sanitizeInput(e.target.value);
              if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) || email === '') {
                setFormCarrier({ ...formCarrier, advertise_email: email });
              }
            }}
            id="advertiseEmail"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default EditGeneral;
