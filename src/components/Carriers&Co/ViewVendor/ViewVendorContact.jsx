import { DeleteOutlined } from '@ant-design/icons';

function ViewVendorContact({ contact, index }) {
  return (
    <fieldset className="form-section">
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Name</label>
          <p>{contact.name || 'N/A'}</p>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Phone</label>
          <p>{contact.phone || 'N/A'}</p>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Email</label>
          <p>{contact.email || 'N/A'}</p>
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Fax</label>
          <p>{contact.fax || 'N/A'}</p>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Designation</label>
          <p>{contact.designation || 'N/A'}</p>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewVendorContact;
