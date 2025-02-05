import { useContext, useState } from 'react';
import { UserContext } from '../../../UserProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import LeadContactForm from '../LeadContactForm';
import '../../../styles/Form.css';
import LeadDetails from './LeadDetails';
import AddressDetails from './AddressDetails';
import AdditionalInfo from './AdditionalInfo';
import { PlusOutlined } from '@ant-design/icons';

const AddLeadForm = ({ onClose, onAddLead }) => {
  const { currentUser } = useContext(UserContext);
  const [lead, setLead] = useState({
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
    lead_type: '',
    contact_person: '',
    notes: '',
    lead_status: '',
    follow_up_date: '',
    equipment_type: '',
    contacts: [],
  });

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Validation functions
  const sanitizeInput = (input) => input.replace(/[^\w\s]/g, '');

  const isValidUrl = (url) => /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(url);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\+?\(?\d{1,3}\)?[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/.test(phone);
  const isValidPostalCode = (postalCode) => /^[a-zA-Z0-9\s]{3,10}$/.test(postalCode);

  // Contact management
  const handleContactChange = (index, updatedContact) => {
    const sanitizedContact = {
      ...updatedContact,
      name: sanitizeInput(updatedContact.name),
      phone: updatedContact.phone,
      email: updatedContact.email,
    };
    const updatedContacts = [...lead.contacts];
    updatedContacts[index] = sanitizedContact;
    setLead({ ...lead, contacts: updatedContacts });
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = lead.contacts.filter((_, i) => i !== index);
    setLead({ ...lead, contacts: updatedContacts });
  };

  const validateContacts = () => {
    for (let contact of lead.contacts) {
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

  // Lead form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidUrl(lead.website)) {
      Swal.fire('Validation Error', 'Please enter a valid URL in the website field.', 'error');
      return;
    }

    if (!isValidEmail(lead.email)) {
      Swal.fire('Validation Error', 'Please enter a valid email address.', 'error');
      return;
    }

    if (lead.phone && !isValidPhone(lead.phone)) {
      Swal.fire('Validation Error', 'Please enter a valid phone number.', 'error');
      return;
    }

    if (lead.postal_code && !isValidPostalCode(lead.postal_code)) {
      Swal.fire('Validation Error', 'Please enter a valid postal code.', 'error');
      return;
    }

    if (!validateContacts()) return;

    if (validateLead()) {
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

        const sanitizedLead = sanitizeLead(lead);

        if (lead.id) {
          response = await axios.put(`${API_URL}/lead/${lead.id}`, sanitizedLead, { headers });
          Swal.fire('Updated!', 'Lead data has been updated successfully.', 'success');
        } else {
          response = await axios.post(`${API_URL}/lead`, sanitizedLead, { headers });
          Swal.fire('Saved!', 'Lead data has been saved successfully.', 'success');
        }

        onAddLead(response.data);
        clearLeadForm();
        onClose();
      } catch (error) {
        handleApiError(error);
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  const validateLead = () => {
    return lead.lead_no && lead.lead_date && lead.lead_type && lead.lead_status && lead.website;
  };

  const sanitizeLead = (lead) => {
    return {
      ...lead,
      lead_no: sanitizeInput(lead.lead_no),
      lead_date: lead.lead_date,
      customer_name: lead.customer_name,
      phone: lead.phone,
      email: lead.email,
      website: lead.website,
      address: lead.address,
      unit_no: lead.unit_no,
      city: sanitizeInput(lead.city),
      state: sanitizeInput(lead.state),
      country: sanitizeInput(lead.country),
      postal_code: sanitizeInput(lead.postal_code),
      lead_type: lead.lead_type,
      contact_person: sanitizeInput(lead.contact_person),
      notes: lead.notes,
      lead_status: lead.lead_status,
      follow_up_date: lead.follow_up_date,
      equipment_type: sanitizeInput(lead.equipment_type),
      contacts: lead.contacts.map((contact) => ({
        ...contact,
        name: sanitizeInput(contact.name),
        phone: contact.phone,
        email: contact.email,
      })),
    };
  };

  const handleApiError = (error) => {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessage = error.response.data.errors.website
        ? error.response.data.errors.website[0]
        : 'An error occurred while saving/updating the lead.';
      Swal.fire('Error', errorMessage, 'error');
    } else {
      console.error('Error saving/updating lead:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'An error occurred while saving/updating the lead.', 'error');
    }
  };

  const clearLeadForm = () => {
    setLead({
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
      lead_type: '',
      contact_person: '',
      notes: '',
      lead_status: '',
      follow_up_date: '',
      equipment_type: '',
      contacts: [],
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <LeadDetails lead={lead} setLead={setLead} />
        <AddressDetails lead={lead} setLead={setLead} />
        <AdditionalInfo lead={lead} setLead={setLead} />
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {lead.contacts.map((contact, index) => (
              <LeadContactForm key={index} contact={contact} index={index} onChange={handleContactChange} onRemove={handleRemoveContact} />
            ))}
            <button
              type="button"
              onClick={() =>
                setLead((prevLead) => ({
                  ...prevLead,
                  contacts: [...prevLead.contacts, { name: '', phone: '', email: '' }],
                }))
              }
              className="add-button"
            >
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Create Lead
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeadForm;
