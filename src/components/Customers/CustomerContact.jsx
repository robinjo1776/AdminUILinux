function CustomerContact({ contact = {}, index, onChange, onRemove }) {
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    // Update contact with the new value
    const updatedContact = { ...contact, [name]: value };
    onChange(index, updatedContact); // Inform parent component to update state
  };

  return (
    <div className="contact-entry">
      <div className="form-group">
        <label>Contact Name</label>
        <input type="text" name="name" value={contact.name || ''} onChange={handleContactChange} />
      </div>

      <div className="form-group">
        <label>Contact No</label>
        <input type="tel" name="phone" value={contact.phone || ''} onChange={handleContactChange} />
      </div>

      <div className="form-group">
        <label>Contact No Ext</label>
        <input type="text" name="ext" value={contact.ext || ''} onChange={handleContactChange} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={contact.email || ''} onChange={handleContactChange} />
      </div>

      <div className="form-group">
        <label>Fax</label>
        <input type="text" name="fax" value={contact.fax || ''} onChange={handleContactChange} />
      </div>

      <div className="form-group">
        <label>Designation</label>
        <input type="text" name="designation" value={contact.designation || ''} onChange={handleContactChange} />
      </div>

      <button type="button" onClick={() => onRemove(index)} className="remove">
        Remove
      </button>
    </div>
  );
}

export default CustomerContact;
