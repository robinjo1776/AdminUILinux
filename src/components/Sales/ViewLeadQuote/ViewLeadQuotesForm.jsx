import { useState, useEffect } from 'react';
import ViewLeadDetails from './ViewLeadDetails';
import ViewAddressDetails from './ViewAddressDetails';
import ViewAdditionalInfo from './ViewAdditionalInfo';
import ViewLeadContactForm from './ViewLeadContactForm';
import ViewLqEquip from './ViewLqEquip';

const ViewLeadQuotesForm = ({ lead, onClose }) => {
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

  return (
    <div className="form-container">
      <form

        className="form-main"
      >
        <ViewLeadDetails formLead={formLead} setFormLead={setFormLead} />
        <ViewAddressDetails formLead={formLead} setFormLead={setFormLead} />
        <ViewAdditionalInfo formLead={formLead} setFormLead={setFormLead} />
        <ViewLqEquip formLead={formLead} setFormLead={setFormLead} />
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {formLead.contacts.map((contact, index) => (
              <ViewLeadContactForm key={index} contact={contact} index={index}  />
            ))}

          </div>
        </fieldset>

        <div className="form-actions">

          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewLeadQuotesForm;
