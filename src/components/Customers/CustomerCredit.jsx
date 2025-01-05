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

      // Update the formCustomer state with the file URL
      setformCustomer({
        ...formCustomer,
        [fieldName]: data.fileUrl, // Update the field with the URL of the uploaded file
      });
    } catch (error) {
      console.error('File upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  // Render download link if file URL exists
  const renderDownloadLink = (fileUrl, fileLabel) => {
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
    <fieldset>
      <legend>Customer Credit</legend>

      {/* Credit Status */}
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
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

      {/* Approval Date */}
      <div className="form-group">
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

      {/* Expiry Date */}
      <div className="form-group">
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

      {/* Terms (Days) */}
      <div className="form-group">
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
      <div className="form-group">
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

      {/* Notes */}
      <div className="form-group">
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

      {/* Credit Application Checkbox */}
      <div className="form-group">
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
      <div className="form-group">
        <label htmlFor="creditAgreement">Credit Agreement</label>
        <input type="file" name="creditAgreement" onChange={(e) => handleFileChange(e, 'cust_credit_agreement')} />
        {/* Show existing file download link if a file exists */}
        {renderDownloadLink(formCustomer.cust_credit_agreement, 'Credit Agreement')}
        {uploading && <p>Uploading...</p>}
      </div>

      <div className="form-group">
        <label htmlFor="shipperBrokerAgreement">Shipper Broker Agreement</label>
        <input type="file" name="shipperBrokerAgreement" onChange={(e) => handleFileChange(e, 'cust_sbk_agreement')} />
        {/* Show existing file download link if a file exists */}
        {renderDownloadLink(formCustomer.cust_sbk_agreement, 'Shipper Broker Agreement')}
        {uploading && <p>Uploading...</p>}
      </div>
    </fieldset>
  );
}

export default CustomerCredit;
