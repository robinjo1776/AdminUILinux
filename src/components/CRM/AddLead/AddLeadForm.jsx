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

  const handleContactChange = (index, updatedContact) => {
    // When a contact changes, update the specific contact in the contacts array
    const updatedContacts = [...lead.contacts];
    updatedContacts[index] = updatedContact;
    setLead({ ...lead, contacts: updatedContacts }); // Set the updated contacts back into the state
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = lead.contacts.filter((_, i) => i !== index);
    setLead({ ...lead, contacts: updatedContacts });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

        if (lead.id) {
          response = await axios.put(`${API_URL}/lead/${lead.id}`, lead, { headers });
          Swal.fire('Updated!', 'Lead data has been updated successfully.', 'success');
        } else {
          response = await axios.post(`${API_URL}/lead`, lead, {
            headers,
          });
          Swal.fire('Saved!', 'Lead data has been saved successfully.', 'success');
        }

        onAddLead(response.data);
        clearLeadForm();
        onClose();
      } catch (error) {
        console.error('Error saving/updating lead:', error.response ? error.response.data : error.message);
        Swal.fire('Error', 'An error occurred while saving/updating the lead.', 'error');
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  const validateLead = () => {
    return lead.lead_no && lead.lead_date && lead.lead_type && lead.lead_status;
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
