import { useState } from 'react';
import { Carrier } from '../../../types/CarrierTypes';

interface CarrierDetailsProps {
  carrier: Carrier;
  setCarrier: React.Dispatch<React.SetStateAction<Carrier>>;
}

const CarrierDetails: React.FC<CarrierDetailsProps> = ({ carrier, setCarrier }) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const API_URL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

  const carrierTypeOptions: string[] = [
    'US Authorization',
    'Air Freight',
    'Canadian',
    'Common',
    'Intermodal',
    'Local Cartage',
    'Mexican',
    'Ocean Freight',
    'Other',
  ];

  const ratingOptions: string[] = ['Unrated', 'Preferred', 'Excellent', 'Good', 'Poor', 'Not Recommended', 'Do not use', 'Blank', 'Probationary'];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) {
        alert('File upload failed. Please try again.');
        return;
      }
      const data = await response.json();
      if (data.fileUrl) {
        setCarrier({ ...carrier, brok_carr_aggmt: data.fileUrl });
      } else {
        alert('File upload failed: No file URL returned.');
      }
    } catch (error) {
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <fieldset className="form-section">
      <legend>Carrier Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="carrType">Carrier Type</label>
          <select id="carrType" value={carrier.carr_type} onChange={(e) => setCarrier({ ...carrier, carr_type: e.target.value })}>
            <option value="">Select..</option>
            {carrierTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="rating">Rating</label>
          <select id="rating" value={carrier.rating} onChange={(e) => setCarrier({ ...carrier, rating: e.target.value })}>
            <option value="">Select..</option>
            {ratingOptions.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {[
          { key: 'docket_no', placeholder: 'Docket Number' },
          { key: 'dot_number', placeholder: 'DOT Number' },
          { key: 'wcb_no', placeholder: 'WCB Number' },
          { key: 'ca_bond_no', placeholder: 'CA Bond Number' },
          { key: 'us_bond_no', placeholder: 'US Bond Number' },
        ].map(({ key, placeholder }) => (
          <div key={key} className="form-group" style={{ flex: 1 }}>
            <label htmlFor={key}>{key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} </label>
            <input
              type="text"
              id={key}
              value={carrier[key as keyof Carrier] as string}
              onChange={(e) => setCarrier({ ...carrier, [key]: e.target.value })}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {[
          { key: 'scac', placeholder: 'SCAC' },
          { key: 'smsc_code', placeholder: 'SMSC Code' },
          { key: 'mc_number', placeholder: 'MC Number' },
          { key: 'ifta_account_no', placeholder: 'IFTA Account No' },
          { key: 'insurance_policy_no', placeholder: 'Insurance Policy No' },
        ].map(({ key, placeholder }) => (
          <div key={key} className="form-group" style={{ flex: 1 }}>
            <label htmlFor={key}>{key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} </label>
            <input
              type="text"
              id={key}
              value={carrier[key as keyof Carrier] as string}
              onChange={(e) => setCarrier({ ...carrier, [key]: e.target.value })}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ display: 'flex', flex: 1, verticalAlign: 'center', gap: '1rem' }}>
          <input
            type="checkbox"
            checked={carrier.csa_approved || false}
            onChange={(e) =>
              setCarrier((prevCarrier: Carrier) => ({
                ...prevCarrier,
                csa_approved: e.target.checked,
              }))
            }
            id="csaApproved"
            className="styled-checkbox"
            style={{ width: '16px', height: '16px' }}
          />
          <label htmlFor="csaApproved">CSA Approved</label>
        </div>
        <div className="form-group" style={{ display: 'flex', flex: 1, verticalAlign: 'center', gap: '1rem' }}>
          <input
            type="checkbox"
            checked={carrier.hazmat || false}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, hazmat: e.target.checked }))}
            id="hazmat"
            className="styled-checkbox"
            style={{ width: '16px', height: '16px' }}
          />
          <label htmlFor="hazmat">Hazmat</label>
        </div>
        <div className="form-group" style={{ display: 'flex', flex: 1, verticalAlign: 'center', gap: '1rem' }}>
          <input
            type="checkbox"
            checked={carrier.approved || false}
            onChange={(e) => setCarrier((prevCarrier) => ({ ...prevCarrier, approved: e.target.checked }))}
            id="approved"
            className="styled-checkbox"
            style={{ width: '16px', height: '16px' }}
          />
          <label htmlFor="approved">Approved</label>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {[
          { key: 'contact_name', placeholder: 'Contact Name' },
          { key: 'contact_phone', placeholder: 'Contact Phone' },
          { key: 'contact_email', placeholder: 'Contact Email' },
          { key: 'fax_number', placeholder: 'Fax Number' },
        ].map(({ key, placeholder }) => (
          <div key={key} className="form-group" style={{ flex: 1 }}>
            <label htmlFor={key}>{key.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</label>
            <input
              type="text"
              id={key}
              value={carrier[key as keyof Carrier] as string}
              onChange={(e) => setCarrier({ ...carrier, [key]: e.target.value })}
              placeholder={placeholder}
            />
          </div>
        ))}

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="brokCarrAggmt">Broker Carrier Agreement</label>
          <input type="file" id="brokCarrAggmt" onChange={handleFileChange} accept="application/pdf" />
          {carrier.brok_carr_aggmt && (
            <a href={carrier.brok_carr_aggmt} target="_blank" rel="noopener noreferrer">
              Download Agreement
            </a>
          )}
          {uploading && <p>Uploading...</p>}
        </div>
      </div>
    </fieldset>
  );
};

export default CarrierDetails;
