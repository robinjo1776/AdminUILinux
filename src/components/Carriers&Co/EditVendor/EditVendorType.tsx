import { Vendor } from "../../../types/VendorTypes";

interface EditVendorTypeProps {
  formVendor: Vendor; 
  setFormVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

const EditVendorType: React.FC<EditVendorTypeProps> = ({ formVendor, setFormVendor }) => {
  const vendorTypeOptions = ["Vendor", "Factoring Company"];

  return (
    <fieldset className="form-section">
      <legend>Vendor Type</legend>
      <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="carrType">Vendor Type*</label>
          <select
            name="carrType"
            value={formVendor.type}
            onChange={(e) =>
              setFormVendor((prev) => ({
                ...prev,
                type: e.target.value,
              }))
            }
            required
          >
            <option value="">Select..</option>
            {vendorTypeOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <input type="hidden" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <input type="hidden" />
        </div>
      </div>
    </fieldset>
  );
};

export default EditVendorType;
