import { useState } from 'react';
import { Carrier } from "../../../types/CarrierTypes";

interface CarrierDetailsProps {
  carrier: Carrier;
  setCarrier: (carrier: Carrier) => void;
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

  // Handle file change for uploads
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', errorText);
        alert('File upload failed. Please try again.');
        return;
      }

      const data = await response.json();
      if (data.fileUrl) {
        setCarrier({
          ...carrier,
          brok_carr_aggmt: data.fileUrl,
        });
      } else {
        console.error('File URL not returned in the response');
        alert('File upload failed: No file URL returned.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const renderDownloadLink = (fileUrl?: string, fileLabel?: string) => {
    if (fileUrl) {
      return (
        <div>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download {fileLabel}
          </a>
        </div>
      );
    }
    return null;
  };

  return (
    <fieldset className="form-section">
      <legend>Carrier Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="carrType">Carrier Type</label>
          <select
            name="carrType"
            value={carrier.carr_type}
            onChange={(e) => setCarrier({ ...carrier, carr_type: e.target.value })}
          >
            <option value="">Select..</option>
            {carrierTypeOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="rating">Rating</label>
          <select
            name="rating"
            value={carrier.rating}
            onChange={(e) => setCarrier({ ...carrier, rating: e.target.value })}
          >
            <option value="">Select..</option>
            {ratingOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="brokCarrAggmt">Broker Carrier Agreement</label>
          <input type="file" name="brokCarrAggmt" onChange={handleFileChange} accept="application/pdf" />
          {renderDownloadLink(carrier.brok_carr_aggmt, 'Broker Carrier Agreement')}
          {uploading && <p>Uploading...</p>}
        </div>
      </div>

      {[
        { id: 'docketNo', label: 'Docket Number', value: carrier.docket_no, field: 'docket_no' },
        { id: 'dotNumber', label: 'DOT Number', value: carrier.dot_number, field: 'dot_number' },
        { id: 'wcbNo', label: 'WCB Number', value: carrier.wcb_no, field: 'wcb_no' },
        { id: 'caBondNo', label: 'California Bond Number', value: carrier.ca_bond_no, field: 'ca_bond_no' },
        { id: 'usBondNo', label: 'US Bond Number', value: carrier.us_bond_no, field: 'us_bond_no' },
        { id: 'scac', label: 'SCAC', value: carrier.scac, field: 'scac' },
        { id: 'smscCode', label: 'SMS Code', value: carrier.smsc_code, field: 'smsc_code' },
      ].map(({ id, label, value, field }) => (
        <div className="form-group" key={id} style={{ flex: 1 }}>
          <label htmlFor={id}>{label}</label>
          <input
            type="text"
            id={id}
            placeholder={label}
            value={value}
            onChange={(e) => setCarrier({ ...carrier, [field]: e.target.value })}
          />
        </div>
      ))}

      {[
        { id: 'csaApproved', label: 'CSA Approved', value: carrier.csa_approved, field: 'csa_approved' },
        { id: 'hazmat', label: 'Hazmat', value: carrier.hazmat, field: 'hazmat' },
        { id: 'approved', label: 'Approved', value: carrier.approved, field: 'approved' },
      ].map(({ id, label, value, field }) => (
        <div className="form-group" key={id} style={{ flex: 1 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', width: '100%' }}>
            {label}
            <input
              type="checkbox"
              id={id}
              checked={value}
              onChange={(e) => setCarrier({ ...carrier, [field]: e.target.checked })}
            />
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default CarrierDetails;
