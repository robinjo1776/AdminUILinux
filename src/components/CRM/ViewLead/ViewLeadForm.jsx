import { useState, useEffect} from 'react';
import '../../../styles/Form.css';
import ViewLeadDetails from './ViewLeadDetails';
import ViewAddressDetails from './ViewAddressDetails';
import ViewAdditionalInfo from './ViewAdditionalInfo';
import ViewLeadContactForm from './ViewLeadContactForm';

const ViewLeadForm = ({ lead, onClose }) => {
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
      <form className="form-main">
        <ViewLeadDetails formLead={formLead} />
        <ViewAddressDetails formLead={formLead}/>
        <ViewAdditionalInfo formLead={formLead} />
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
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewLeadForm;
