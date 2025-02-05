import { DeleteOutlined } from '@ant-design/icons';

function ViewLeadContactForm({ contact = {} }) {
  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Name</label>
        <p>{contact.name || 'N/A'}</p>
      </div>
      <div className="form-group">
        <label>Phone</label>
        <p>{contact.phone || 'N/A'}</p>
      </div>
      <div className="form-group">
        <label>Email</label>
        <p>{contact.email || 'N/A'}</p>
      </div>
    </div>
  );
}

export default ViewLeadContactForm;
