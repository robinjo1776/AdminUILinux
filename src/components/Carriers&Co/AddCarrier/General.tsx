import { useState } from 'react';
import { Carrier } from '../../../types/CarrierTypes';

interface CargoInsuranceProps {
  carrier: Carrier;
  setCarrier: React.Dispatch<React.SetStateAction<Carrier>>;
}

const CargoInsurance: React.FC<CargoInsuranceProps> = ({ carrier, setCarrier }) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:3000/api';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      return;
    }

    // Validate file size (5MB limit)
    const MAX_SIZE_MB = 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`File size exceeds ${MAX_SIZE_MB}MB limit.`);
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication required.');
      return;
    }

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
        setCarrier((prevCarrier) => ({
          ...prevCarrier,
          coi_cert: data.fileUrl.trim(),
        }));
      } else {
        alert('File upload failed: No file URL returned.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const renderDownloadLink = (fileUrl: string, fileLabel: string) => {
    if (fileUrl) {
      return (
        <div>
          <a href={fileUrl.trim()} target="_blank" rel="noopener noreferrer">
            Download {fileLabel}
          </a>
        </div>
      );
    }
    return null;
  };

  return (
    <fieldset className="form-section">
      <legend>Cargo Insurance Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciProvider">Cargo Insurance Provider</label>
          <input
            type="text"
            value={carrier.ci_provider || ''}
            onChange={(e) =>
              setCarrier((prevCarrier) => ({
                ...prevCarrier,
                ci_provider: e.target.value.trim(),
              }))
            }
            id="ciProvider"
            placeholder="Cargo Insurance Provider"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciPolicyNo">Policy Number</label>
          <input
            type="text"
            value={carrier.ci_policy_no || ''}
            onChange={(e) =>
              setCarrier((prevCarrier) => ({
                ...prevCarrier,
                ci_policy_no: e.target.value.trim(),
              }))
            }
            id="ciPolicyNo"
            placeholder="Policy Number"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciCoverage">Coverage Amount</label>
          <input
            type="number"
            value={carrier.ci_coverage || ''}
            onChange={(e) =>
              setCarrier((prevCarrier) => ({
                ...prevCarrier,
                ci_coverage: Number(e.target.value) || 0,
              }))
            }
            id="ciCoverage"
            placeholder="Coverage Amount"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciStartDate">Start Date</label>
          <input
            type="date"
            value={carrier.ci_start_date || ''}
            onChange={(e) =>
              setCarrier((prevCarrier) => ({
                ...prevCarrier,
                ci_start_date: e.target.value.trim(),
              }))
            }
            id="ciStartDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciEndDate">End Date</label>
          <input
            type="date"
            value={carrier.ci_end_date || ''}
            onChange={(e) =>
              setCarrier((prevCarrier) => ({
                ...prevCarrier,
                ci_end_date: e.target.value.trim(),
              }))
            }
            id="ciEndDate"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="coiCert">Certificate of Insurance</label>
          <input type="file" name="coiCert" onChange={handleFileChange} accept="application/pdf" />
          {renderDownloadLink(carrier.coi_cert, 'Certificate of Insurance')}
          {uploading && <p>Uploading...</p>}
        </div>
      </div>
    </fieldset>
  );
};

export default CargoInsurance;
