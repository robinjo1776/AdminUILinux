import { FC, useState } from "react";
import { Vendor } from "../../../types/VendorTypes";

interface VendorARProps {
  vendor: Vendor;
  setVendor: (vendor: Vendor) => void;
}

const VendorAR: FC<VendorARProps> = ({ vendor, setVendor }) => {
  const [errors, setErrors] = useState<{ arName?: string; arEmail?: string; arContactNo?: string; arExt?: string }>({});

  const validateAndSetVendor = (field: keyof Vendor, value: string) => {
    let error = "";
    let sanitizedValue = value.trim();

    switch (field) {
      case "ar_name":
        sanitizedValue = sanitizedValue.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabetic chars
        if (sanitizedValue.length < 2 || sanitizedValue.length > 50) {
          error = "Name must be between 2 and 50 alphabetic characters";
        }
        break;
      case "ar_email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedValue)) {
          error = "Invalid email format";
        }
        break;
      case "ar_contact_no":
        sanitizedValue = sanitizedValue.replace(/\D/g, ""); // Keep only numbers
        if (sanitizedValue.length < 7) error = "Contact number must be at least 7 digits";
        break;
      case "ar_ext":
        sanitizedValue = sanitizedValue.replace(/\D/g, ""); // Keep only numbers
        if (sanitizedValue && isNaN(Number(sanitizedValue))) error = "Extension must be numeric";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    setVendor({ ...vendor, [field]: sanitizedValue });
  };

  return (
    <fieldset className="form-section">
      <legend>Account Receivable Details</legend>
      <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
        {/* Name */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="arName">Name</label>
          <input
            type="text"
            value={vendor.ar_name}
            onChange={(e) => validateAndSetVendor("ar_name", e.target.value)}
            id="arName"
            placeholder="Name"
          />
          {errors.arName && <small className="error">{errors.arName}</small>}
        </div>

        {/* Email */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="arEmail">Email</label>
          <input
            type="text"
            value={vendor.ar_email}
            onChange={(e) => validateAndSetVendor("ar_email", e.target.value)}
            id="arEmail"
            placeholder="Email"
          />
          {errors.arEmail && <small className="error">{errors.arEmail}</small>}
        </div>

        {/* Contact No */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="arContactNo">Contact No</label>
          <input
            type="text"
            value={vendor.ar_contact_no}
            onChange={(e) => validateAndSetVendor("ar_contact_no", e.target.value)}
            id="arContactNo"
            placeholder="Contact No"
          />
          {errors.arContactNo && <small className="error">{errors.arContactNo}</small>}
        </div>

        {/* Extension */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="arExt">Ext</label>
          <input
            type="text"
            value={vendor.ar_ext}
            onChange={(e) => validateAndSetVendor("ar_ext", e.target.value)}
            id="arExt"
            placeholder="Ext"
          />
          {errors.arExt && <small className="error">{errors.arExt}</small>}
        </div>
      </div>
    </fieldset>
  );
};

export default VendorAR;
