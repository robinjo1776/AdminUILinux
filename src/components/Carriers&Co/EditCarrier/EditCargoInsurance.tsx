import { useState } from "react";
import { Carrier } from "../../../types/CarrierTypes";

interface EditCargoInsuranceProps {
  formCarrier: Carrier;
  setFormCarrier: (carrier: Carrier) => void;
}

const EditCargoInsurance: React.FC<EditCargoInsuranceProps> = ({ formCarrier, setFormCarrier }) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const API_URL: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  // Handle file change for uploads
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
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
        setFormCarrier({
          ...formCarrier,
          coi_cert: data.fileUrl,
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
      <legend>Cargo Insurance Details</legend>
      <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciProvider">Cargo Insurance Provider</label>
          <input
            type="text"
            value={formCarrier.ci_provider || ""}
            onChange={(e) => setFormCarrier({ ...formCarrier, ci_provider: e.target.value })}
            id="ciProvider"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciPolicyNo">Policy Number</label>
          <input
            type="text"
            value={formCarrier.ci_policy_no || ""}
            onChange={(e) => setFormCarrier({ ...formCarrier, ci_policy_no: e.target.value })}
            id="ciPolicyNo"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciCoverage">Coverage Amount</label>
          <input
            type="number"
            value={formCarrier.ci_coverage || ""}
            onChange={(e) => setFormCarrier({ ...formCarrier, ci_coverage: Number(e.target.value) })}
            id="ciCoverage"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciStartDate">Start Date</label>
          <input
            type="date"
            value={formCarrier.ci_start_date || ""}
            onChange={(e) => setFormCarrier({ ...formCarrier, ci_start_date: e.target.value })}
            id="ciStartDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciEndDate">End Date</label>
          <input
            type="date"
            value={formCarrier.ci_end_date || ""}
            onChange={(e) => setFormCarrier({ ...formCarrier, ci_end_date: e.target.value })}
            id="ciEndDate"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="coiCert">Certificate of Insurance</label>
          <input type="file" name="coiCert" onChange={handleFileChange} accept="application/pdf" />
          {/* Show existing file download link if a file exists */}
          {renderDownloadLink(formCarrier.coi_cert, "Certificate of Insurance")}
          {uploading && <p>Uploading...</p>}
        </div>
      </div>
    </fieldset>
  );
};

export default EditCargoInsurance;
