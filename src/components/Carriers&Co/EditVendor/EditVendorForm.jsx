import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditVendorDetails from './EditVendorDetails';
import EditVendorPrimaryAddress from './EditVendorPrimaryAddress';
import EditVendorMailingAddress from './EditVendorMailingAddress';
import EditVendorAdditional from './EditVendorAdditional';
import EditVendorAR from './EditVendorAR';
import EditVendorAP from './EditVendorAP';
import EditVendorBanking from './EditVendorBanking';
import EditVendorCargoInsurance from './EditVendorCargoInsurance';
import EditVendorLiabilityInsurance from './EditVendorLiabilityInsurance';
import VendorContact from '../VendorContact';

function EditVendorForm({ vendor, onClose, onUpdate }) {
  const [formVendor, setFormVendor] = useState({
    id: '',
    type: '',
    legal_name: '',
    remit_name: '',
    vendor_type: '',
    service: '',
    primary_address: '',
    primary_city: '',
    primary_state: '',
    primary_country: '',
    primary_postal: '',
    primary_email: '',
    primary_phone: '',
    primary_fax: '',
    scac: '',
    docket_number: '',
    vendor_code: '',
    gst_hst_number: '',
    qst_number: '',
    ca_bond_number: '',
    website: '',
    mailing_address: '',
    mailing_city: '',
    mailing_state: '',
    mailing_country: '',
    mailing_postal: '',
    mailing_email: '',
    mailing_phone: '',
    mailing_fax: '',
    us_tax_id: '',
    payroll_no: '',
    wcb_no: '',
    ar_name: '',
    ar_email: '',
    ar_contact_no: '',
    ar_ext: '',
    ap_name: '',
    ap_email: '',
    ap_contact_no: '',
    ap_ext: '',
    bank_name: '',
    bank_phone: '',
    bank_email: '',
    bank_us_acc_no: '',
    bank_cdn_acc_no: '',
    bank_address: '',
    cargo_company: '',
    cargo_policy_start: '',
    cargo_policy_end: '',
    cargo_ins_amt: '',
    liab_company: '',
    liab_policy_start: '',
    liab_policy_end: '',
    liab_ins_amt: '',
    contacts: [{ name: '', phone: '', email: '', fax: '', ext: '', designation: '' }],
  });
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (vendor) {
      const parsedContacts = Array.isArray(vendor.contacts) ? vendor.contacts : JSON.parse(vendor.contacts || '[]');
      setFormVendor({
        ...vendor,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
      });
    }
  }, [vendor]);

  const validateVendor = () => {
    return formVendor.type;
  };

  const updateVendor = async () => {
    if (validateVendor()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You are not logged in. Please log in again.',
          });
          return;
        }

        const response = await axios.put(`${API_URL}/api/vendor/${formVendor.id}`, formVendor, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Vendor data has been updated successfully.',
        });
        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error updating vendor:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update vendor.',
        });
      }
    }
  };

  const handleAddContact = () => {
    setFormVendor((prevVendor) => ({
      ...prevVendor,
      contacts: [...(prevVendor.contacts || []), { name: '', phone: '', email: '', fax: '', designation: '' }],
    }));
  };

  const handleRemoveContact = (index) => {
    setFormVendor((prevVendor) => ({
      ...prevVendor,
      contacts: (prevVendor.contacts || []).filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = (formVendor.contacts || []).map((contact, i) => (i === index ? updatedContact : contact));
    setFormVendor((prevVendor) => ({
      ...prevVendor,
      contacts: updatedContacts,
    }));
  };

  const vendorTypeOptions = ['Vendor', 'Factoring Company'];

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateVendor();
        }}
        className="form-main"
      >
        <fieldset className="form-section">
          <legend>Vendor Type</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="carrType">Vendor Type*</label>
              <select
                name="carrType"
                value={formVendor.type}
                onChange={(e) =>
                  setFormVendor({
                    ...formVendor,
                    type: e.target.value,
                  })
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
          </div>
        </fieldset>
        <EditVendorDetails formVendor={formVendor} setFormVendor={setFormVendor} />
        <EditVendorPrimaryAddress formVendor={formVendor} setFormVendor={setFormVendor} />
        <EditVendorMailingAddress formVendor={formVendor} setFormVendor={setFormVendor} />
        <EditVendorAdditional formVendor={formVendor} setFormVendor={setFormVendor} />
        <EditVendorAR formVendor={formVendor} setFormVendor={setFormVendor} />
        <EditVendorAP formVendor={formVendor} setFormVendor={setFormVendor} />
        <EditVendorBanking formVendor={formVendor} setFormVendor={setFormVendor} />
        <EditVendorCargoInsurance formVendor={formVendor} setFormVendor={setFormVendor} />
        <EditVendorLiabilityInsurance formVendor={formVendor} setFormVendor={setFormVendor} />

        {/* Contacts */}
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {Array.isArray(formVendor.contacts) && formVendor.contacts.length > 0 ? (
              formVendor.contacts.map((contact, index) => (
                <VendorContact key={index} contact={contact} index={index} onChange={handleContactChange} onRemove={handleRemoveContact} />
              ))
            ) : (
              <p>No contacts available</p>
            )}
            <button type="button" onClick={handleAddContact} className="add">
              Add Contact
            </button>
          </div>
        </fieldset>

        <button type="submit" className="btn-submit">
          Update Vendor
        </button>
      </form>
    </div>
  );
}

export default EditVendorForm;
