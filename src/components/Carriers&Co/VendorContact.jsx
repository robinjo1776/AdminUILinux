import { DeleteOutlined } from '@ant-design/icons';

function VendorContact({ contact, index, handleContactChange, handleRemoveContact }) {
  return (
    <fieldset className="form-section">
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor={`name-${index}`}>Name</label>
          <input
            type="text"
            name="name"
            value={contact.name || ''}
            onChange={(e) => handleContactChange(index, { ...contact, name: e.target.value })}
            placeholder="Enter name"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor={`phone-${index}`}>Phone</label>
          <input
            type="tel"
            name="phone"
            value={contact.phone || ''}
            onChange={(e) => handleContactChange(index, { ...contact, phone: e.target.value })}
            placeholder="Enter phone"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor={`email-${index}`}>Email</label>
          <input
            type="email"
            name="email"
            value={contact.email || ''}
            onChange={(e) => handleContactChange(index, { ...contact, email: e.target.value })}
            placeholder="Enter email"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor={`fax-${index}`}>Fax</label>
          <input
            type="text"
            name="fax"
            value={contact.fax || ''}
            onChange={(e) => handleContactChange(index, { ...contact, fax: e.target.value })}
            placeholder="Enter fax"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor={`designation-${index}`}>Designation</label>
          <input
            type="text"
            name="designation"
            value={contact.designation || ''}
            onChange={(e) => handleContactChange(index, { ...contact, designation: e.target.value })}
            placeholder="Enter designation"
          />
        </div>

        <button
          type="button"
          onClick={() => handleRemoveContact(index)}
          className="trash-bottom"
          style={{ float: 'right', marginTop: '10px', display: 'inline-block', flex: 1 }}
        >
          <DeleteOutlined />
        </button>
      </div>
    </fieldset>
  );
}

export default VendorContact;
