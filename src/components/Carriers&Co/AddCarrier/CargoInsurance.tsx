import { useState } from 'react';
import { Carrier } from '../../../types/CarrierTypes';
import * as z from 'zod';
import DOMPurify from 'dompurify';

interface CargoInsuranceProps {
  carrier: Carrier;
  setCarrier: React.Dispatch<React.SetStateAction<Carrier>>;
}
const carrierSchema = z
  .object({
    ci_provider: z
      .string()
      .max(150, 'Cargo Insurance Provider must be at most 150 characters')
      .regex(/^[a-zA-Z0-9\s.,'-]*$/, 'Only letters, numbers,spaces, apostrophes, periods, commas, and hyphens allowed')
      .optional(),
    ci_policy_no: z
      .string()
      .max(50, 'Policy Number must be at most 50 characters')
      .regex(/^[a-zA-Z0-9\s.-]*$/, 'Only letters, numbers, spaces, periods, and hyphens allowed')
      .optional(),
    ci_coverage: z.number().optional(),
    ci_start_date: z.string().optional(),
    ci_end_date: z.string().optional(),
  })
  .refine((data) => !data.ci_start_date || !data.ci_end_date || new Date(data.ci_start_date) <= new Date(data.ci_end_date), {
    message: 'End date must be after or equal to start date',
    path: ['ci_end_date'],
  });
  
const CargoInsurance: React.FC<CargoInsuranceProps> = ({ carrier, setCarrier }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<boolean>(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:8000/api';
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const sanitizeInput = (input: string) => DOMPurify.sanitize(input);

  const handleChange = (key: keyof Carrier, value: string | number) => {
    const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value;
    const newCarrier = { ...carrier, [key]: sanitizedValue };
    const result = carrierSchema.safeParse(newCarrier);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
    setCarrier(newCarrier);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/tiff',
      'image/bmp',
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Only DOC, DOCX, PDF, JPG, JPEG, PNG, GIF, TIFF, and BMP files are allowed.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be less than 10MB.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('coi_cert', file);

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
        setCarrier((prevCarrier) => ({
          ...prevCarrier,
          coi_cert: data.fileUrl,
        }));
      } else {
        console.error('File URL not returned in response');
        alert('File upload failed: No file URL returned.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Network error during file upload. Please check your connection.');
    } finally {
      setUploading(false);
    }
  };

  const fields = [
    { label: 'Cargo Insurance Provider', key: 'ci_provider', type: 'text', placeholder: 'Provider' },
    { label: 'Policy Number', key: 'ci_policy_no', type: 'text', placeholder: 'Policy Number' },
    { label: 'Coverage Amount', key: 'ci_coverage', type: 'number', placeholder: 'Coverage Amount' },
    { label: 'Start Date', key: 'ci_start_date', type: 'date' },
    { label: 'End Date', key: 'ci_end_date', type: 'date' },
  ];

  return (
    <fieldset className="form-section">
      <legend>Cargo Insurance Details</legend>
      <div className="form-grid" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {fields.map(({ label, key, type, placeholder }) => (
          <div key={key} className="form-group" style={{ flex: 1 }}>
            <label htmlFor={key}>{label}</label>
            <input
              type={type}
              id={key}
              value={(carrier[key as keyof Carrier] as string | number) || ''}
              onChange={(e) => handleChange(key as keyof Carrier, type === 'number' ? Number(e.target.value) : e.target.value)}
              placeholder={placeholder || ''}
            />
            {errors[key] && (
              <span className="error-text" style={{ color: 'red' }}>
                {errors[key]}
              </span>
            )}
          </div>
        ))}

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="brokCarrAggmt">Certificate of Insurance</label>
          <input type="file" onChange={handleFileChange} />
          {typeof carrier.coi_cert === 'string' && carrier.coi_cert && (
            <div>
              <a href={carrier.coi_cert} target="_blank" rel="noopener noreferrer">
                Download Certificate of Insurance
              </a>
            </div>
          )}

          {uploading && <p>Uploading...</p>}
        </div>
      </div>
    </fieldset>
  );
};

export default CargoInsurance;
