import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useOrderHandler = ({ customer, onClose, onUpdate }) => {
  const [formCustomer, setformCustomer] = useState({
    id: '',
    cust_type: '',
    cust_name: '',
    cust_ref_no: '',
    cust_website: '',
    cust_email: '',
    cust_contact_no: '',
    cust_contact_no_ext: '',
    cust_tax_id: '',
    cust_primary_address: '',
    cust_primary_city: '',
    cust_primary_state: '',
    cust_primary_country: '',
    cust_primary_postal: '',
    cust_primary_unit_no: '',
    sameAsPrimary: false,
    cust_mailing_address: '',
    cust_mailing_city: '',
    cust_mailing_state: '',
    cust_mailing_country: '',
    cust_mailing_postal: '',
    cust_mailing_unit_no: '',
    cust_ap_name: '',
    cust_ap_address: '',
    cust_ap_city: '',
    cust_ap_state: '',
    cust_ap_country: '',
    cust_ap_postal: '',
    cust_ap_unit_no: '',
    cust_ap_email: '',
    cust_ap_phone: '',
    cust_ap_phone_ext: '',
    cust_ap_fax: '',
    cust_broker_name: '',
    cust_bkp_notes: '',
    cust_bkspl_notes: '',
    cust_credit_status: '',
    cust_credit_mop: '',
    cust_credit_appd: '',
    cust_credit_expd: '',
    cust_credit_terms: '',
    cust_credit_limit: '',
    cust_credit_notes: '',
    cust_credit_application: false,
    cust_credit_currency: '',
    cust_sbk_agreement: '',
    cust_credit_agreement: '',
    cust_contact: [{ name: '', phone: '', ext: '', email: '', fax: '', designation: '' }],
    cust_equipment: [{ equipment: '' }],
  });
  var API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  useEffect(() => {
    if (customer) {
      console.log('Customer data:', customer);
      const parsedContacts = Array.isArray(customer.cust_contact) ? customer.cust_contact : JSON.parse(customer.cust_contact || '[]');
      const parsedEquipment = Array.isArray(customer.cust_equipment) ? customer.cust_equipment : JSON.parse(customer.cust_equipment || '[]');
      console.log('Parsed Contacts:', parsedContacts);

      setformCustomer({
        ...customer,
        cust_contact: Array.isArray(parsedContacts) ? parsedContacts : [],
        cust_equipment: Array.isArray(parsedEquipment) ? parsedEquipment : [],
      });
    }
  }, [customer]);

  // Validation functions
  const sanitizeInput = (input) => (input && typeof input === 'string' ? input.replace(/[^\w\s]/g, '') : '');

  const isValidPhone = (phone) => /^\+?\(?\d{1,3}\)?[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/.test(phone);
  const isValidPostalCode = (postalCode) => /^[a-zA-Z0-9\s]{3,10}$/.test(postalCode);
  const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  const isValidWebsite = (url) => /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/.test(url);

  const validateContacts = () => {
    for (let contact of formCustomer.cust_contact) {
      if (contact.phone && !isValidPhone(contact.phone)) {
        Swal.fire('Validation Error', `Please enter a valid phone number for ${contact.name}.`, 'error');
        return false;
      }
      if (contact.email && !isValidEmail(contact.email)) {
        Swal.fire('Validation Error', `Please enter a valid email for ${contact.name}.`, 'error');
        return false;
      }
    }
    return true;
  };

  // const validateCustomer = () => {
  //   if (formCustomer.cust_website && !isValidWebsite(formCustomer.cust_website)) {
  //     Swal.fire('Validation Error', `Please enter a valid website url for ${formCustomer.cust_name}.`, 'error');
  //     return false;
  //   }
  //   return true;
  // };

  const updateCustomer = async () => {
    if (!formCustomer.cust_name) {
      Swal.fire('Validation Error', 'Customer name is required.', 'error');
      return;
    }

    if (formCustomer.cust_website && !isValidWebsite(formCustomer.cust_website)) {
      Swal.fire('Validation Error', 'Please enter a valid website URL.', 'error');
      return;
    }

    if (formCustomer.cust_email && !isValidEmail(formCustomer.cust_email)) {
      Swal.fire('Validation Error', 'Please enter a valid email.', 'error');
      return;
    }

    if (formCustomer.cust_contact_no && !isValidPhone(formCustomer.cust_contact_no)) {
      Swal.fire('Validation Error', 'Please enter a valid contact number.', 'error');
      return;
    }

    if (formCustomer.cust_primary_postal && !isValidPostalCode(formCustomer.cust_primary_postal)) {
      Swal.fire('Validation Error', 'Please enter a valid primary postal code.', 'error');
      return;
    }

    if (formCustomer.cust_mailing_postal && !isValidPostalCode(formCustomer.cust_mailing_postal)) {
      Swal.fire('Validation Error', 'Please enter a valid mailing postal code.', 'error');
      return;
    }

    if (formCustomer.cust_ap_email && !isValidEmail(formCustomer.cust_ap_email)) {
      Swal.fire('Validation Error', 'Please enter a valid AP email.', 'error');
      return;
    }

    if (formCustomer.cust_ap_phone && !isValidPhone(formCustomer.cust_ap_phone)) {
      Swal.fire('Validation Error', 'Please enter a valid AP phone number.', 'error');
      return;
    }

    if (!validateContacts()) return;

    if (validateCustomer()) {
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

        const sanitizedCustomer = sanitizeCustomer(formCustomer);
        const response = await axios.put(`${API_URL}/customer/${formCustomer.id}`, sanitizedCustomer, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Customer data has been updated successfully.',
        });

        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error updating customer:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update customer.',
        });
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  const validateCustomer = () => {
    return formCustomer.cust_name;
  };

  const sanitizeCustomer = (formCustomer) => {
    return {
      ...formCustomer,
      cust_type: sanitizeInput(formCustomer.cust_type),
      cust_name: formCustomer.cust_name,
      cust_ref_no: formCustomer.cust_ref_no,
      cust_website: formCustomer.cust_website,
      cust_email: formCustomer.cust_email,
      cust_contact_no: formCustomer.cust_contact_no,
      cust_contact_no_ext: formCustomer.cust_contact_no_ext,
      cust_tax_id: sanitizeInput(formCustomer.cust_tax_id),
      cust_primary_address: sanitizeInput(formCustomer.cust_primary_address),
      cust_primary_city: sanitizeInput(formCustomer.cust_primary_city),
      cust_primary_state: sanitizeInput(formCustomer.cust_primary_state),
      cust_primary_country: sanitizeInput(formCustomer.cust_primary_country),
      cust_primary_postal: formCustomer.cust_primary_postal,
      cust_primary_unit_no: sanitizeInput(formCustomer.cust_primary_unit_no),
      cust_ap_name: formCustomer.cust_ap_name,
      cust_ap_address: sanitizeInput(formCustomer.cust_ap_address),
      cust_ap_city: sanitizeInput(formCustomer.cust_ap_city),
      cust_ap_state: sanitizeInput(formCustomer.cust_ap_state),
      cust_ap_country: sanitizeInput(formCustomer.cust_ap_country),
      cust_ap_postal: formCustomer.cust_ap_postal,
      cust_ap_unit_no: sanitizeInput(formCustomer.cust_ap_unit_no),
      cust_ap_email: formCustomer.cust_ap_email,
      cust_ap_phone: formCustomer.cust_ap_phone,
      cust_ap_phone_ext: formCustomer.cust_ap_phone_ext,
      cust_ap_fax: formCustomer.cust_ap_fax,
      cust_broker_name: formCustomer.cust_broker_name,
      cust_bkp_notes: formCustomer.cust_bkp_notes,
      cust_bkspl_notes: formCustomer.cust_bkspl_notes,
      cust_credit_status: sanitizeInput(formCustomer.cust_credit_status),
      cust_credit_mop: sanitizeInput(formCustomer.cust_credit_mop),
      cust_credit_appd: formCustomer.cust_credit_appd,
      cust_credit_expd: formCustomer.cust_credit_expd,
      cust_credit_terms: sanitizeInput(formCustomer.cust_credit_terms),
      cust_credit_limit: sanitizeInput(formCustomer.cust_credit_limit),
      cust_credit_notes: formCustomer.cust_credit_notes,
      cust_credit_application: formCustomer.cust_credit_application,
      cust_credit_currency: sanitizeInput(formCustomer.cust_credit_currency),
      cust_sbk_agreement: formCustomer.cust_sbk_agreement,
      cust_credit_agreement: formCustomer.cust_credit_agreement,

      cust_contact: formCustomer.cust_contact.map((contact) => ({
        ...contact,
        name: contact.name,
        phone: contact.phone,
        ext: contact.ext,
        email: contact.email,
        fax: contact.fax,
        designation: contact.designation,
      })),

      cust_equipment: formCustomer.cust_equipment.map((equipment) => ({
        ...equipment,
        equipment: sanitizeInput(equipment.equipment),
      })),
    };
  };

  const handleApiError = (error) => {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessage = error.response.data.errors.website
        ? error.response.data.errors.website[0]
        : 'An error occurred while saving/updating the customer.';
      Swal.fire('Error', errorMessage, 'error');
    } else {
      console.error('Error saving/updating customer:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'An error occurred while saving/updating the customer.', 'error');
    }
  };

  return {
    formCustomer,
    setformCustomer,
    updateCustomer,
  };
};

export default useOrderHandler;
