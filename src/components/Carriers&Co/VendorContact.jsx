function VendorContact({ contact = {}, index, onChange, onRemove }) {
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    // Update the contact object with the new field value
    const updatedContact = { ...contact, [name]: value };
    onChange(index, updatedContact); // Notify parent component of the change
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label htmlFor={`name-${index}`}>Name</label>
        <input type="text" name="name" id={`name-${index}`} value={contact.name || ''} onChange={handleContactChange} placeholder="Enter name" />
      </div>

      <div className="form-group">
        <label htmlFor={`phone-${index}`}>Phone</label>
        <input type="tel" name="phone" id={`phone-${index}`} value={contact.phone || ''} onChange={handleContactChange} placeholder="Enter phone" />
      </div>

      <div className="form-group">
        <label htmlFor={`email-${index}`}>Email</label>
        <input type="email" name="email" id={`email-${index}`} value={contact.email || ''} onChange={handleContactChange} placeholder="Enter email" />
      </div>

      <div className="form-group">
        <label htmlFor={`fax-${index}`}>Fax</label>
        <input type="text" name="fax" id={`fax-${index}`} value={contact.fax || ''} onChange={handleContactChange} placeholder="Enter fax" />
      </div>

      <div className="form-group">
        <label htmlFor={`designation-${index}`}>Designation</label>
        <input
          type="text"
          name="designation"
          id={`designation-${index}`}
          value={contact.designation || ''}
          onChange={handleContactChange}
          placeholder="Enter designation"
        />
      </div>

      <button type="button" onClick={() => onRemove(index)} className="remove">
        Remove Contact
      </button>
    </div>
  );
}

export default VendorContact;
