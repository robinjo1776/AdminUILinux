import { useState } from 'react';
import { Carrier } from '../../../types/CarrierTypes';

interface EditCarrierDetailsProps {
  formCarrier: Carrier;
  setFormCarrier: (carrier: Carrier) => void;
}

function EditCarrierDetails({ formCarrier, setFormCarrier }: EditCarrierDetailsProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

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
      const response = await fetch(`${API_URL}/api/upload`, {
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
        setFormCarrier({ ...formCarrier, brok_carr_aggmt: data.fileUrl });
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
    return fileUrl ? (
      <div>
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          Download {fileLabel}
        </a>
      </div>
    ) : null;
  };

  return (
    <fieldset className="form-section">
      <legend>Carrier Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="carrType">Carrier Type</label>
          <select name="carrType" value={formCarrier.carr_type} onChange={(e) => setFormCarrier({ ...formCarrier, carr_type: e.target.value })}>
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
          <select name="rating" value={formCarrier.rating} onChange={(e) => setFormCarrier({ ...formCarrier, rating: e.target.value })}>
            <option value="">Select..</option>
            {ratingOptions.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="brokCarrAggmt">Broker Carrier Agreement</label>
          <input type="file" name="brokCarrAggmt" onChange={handleFileChange} accept="application/pdf" />
          {renderDownloadLink(formCarrier.brok_carr_aggmt, 'Broker Carrier Agreement')}
          {uploading && <p>Uploading...</p>}
        </div>
      </div>
    </fieldset>
  );
}

export default EditCarrierDetails;
