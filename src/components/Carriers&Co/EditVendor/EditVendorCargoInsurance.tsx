import React from "react";
import { Vendor } from "../../../types/VendorTypes";

interface EditVendorCargoInsuranceProps {
  formVendor: Vendor;
  setFormVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

const EditVendorCargoInsurance: React.FC<EditVendorCargoInsuranceProps> = ({ formVendor, setFormVendor }) => {
  // Helper function to format the date
  const formatDate = (date: string | null): string => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
  };

  return (
    <fieldset className="form-section">
      <legend>Cargo Insurance Details</legend>
      <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciProvider">Cargo Insurance Provider</label>
          <input
            type="text"
            value={formVendor.cargo_company}
            onChange={(e) => setFormVendor({ ...formVendor, cargo_company: e.target.value })}
            id="ciProvider"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciStartDate">Start Date</label>
          <input
            type="date"
            value={formatDate(formVendor.cargo_policy_start)}
            onChange={(e) => setFormVendor({ ...formVendor, cargo_policy_start: e.target.value })}
            id="ciStartDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciEndDate">End Date</label>
          <input
            type="date"
            value={formatDate(formVendor.cargo_policy_end)}
            onChange={(e) => setFormVendor({ ...formVendor, cargo_policy_end: e.target.value })}
            id="ciEndDate"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="ciCoverage">Coverage Amount</label>
          <input
            type="number"
            value={formVendor.cargo_ins_amt}
            onChange={(e) => setFormVendor({ ...formVendor, cargo_ins_amt: Number(e.target.value) })}
            id="ciCoverage"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default EditVendorCargoInsurance;
