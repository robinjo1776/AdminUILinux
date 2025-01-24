import { DeleteOutlined } from '@ant-design/icons';

function CustomerContact({ contact, index, handleContactChange, handleRemoveContact }) {
  return (
    <fieldset className="form-section">
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={contact.name || ''}
            onChange={(e) => handleContactChange(index, { ...contact, name: e.target.value })}
            placeholder="Name"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Contact No</label>
          <input
            type="tel"
            name="phone"
            value={contact.phone || ''}
            onChange={(e) => handleContactChange(index, { ...contact, phone: e.target.value })}
            placeholder="Contact No"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Contact No Ext</label>
          <input
            type="text"
            name="ext"
            value={contact.ext || ''}
            onChange={(e) => handleContactChange(index, { ...contact, ext: e.target.value })}
            placeholder="Contact No Ext"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={contact.email || ''}
            onChange={(e) => handleContactChange(index, { ...contact, email: e.target.value })}
            placeholder="Email"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Fax</label>
          <input
            type="text"
            name="fax"
            value={contact.fax || ''}
            onChange={(e) => handleContactChange(index, { ...contact, fax: e.target.value })}
            placeholder="Fax"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={contact.designation || ''}
            onChange={(e) => handleContactChange(index, { ...contact, designation: e.target.value })}
            placeholder="Designation"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => handleRemoveContact(index)}
        className="remove"
        style={{ float: 'right', marginTop: '10px', display: 'inline-block' }}
      >
        <DeleteOutlined />
      </button>
    </fieldset>
  );
}

export default CustomerContact;
