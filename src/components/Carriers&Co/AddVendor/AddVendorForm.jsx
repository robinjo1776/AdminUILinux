import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../styles/Form.css';
import VendorDetails from './VendorDetails';
import VendorPrimaryAddress from './VendorPrimaryAddress';
import VendorMailingAddress from './VendorMailingAddress';
import VendorCargoInsurance from './VendorCargoInsurance';
import VendorLiabilityInsurance from './VendorLiabilityInsurance';
import VendorAdditional from './VendorAdditional';
import VendorAR from './VendorAR';
import VendorAP from './VendorAP';
import VendorBanking from './VendorBanking';
import VendorContact from '../VendorContact';
import { PlusOutlined } from '@ant-design/icons';
import VendorType from './VendorType';

const AddVendorForm = ({ onClose, onAddVendor }) => {
  const [vendor, setVendor] = useState({
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
    contacts: [],
  });
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle changes in contacts, equipment, or lanes
  const handleAddContact = () => {
    setVendor((prevVendor) => ({
      ...prevVendor,
      contacts: [...(prevVendor.contacts || []), { name: '', phone: '', email: '', fax: '', designation: '' }],
    }));
  };

  const handleRemoveContact = (index) => {
    setVendor((prevVendor) => ({
      ...prevVendor,
      contacts: (prevVendor.contacts || []).filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = (vendor.contacts || []).map((contact, i) => (i === index ? updatedContact : contact));
    setVendor((prevVendor) => ({
      ...prevVendor,
      contacts: updatedContacts,
    }));
  };

  const validateVendor = () => {
    return vendor.type;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateVendor()) {
      try {
        let response;
        const token = localStorage.getItem('token');

        if (!token) {
          Swal.fire('Error', 'No token found', 'error');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        if (vendor.id) {
          response = await axios.put(`${API_URL}/vendor/${vendor.id}`, vendor, { headers });
          Swal.fire('Updated!', 'Vendor data has been updated successfully.', 'success');
        } else {
          response = await axios.post(`${API_URL}/vendor`, vendor, {
            headers,
          });
          Swal.fire('Saved!', 'Vendor data has been saved successfully.', 'success');
        }

        onAddVendor(response.data);
        clearVendorForm();
        onClose();
      } catch (error) {
        console.error('Error saving/updating vendor:', error.response ? error.response.data : error.message);
        Swal.fire('Error', 'An error occurred while saving/updating the vendor.', 'error');
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  const clearVendorForm = () => {
    setVendor({
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
      contacts: [],
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <VendorType vendor={vendor} setVendor={setVendor} />
        <VendorDetails vendor={vendor} setVendor={setVendor} />
        <VendorPrimaryAddress vendor={vendor} setVendor={setVendor} />
        <VendorMailingAddress vendor={vendor} setVendor={setVendor} />
        <VendorAdditional vendor={vendor} setVendor={setVendor} />
        <VendorAR vendor={vendor} setVendor={setVendor} />
        <VendorAP vendor={vendor} setVendor={setVendor} />
        <VendorBanking vendor={vendor} setVendor={setVendor} />
        <VendorCargoInsurance vendor={vendor} setVendor={setVendor} />
        <VendorLiabilityInsurance vendor={vendor} setVendor={setVendor} />

        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {Array.isArray(vendor.contacts) &&
              vendor.contacts.map((contact, index) => (
                <VendorContact
                  key={index}
                  contact={contact}
                  index={index}
                  handleContactChange={handleContactChange}
                  handleRemoveContact={handleRemoveContact}
                />
              ))}
            <button type="button" onClick={handleAddContact} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
          Add Vendor
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVendorForm;