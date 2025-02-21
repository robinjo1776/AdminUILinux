import { FC } from "react";
import { Carrier } from "../../../types/CarrierTypes";

interface ViewGeneralProps {
  formCarrier: Carrier;
}

const ViewGeneral: FC<ViewGeneralProps> = ({ formCarrier }) => {
  return (
    <fieldset className="form-section">
      <legend>General</legend>

      <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="dba">DBA</label>
          <span>{formCarrier.dba || "N/A"}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">Legal Name</label>
          <span>{formCarrier.legal_name || "N/A"}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Remit Name</label>
          <span>{formCarrier.remit_name || "N/A"}</span>
        </div>
      </div>

      <div className="form-row" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Account Number</label>
          <span>{formCarrier.acc_no || "N/A"}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="branch">Branch</label>
          <span>{formCarrier.branch || "N/A"}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="website">Website</label>
          <span>{formCarrier.website || "N/A"}</span>
        </div>
      </div>

      <div className="form-row" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="fedIdNo">Federal ID Number</label>
          <span>{formCarrier.fed_id_no || "N/A"}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="creditStatus">Preferred Currency</label>
          <span>{formCarrier.pref_curr || "N/A"}</span>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="payTerms">Payment Terms</label>
          <span>{formCarrier.pay_terms || "N/A"}</span>
        </div>
      </div>

      <div className="form-row" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
            1099
            <span>{formCarrier.form_1099 ? "Yes" : "No"}</span>
          </label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
            Advertise
            <span>{formCarrier.advertise ? "Yes" : "No"}</span>
          </label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="advertiseEmail">Advertise Email</label>
          <span>{formCarrier.advertise_email || "N/A"}</span>
        </div>
      </div>
    </fieldset>
  );
};

export default ViewGeneral;
