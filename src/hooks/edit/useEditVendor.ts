import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Vendor, Contact } from '../../types/VendorTypes';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const useEditVendor = (vendor: Vendor | null, onClose: () => void, onUpdate: (vendor: Vendor) => void) => {
  const [formVendor, setFormVendor] = useState<Vendor>({
    id: 0,
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
    sameAsPrimary: false,
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
    cargo_ins_amt: 0,
    liab_company: '',
    liab_policy_start: '',
    liab_policy_end: '',
    liab_ins_amt: 0,
    contacts: [],
    created_at: '',
    updated_at: '',
  });

  useEffect(() => {
    if (vendor) {
      const parsedContacts = Array.isArray(vendor.contacts) ? vendor.contacts : JSON.parse(vendor.contacts || '[]');
      setFormVendor({ ...vendor, contacts: parsedContacts.length > 0 ? parsedContacts : [] });
    }
  }, [vendor]);

  const validateVendor = () => formVendor?.type;

  const updateVendor = async () => {
    if (validateVendor() && formVendor) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'You are not logged in. Please log in again.' });
          return;
        }

        const response = await axios.put(`${API_URL}/vendor/${formVendor.id}`, formVendor, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Vendor data has been updated successfully.' });
        onUpdate(response.data);
        onClose();
      } catch (error: any) {
        console.error('Error updating vendor:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update vendor.',
        });
      }
    }
  };

  const handleAddContact = () => {
    setFormVendor((prevVendor) =>
      prevVendor ? { ...prevVendor, contacts: [...prevVendor.contacts, { name: '', phone: '', email: '', fax: '', designation: '' }] } : prevVendor
    );
  };

  const handleRemoveContact = (index: number) => {
    setFormVendor((prevVendor) => (prevVendor ? { ...prevVendor, contacts: prevVendor.contacts.filter((_, i) => i !== index) } : prevVendor));
  };

  const handleContactChange = (index: number, updatedContact: Contact) => {
    setFormVendor((prevVendor) =>
      prevVendor ? { ...prevVendor, contacts: prevVendor.contacts.map((contact, i) => (i === index ? updatedContact : contact)) } : prevVendor
    );
  };

  return {
    formVendor,
    setFormVendor,
    updateVendor,
    handleAddContact,
    handleRemoveContact,
    handleContactChange,
  };
};
export default useEditVendor