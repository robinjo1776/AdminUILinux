import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LeadContactForm from '../LeadContactForm';
import EditLeadDetails from './EditLeadDetails';
import EditAddressDetails from './EditAddressDetails';
import EditAdditionalInfo from './EditAdditionalInfo';
import { PlusOutlined } from '@ant-design/icons';

const EditLeadForm = ({ lead, onClose, onUpdate }) => {
  const [formLead, setFormLead] = useState({
    id: '',
    lead_no: '',
    lead_date: '',
    customer_name: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    unit_no: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    equipment_type: '',
    lead_type: '',
    lead_status: '',
    follow_up_date: '',
    assigned_to: '',
    contacts: [{ name: '', phone: '', email: '' }],
  });

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Initialize formLead state with data if 'lead' prop is provided
  useEffect(() => {
    if (lead) {
      const parsedContacts = Array.isArray(lead.contacts) ? lead.contacts : JSON.parse(lead.contacts || '[]');
      setFormLead({
        ...lead,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
      });
    }
  }, [lead]);

  // Sanitization function
  const sanitizeInput = (input) => {
    if (typeof input === 'string') {
      return input.replace(/[^\w\s]/g, '');
    }
    return input;
  };

  // Validation functions for URL, Email, Phone, Postal Code
  const isValidUrl = (url) => /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(url);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\+?\(?\d{1,3}\)?[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/.test(phone);
  const isValidPostalCode = (postalCode) => /^[a-zA-Z0-9\s]{3,10}$/.test(postalCode);

  // In the updateLead function, sanitize and handle contacts properly
  const updateLead = async () => {
    if (!isValidUrl(formLead.website)) {
      Swal.fire('Validation Error', 'Please enter a valid URL in the website field.', 'error');
      return;
    }

    if (!isValidEmail(formLead.email)) {
      Swal.fire('Validation Error', 'Please enter a valid email address.', 'error');
      return;
    }

    if (formLead.phone && !isValidPhone(formLead.phone)) {
      Swal.fire('Validation Error', 'Please enter a valid phone number.', 'error');
      return;
    }

    if (formLead.postal_code && !isValidPostalCode(formLead.postal_code)) {
      Swal.fire('Validation Error', 'Please enter a valid postal code.', 'error');
      return;
    }

    if (validateContacts() && validateLead()) {
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

        // Ensure contacts is always an array
        const sanitizedContacts = Array.isArray(formLead.contacts) ? formLead.contacts : [];

        // Sanitize fields before submitting
        const sanitizedLead = {
          ...formLead,
          lead_no: sanitizeInput(formLead.lead_no),
          lead_date: formLead.lead_date,
          customer_name: formLead.customer_name,
          phone: formLead.phone,
          email: formLead.email,
          website: formLead.website,
          address: formLead.address,
          unit_no: formLead.unit_no,
          city: sanitizeInput(formLead.city),
          state: sanitizeInput(formLead.state),
          country: sanitizeInput(formLead.country),
          postal_code: sanitizeInput(formLead.postal_code),
          lead_type: formLead.lead_type,
          contact_person: sanitizeInput(formLead.contact_person),
          notes: formLead.notes,
          lead_status: formLead.lead_status,
          follow_up_date: formLead.follow_up_date,
          equipment_type: sanitizeInput(formLead.equipment_type),
          assigned_to: formLead.assigned_to,
          contacts: sanitizedContacts.map((contact) => ({
            ...contact,
            name: sanitizeInput(contact.name),
            phone: contact.phone,
            email: contact.email,
          })),
        };

        // Send PUT request to update lead data
        const response = await axios.put(`${API_URL}/lead/${formLead.id}`, sanitizedLead, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Lead data has been updated successfully.',
        });

        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error updating lead:', error.response?.data || error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update lead.',
        });
      }
    }
  };

  // Handle adding a new contact
  const handleAddContact = () => {
    setFormLead((prevLead) => ({
      ...prevLead,
      contacts: [...prevLead.contacts, { name: '', phone: '', email: '' }],
    }));
  };

  // Handle contact change
  const handleContactChange = (index, updatedContact) => {
    const sanitizedContact = {
      ...updatedContact,
      name: sanitizeInput(updatedContact.name),
      phone: updatedContact.phone,
      email: updatedContact.email,
    };
    const updatedContacts = [...formLead.contacts];
    updatedContacts[index] = sanitizedContact;
    setFormLead({ ...formLead, contacts: updatedContacts });
  };

  // Handle removing a contact
  const handleRemoveContact = (index) => {
    const updatedContacts = formLead.contacts.filter((_, i) => i !== index);
    setFormLead({ ...formLead, contacts: updatedContacts });
  };

  // Validate contacts
  const validateContacts = () => {
    for (let contact of formLead.contacts) {
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

  // Validate lead data
  const validateLead = () => {
    return formLead.lead_no && formLead.lead_date && formLead.lead_type && formLead.lead_status && formLead.website;
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateLead();
        }}
        className="form-main"
      >
        {/* Edit Lead Details */}
        <EditLeadDetails formLead={formLead} setFormLead={setFormLead} />
        {/* Edit Address Details */}
        <EditAddressDetails formLead={formLead} setFormLead={setFormLead} />
        {/* Edit Additional Information */}
        <EditAdditionalInfo formLead={formLead} setFormLead={setFormLead} />

        {/* Contacts */}
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {formLead.contacts.map((contact, index) => (
              <LeadContactForm key={index} contact={contact} index={index} onChange={handleContactChange} onRemove={handleRemoveContact} />
            ))}
            <button type="button" onClick={handleAddContact} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLeadForm;
