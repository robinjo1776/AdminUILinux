import { DeleteOutlined } from '@ant-design/icons';

function ViewCustomerContact({ contact = {}, index }) {
  return (
    <fieldset className="form-section">
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Name</label>
          <div>{contact.name || ''}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Contact No</label>
          <div>{contact.phone || ''}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Contact No Ext</label>
          <div>{contact.ext || ''}</div>
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Email</label>
          <div>{contact.email || ''}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Fax</label>
          <div>{contact.fax || ''}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Designation</label>
          <div>{contact.designation || ''}</div>
        </div>
      </div>
   </fieldset>
  );
}

export default ViewCustomerContact;
