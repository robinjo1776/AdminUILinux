import { DeleteOutlined } from '@ant-design/icons';

function CustomerContact({ contact = {}, index, onChange, onRemove }) {
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    // Update contact with the new value
    const updatedContact = { ...contact, [name]: value };
    onChange(index, updatedContact);
  };
  return (
    <fieldset className="form-section">
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Name</label>
          <input type="text" name="name" value={contact.name || ''} onChange={handleContactChange} placeholder="Name" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Contact No</label>
          <input type="tel" name="phone" value={contact.phone || ''} onChange={handleContactChange} placeholder="Contact No" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Contact No Ext</label>
          <input type="text" name="ext" value={contact.ext || ''} onChange={handleContactChange} placeholder="Contact No Ext" />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Email</label>
          <input type="email" name="email" value={contact.email || ''} onChange={handleContactChange} placeholder="Email" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Fax</label>
          <input type="text" name="fax" value={contact.fax || ''} onChange={handleContactChange} placeholder="Fax" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Designation</label>
          <input type="text" name="designation" value={contact.designation || ''} onChange={handleContactChange} placeholder="Designation" />
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="trash-bottom"
        style={{ float: 'right', marginTop: '10px', display: 'inline-block' }}
      >
        <DeleteOutlined />
      </button>
    </fieldset>
  );
}

export default CustomerContact;
