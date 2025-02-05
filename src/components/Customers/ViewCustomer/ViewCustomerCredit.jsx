import { useState } from 'react';

function ViewCustomerCredit({ formCustomer, setformCustomer }) {
  const creditStatusOptions = ['Approved', 'Not Approved'];
  const modeOfPaymentOptions = ['Direct Deposit', 'Wire Transfer', 'Visa'];
  const currencyOptions = ['USD', 'CAD'];
  const [uploading, setUploading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle file change for uploads
  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // Update the formCustomer state with the file URL and the original file name
      setformCustomer({
        ...formCustomer,
        [fieldName]: {
          url: data.fileUrl, // Store the URL
          name: file.name, // Store the original file name
        },
      });
    } catch (error) {
      console.error('File upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  // Render download link if file URL exists
  const renderDownloadLink = (fileData, fileLabel) => {
    if (fileData) {
      // Parse the JSON string if the data is stored as a string
      const fileObject = typeof fileData === 'string' ? JSON.parse(fileData) : fileData;

      if (fileObject && fileObject.url) {
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
          <div>{formCustomer.cust_credit_status}</div>
        </div>

        {/* Mode of Payment */}
        <div className="form-group" style={{ flex: 1 }}>
          <label>Mode of Payment</label>
          <div>{formCustomer.cust_credit_mop}</div>
        </div>

        {/* Currency */}
        <div className="form-group" style={{ flex: 1 }}>
          <label>Currency</label>
          <div>{formCustomer.cust_credit_currency}</div>
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Approval Date</label>
          <div>{formCustomer.cust_credit_appd}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Expiry Date</label>
          <div>{formCustomer.cust_credit_expd}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Terms (Days)</label>
          <div>{formCustomer.cust_credit_terms}</div>
        </div>

        {/* Limit */}
        <div className="form-group" style={{ flex: 1 }}>
          <label>Limit</label>
          <div>{formCustomer.cust_credit_limit}</div>
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>
            Credit Application
            <div>{formCustomer.cust_credit_application ? 'Yes' : 'No'}</div>
          </label>
        </div>

        {/* File Uploads */}
        <div className="form-group" style={{ flex: 1 }}>
          <label>Credit Agreement</label>
          {formCustomer?.cust_credit_agreement?.name && <p>Stored File: {formCustomer.cust_credit_agreement.name}</p>}
          {renderDownloadLink(formCustomer?.cust_credit_agreement, 'Credit Agreement')}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Shipper Broker Agreement</label>
          {formCustomer?.cust_sbk_agreement?.name && <p>Stored File: {formCustomer.cust_sbk_agreement.name}</p>}
          {renderDownloadLink(formCustomer?.cust_sbk_agreement, 'Shipper Broker Agreement')}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Notes</label>
          <div>{formCustomer.cust_credit_notes}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewCustomerCredit;
