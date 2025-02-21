import { FC, useState } from "react";
import { Vendor } from "../../../types/VendorTypes";

interface VendorAdditionalProps {
  vendor: Vendor;
  setVendor: (vendor: Vendor) => void;
}

const VendorAdditional: FC<VendorAdditionalProps> = ({ vendor, setVendor }) => {
  const [errors, setErrors] = useState<{ usTaxId?: string; payrollNo?: string; wcbNo?: string }>({});

  const validateAndSetVendor = (field: keyof Vendor, value: string) => {
    let error = "";
    let sanitizedValue = value.trim();

    switch (field) {
      case "us_tax_id":
        sanitizedValue = sanitizedValue.replace(/\D/g, "");
        if (sanitizedValue.length !== 9) error = "US Tax ID must be 9 digits";
        break;
      case "payroll_no":
        sanitizedValue = sanitizedValue.replace(/\D/g, "");
        if (!/^\d+$/.test(sanitizedValue)) error = "Payroll# must be numeric";
        break;
      case "wcb_no":
        sanitizedValue = sanitizedValue.replace(/\D/g, "");
        if (!/^\d+$/.test(sanitizedValue)) error = "WCB# must be numeric";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    setVendor({ ...vendor, [field]: sanitizedValue });
  };

  return (
    <fieldset className="form-section">
      <legend>Additional Details</legend>
      <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="usTaxId">US Tax ID</label>
          <input
            type="text"
            value={vendor.us_tax_id}
            onChange={(e) => validateAndSetVendor("us_tax_id", e.target.value)}
            id="usTaxId"
            placeholder="US Tax ID"
          />
          {errors.usTaxId && <small className="error">{errors.usTaxId}</small>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="payrollNo">Payroll#</label>
          <input
            type="text"
            value={vendor.payroll_no}
            onChange={(e) => validateAndSetVendor("payroll_no", e.target.value)}
            id="payrollNo"
            placeholder="Payroll#"
          />
          {errors.payrollNo && <small className="error">{errors.payrollNo}</small>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="wcbNo">WCB#</label>
          <input
            type="text"
            value={vendor.wcb_no}
            onChange={(e) => validateAndSetVendor("wcb_no", e.target.value)}
            id="wcbNo"
            placeholder="WCB#"
          />
          {errors.wcbNo && <small className="error">{errors.wcbNo}</small>}
        </div>
      </div>
    </fieldset>
  );
};

export default VendorAdditional;
