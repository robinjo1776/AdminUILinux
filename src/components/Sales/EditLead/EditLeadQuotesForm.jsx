import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserContext } from '../../../UserProvider';
import LeadContactForm from '../LeadContactForm';
import EditLeadDetails from './EditLeadDetails';
import EditAddressDetails from './EditAddressDetails';
import EditAdditionalInfo from './EditAdditionalInfo';
import { PlusOutlined } from '@ant-design/icons';
import EditLqEquip from './EditLqEquip';

const EditLeadQuotesForm = ({ lead, onClose, onUpdate }) => {
  const users = useContext(UserContext);
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


  useEffect(() => {
    if (lead) {
      const parsedContacts = Array.isArray(lead.contacts) ? lead.contacts : JSON.parse(lead.contacts || '[]');
      setFormLead({
        ...lead,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
      });
    }
  }, [lead]);

  const validateLeadQuotes = () => {
    return formLead.lead_no && formLead.lead_date && formLead.lead_status;
  };

  const updateLead = async () => {
    if (validateLeadQuotes()) {
      try {
        // Get the token from localStorage or from the UserContext
        const token = localStorage.getItem('token');

        if (!token) {
          // If no token is found, show an alert and exit the function
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You are not logged in. Please log in again.',
          });
          return;
        }

        // Make the PUT request with the Authorization header
        const response = await axios.put(`${API_URL}/lead/${formLead.id}`, formLead, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Lead data has been updated successfully.',
        });

        // Call onUpdate to update the lead data in the parent component
        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error updating lead:', error);

        // Handle different errors, including the 401 Unauthorized
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update lead.',
        });
      }
    }
  };

  const handleAddContact = () => {
    setFormLead((prevLead) => ({
      ...prevLead,
      contacts: [...prevLead.contacts, { name: '', phone: '', email: '' }],
    }));
  };

  const handleRemoveContact = (index) => {
    setFormLead((prevLead) => ({
      ...prevLead,
      contacts: prevLead.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = formLead.contacts.map((contact, i) => (i === index ? updatedContact : contact));
    setFormLead((prevLead) => ({
      ...prevLead,
      contacts: updatedContacts,
    }));
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
        <EditLeadDetails formLead={formLead} setFormLead={setFormLead} />
        <EditAddressDetails formLead={formLead} setFormLead={setFormLead} />
        <EditAdditionalInfo formLead={formLead} setFormLead={setFormLead} />
        <EditLqEquip formLead={formLead} setFormLead={setFormLead} />
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

export default EditLeadQuotesForm;
