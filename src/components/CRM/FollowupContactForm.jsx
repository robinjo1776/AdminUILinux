function FollowupContactForm({ formFollowup, setformFollowup }) {
  const handleAddContact = () => {
    setformFollowup((prev) => ({
      ...prev,
      contacts: [
        ...prev.contacts,
        {
          name: '',
          phone: '',
          email: '',
        },
      ],
    }));
  };

  const handleRemoveContact = (index) => {
    setformFollowup((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = formFollowup.contacts.map((contact, i) => (i === index ? { ...contact, [name]: value } : contact));
    setformFollowup((prev) => ({ ...prev, contacts: updatedContacts }));
  };

  return (
    <fieldset>
      {formFollowup.contacts.map((contact, index) => (
        <div key={index} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name" // Ensure the name attribute is present
              value={contact.name}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone" // Ensure the name attribute is present
              value={contact.phone}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email" // Ensure the name attribute is present
              value={contact.email}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>

          <button type="button" onClick={() => handleRemoveContact(index)} className="remove">
            Remove
          </button>
        </div>
      ))}
    </fieldset>
  );
}

export default FollowupContactForm;
