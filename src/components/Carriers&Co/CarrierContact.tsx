import { DeleteOutlined } from '@ant-design/icons';

interface Contact {
  name: string;
  phone: string;
  email: string;
  fax: string;
  designation: string;
}

interface CarrierContactProps {
  contact: Contact;
  index: number;
  handleContactChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveContact: (index: number) => void;
}

const CarrierContact: React.FC<CarrierContactProps> = ({ contact, index, handleContactChange, handleRemoveContact }) => {
  const sanitizeInput = (value: string) => value.replace(/[^a-zA-Z0-9@.\s-]/g, '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleContactChange(index, { ...e, target: { ...e.target, value: sanitizeInput(value) } });
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this contact?')) {
      handleRemoveContact(index);
    }
  };

  return (
    <fieldset className="form-section">
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor={`name-${index}`}>Name</label>
          <input id={`name-${index}`} type="text" name="name" value={contact.name || ''} onChange={handleInputChange} placeholder="Name" required />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor={`phone-${index}`}>Contact No</label>
          <input
            id={`phone-${index}`}
            type="tel"
            name="phone"
            value={contact.phone || ''}
            onChange={handleInputChange}
            placeholder="Contact No"
            pattern="^[0-9+\-\s()]*$"
            title="Only numbers, spaces, parentheses, and dashes are allowed."
            required
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor={`email-${index}`}>Email</label>
          <input
            id={`email-${index}`}
            type="email"
            name="email"
            value={contact.email || ''}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor={`fax-${index}`}>Fax</label>
          <input id={`fax-${index}`} type="text" name="fax" value={contact.fax || ''} onChange={handleInputChange} placeholder="Fax" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor={`designation-${index}`}>Designation</label>
          <input
            id={`designation-${index}`}
            type="text"
            name="designation"
            value={contact.designation || ''}
            onChange={handleInputChange}
            placeholder="Designation"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleRemove}
        style={{ background: 'red', color: 'white', marginTop: '1rem', padding: '0.5rem', border: 'none', cursor: 'pointer' }}
      >
        Remove <DeleteOutlined />
      </button>
    </fieldset>
  );
};

export default CarrierContact;
