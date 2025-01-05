import { useState } from "react";

function CarrierDetails({ carrier, setCarrier }) {


  // State to store uploading status
  const [uploading, setUploading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const carrierTypeOptions = [
    "US Authorization",
    "Air Freight",
    "Canadian",
    "Common",
    "Intermodal",
    "Local Cartage",
    "Mexican",
    "Ocean Freight",
    "Other",
  ];

  const ratingOptions = [
    "Unrated",
    "Preferred",
    "Excellent",
    "Good",
    "Poor",
    "Not Recommended",
    "Do not use",
    "Blank",
    "Probationary",
  ];

  // Handle file change for uploads
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setUploading(true);
  
    const formData = new FormData();
    formData.append("file", file);  // Match the key here to 'file'
  
    const token = localStorage.getItem("token");  // Assuming you are sending a token for authorization
    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed:", errorText);
        alert("File upload failed. Please try again.");
        return;
      }
  
      const data = await response.json();
      if (data.fileUrl) {
        setCarrier({
          ...carrier,
          brok_carr_aggmt: data.fileUrl, // Update the correct field in state
        });
      } else {
        console.error("File URL not returned in the response");
        alert("File upload failed: No file URL returned.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
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
    <fieldset className="form-section">
      <legend>Carrier Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="carrType">Carrier Type</label>
          <select
            name="carrType"
            value={carrier.carr_type}
            onChange={(e) =>
              setCarrier({
                ...carrier,
                carr_type: e.target.value,
              })
            }
          >
            <option value="">Select..</option>
            {carrierTypeOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            name="rating"
            value={carrier.rating}
            onChange={(e) =>
              setCarrier({
                ...carrier,
                rating: e.target.value,
              })
            }
          >
            <option value="">Select..</option>
            {ratingOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="brokCarrAggmt">Broker Carrier Agreement</label>
          <input
            type="file"
            name="brokCarrAggmt"
            onChange={(e) => handleFileChange(e, "brok_carr_aggmt")}
            accept="application/pdf"
          />
          {/* Show existing file download link if a file exists */}
          {renderDownloadLink(
            carrier.brok_carr_aggmt,
            "Broker Carrier Agreement"
          )}
          {uploading && <p>Uploading...</p>}
        </div>

        <div className="form-group">
          <label htmlFor="docketNo">Docket Number</label>
          <input
            type="text"
            value={carrier.docket_no}
            onChange={(e) =>
              setCarrier({ ...carrier, docket_no: e.target.value })
            }
            id="docketNo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dotNumber">DOT Number</label>
          <input
            type="text"
            value={carrier.dot_number}
            onChange={(e) =>
              setCarrier({ ...carrier, dot_number: e.target.value })
            }
            id="dotNumber"
          />
        </div>

        <div className="form-group">
          <label htmlFor="wcbNo">WCB Number</label>
          <input
            type="text"
            value={carrier.wcb_no}
            onChange={(e) => setCarrier({ ...carrier, wcb_no: e.target.value })}
            id="wcbNo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="caBondNo">California Bond Number</label>
          <input
            type="text"
            value={carrier.ca_bond_no}
            onChange={(e) =>
              setCarrier({ ...carrier, ca_bond_no: e.target.value })
            }
            id="caBondNo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="usBondNo">US Bond Number</label>
          <input
            type="text"
            value={carrier.us_bond_no}
            onChange={(e) =>
              setCarrier({ ...carrier, us_bond_no: e.target.value })
            }
            id="usBondNo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="scac">SCAC</label>
          <input
            type="text"
            value={carrier.scac}
            onChange={(e) => setCarrier({ ...carrier, scac: e.target.value })}
            id="scac"
          />
        </div>

        <div className="form-group">
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            CSA Approved
            <input
              type="checkbox"
              checked={carrier.csa_approved}
              onChange={(e) =>
                setCarrier({ ...carrier, csa_approved: e.target.checked })
              }
              id="csaApproved"
            />
          </label>
        </div>

        <div className="form-group">
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            Hazmat
            <input
              type="checkbox"
              checked={carrier.hazmat}
              onChange={(e) =>
                setCarrier({ ...carrier, hazmat: e.target.checked })
              }
              id="hazmat"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="smscCode">SMS Code</label>
          <input
            type="text"
            value={carrier.smsc_code}
            onChange={(e) =>
              setCarrier({ ...carrier, smsc_code: e.target.value })
            }
            id="smscCode"
          />
        </div>

        <div className="form-group">
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            Approved
            <input
              type="checkbox"
              checked={carrier.approved}
              onChange={(e) =>
                setCarrier({ ...carrier, approved: e.target.checked })
              }
              id="approved"
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default CarrierDetails;
