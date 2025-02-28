import { useState } from 'react';
import { Carrier } from '../../../types/CarrierTypes';

interface GeneralProps {
  carrier: Carrier;
  setCarrier: React.Dispatch<React.SetStateAction<Carrier>>;
}

const General: React.FC<GeneralProps> = ({ carrier, setCarrier }) => {
  const [uploading, setUploading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:8000/api';

  return (
    <fieldset className="form-section">
      <legend>General</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="dba">DBA</label>
          <input
            type="text"
            value={carrier.dba || ''}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, dba: e.target.value.trim() }))}
            id="dba"
            placeholder="DBA"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">Legal Name</label>
          <input
            type="text"
            value={carrier.legal_name || ''}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, legal_name: e.target.value.trim() }))}
            id="legalName"
            placeholder="Legal Name"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Remit Name</label>
          <input
            type="text"
            value={carrier.remit_name || ''}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, remit_name: e.target.value.trim() }))}
            id="remitName"
            placeholder="Remit Name"
          />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Account Number</label>
          <input
            type="text"
            value={carrier.acc_no || ''}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, acc_no: e.target.value.trim() }))}
            id="accNo"
            placeholder="Account Number"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            value={carrier.branch || ''}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, branch: e.target.value.trim() }))}
            id="branch"
            placeholder="Branch"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            value={carrier.website || ''}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, website: e.target.value.trim() }))}
            id="website"
            placeholder="Website"
          />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="fedIdNo">Federal ID Number</label>
          <input
            type="text"
            value={carrier.fed_id_no || ''}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, fed_id_no: e.target.value.trim() }))}
            id="fedIdNo"
            placeholder="Federal ID Number"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="prefCurr">Preferred Currency</label>
          <select
            value={carrier.pref_curr || ''}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, pref_curr: e.target.value }))}
            id="prefCurr"
          >
            <option value="">Select Currency</option>
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="payTerms">Payment Terms</label>
          <input
            type="text"
            value={carrier.pay_terms || ''}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, pay_terms: e.target.value.trim() }))}
            id="payTerms"
            placeholder="Payment Terms"
          />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ display: 'flex', flex: 1, verticalAlign: 'center', gap: '1rem' }}>
          <input
            type="checkbox"
            checked={carrier.form_1099 || false}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, form_1099: e.target.checked }))}
            id="form1099"
            style={{ width: '16px', height: '16px' }}
          />
          <label htmlFor="form1099">1099</label>
        </div>
        <div className="form-group" style={{ display: 'flex', flex: 1, verticalAlign: 'center', gap: '1rem' }}>
          <input
            type="checkbox"
            checked={carrier.advertise || false}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, advertise: e.target.checked }))}
            id="advertise"
            style={{ width: '16px', height: '16px' }}
          />
          <label htmlFor="advertise">Advertise</label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="advertiseEmail">Advertise Email</label>
          <input
            type="email"
            value={carrier.advertise_email || ''}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, advertise_email: e.target.value.trim() }))}
            id="advertiseEmail"
            placeholder="Advertise Email"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default General;
