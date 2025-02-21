import { useState } from 'react';

interface FileData {
  url: string;
  name: string;
}

interface FormCustomer {
  cust_credit_status?: string;
  cust_credit_mop?: string;
  cust_credit_currency?: string;
  cust_credit_appd?: string;
  cust_credit_expd?: string;
  cust_credit_terms?: number;
  cust_credit_limit?: number;
  cust_credit_application?: boolean;
  cust_credit_agreement?: FileData | string;
  cust_sbk_agreement?: FileData | string;
  cust_credit_notes?: string;
}

interface ViewCustomerCreditProps {
  formCustomer: FormCustomer;
  setformCustomer: React.Dispatch<React.SetStateAction<FormCustomer>>;
}

const ViewCustomerCredit: React.FC<ViewCustomerCreditProps> = ({ formCustomer, setformCustomer }) => {
  const [uploading, setUploading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle file change for uploads
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormCustomer) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const token = localStorage.getItem('token') || '';

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // Update the formCustomer state with the file URL and the original file name
      setformCustomer((prevState) => ({
        ...prevState,
        [fieldName]: {
          url: data.fileUrl, // Store the URL
          name: file.name, // Store the original file name
        },
      }));
    } catch (error) {
      console.error('File upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  // Render download link if file URL exists
  const renderDownloadLink = (fileData?: FileData | string, fileLabel?: string) => {
    if (fileData) {
      // Parse the JSON string if the data is stored as a string
      const fileObject: FileData = typeof fileData === 'string' ? JSON.parse(fileData) : fileData;

      if (fileObject?.url) {
        return (
          <div>
            <a href={fileObject.url} target="_blank" rel="noopener noreferrer">
              Download {fileLabel}: {fileObject.name}
            </a>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <fieldset>
      <legend>Customer Credit</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Credit Status</label>
          <div>{formCustomer.cust_credit_status || 'N/A'}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Mode of Payment</label>
          <div>{formCustomer.cust_credit_mop || 'N/A'}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Currency</label>
          <div>{formCustomer.cust_credit_currency || 'N/A'}</div>
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Approval Date</label>
          <div>{formCustomer.cust_credit_appd || 'N/A'}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Expiry Date</label>
          <div>{formCustomer.cust_credit_expd || 'N/A'}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Terms (Days)</label>
          <div>{formCustomer.cust_credit_terms || 'N/A'}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Limit</label>
          <div>{formCustomer.cust_credit_limit || 'N/A'}</div>
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Credit Application</label>
          <div>{formCustomer.cust_credit_application ? 'Yes' : 'No'}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Credit Agreement</label>
          {formCustomer.cust_credit_agreement && (
            <p>
              Stored File:{' '}
              {typeof formCustomer.cust_credit_agreement === 'string'
                ? JSON.parse(formCustomer.cust_credit_agreement).name
                : formCustomer.cust_credit_agreement.name}
            </p>
          )}
          {renderDownloadLink(formCustomer.cust_credit_agreement, 'Credit Agreement')}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Shipper Broker Agreement</label>
          {formCustomer.cust_sbk_agreement && (
            <p>
              Stored File:{' '}
              {typeof formCustomer.cust_sbk_agreement === 'string'
                ? JSON.parse(formCustomer.cust_sbk_agreement).name
                : formCustomer.cust_sbk_agreement.name}
            </p>
          )}
          {renderDownloadLink(formCustomer.cust_sbk_agreement, 'Shipper Broker Agreement')}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Notes</label>
          <div>{formCustomer.cust_credit_notes || 'N/A'}</div>
        </div>
      </div>
    </fieldset>
  );
};

export default ViewCustomerCredit;
