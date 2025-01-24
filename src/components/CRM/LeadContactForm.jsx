import { DeleteOutlined } from '@ant-design/icons';
function LeadContactForm({ contact = {}, index, onChange, onRemove }) {
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    // Update contact with the new value
    const updatedContact = { ...contact, [name]: value };
    onChange(index, updatedContact);
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={contact.name || ''} onChange={handleContactChange} placeholder="Name" />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="tel" name="phone" value={contact.phone || ''} onChange={handleContactChange} placeholder="Phone" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={contact.email || ''} onChange={handleContactChange} placeholder="Email" />
      </div>

      <button type="button" onClick={() => onRemove(index)} className="remove">
        <DeleteOutlined />
      </button>
    </div>
  );
}

export default LeadContactForm;
