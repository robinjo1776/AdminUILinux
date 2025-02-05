import { useState } from 'react';

function CustomerCredit({ formCustomer, setformCustomer }) {
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
          <label htmlFor="creditStatus">Credit Status</label>
          <select
            name="creditStatus"
            value={formCustomer.cust_credit_status}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_credit_status: e.target.value,
              })
            }
          >
            <option value="">Select..</option>
            {creditStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Mode of Payment */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="modeOfPayment">Mode of Payment</label>
          <select
            name="modeOfPayment"
            value={formCustomer.cust_credit_mop}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_credit_mop: e.target.value,
              })
            }
          >
            <option value="">Select..</option>
            {modeOfPaymentOptions.map((payment) => (
              <option key={payment} value={payment}>
                {payment}
              </option>
            ))}
          </select>
        </div>

        {/* Currency */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="currency">Currency</label>
          <select
            name="currency"
            value={formCustomer.cust_credit_currency}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_credit_currency: e.target.value,
              })
            }
          >
            <option value="">Select..</option>
            {currencyOptions.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="approvalDate">Approval Date</label>
          <input
            type="date"
            name="approvalDate"
            value={formCustomer.cust_credit_appd}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_credit_appd: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formCustomer.cust_credit_expd}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_credit_expd: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="terms">Terms (Days)</label>
          <input
            type="number"
            name="terms"
            value={formCustomer.cust_credit_terms}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_credit_terms: e.target.value,
              })
            }
          />
        </div>

        {/* Limit */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="limit">Limit</label>
          <input
            type="number"
            name="limit"
            value={formCustomer.cust_credit_limit}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_credit_limit: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Credit Application
            <input
              type="checkbox"
              id="creditApplication"
              checked={formCustomer.cust_credit_application}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_credit_application: e.target.checked,
                })
              }
            />
          </label>
        </div>

        {/* File Uploads */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="creditAgreement">Credit Agreement</label>
          <input type="file" name="creditAgreement" onChange={(e) => handleFileChange(e, 'cust_credit_agreement')} />
      
          {/* Show stored file name from DB */}
          {formCustomer?.cust_credit_agreement?.name && <p>Stored File: {formCustomer.cust_credit_agreement.name}</p>}
          {renderDownloadLink(formCustomer?.cust_credit_agreement, 'Credit Agreement')}
          {uploading && <p>Uploading...</p>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="shipperBrokerAgreement">Shipper Broker Agreement</label>
          <input type="file" name="shipperBrokerAgreement" onChange={(e) => handleFileChange(e, 'cust_sbk_agreement')} />
          {/* Show stored file name from DB */}
          {formCustomer?.cust_sbk_agreement?.name && <p>Stored File: {formCustomer.cust_sbk_agreement.name}</p>}
          {renderDownloadLink(formCustomer?.cust_sbk_agreement, 'Shipper Broker Agreement')}
          {uploading && <p>Uploading...</p>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            value={formCustomer.cust_credit_notes}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_credit_notes: e.target.value,
              })
            }
            rows="4"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default CustomerCredit;
