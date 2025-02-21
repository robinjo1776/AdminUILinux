import { DeleteOutlined } from '@ant-design/icons';
import { ChangeEvent, useCallback } from 'react';
import { Contact } from '../../types/VendorTypes';

interface VendorContactProps {
  contacts: Contact[];
  index: number;
  onAddContact: () => void;
  handleContactChange: (index: number, updatedContact: Contact) => void;
  handleRemoveContact: (index: number) => void;
}

// Validation Functions
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^\+?[0-9\s-]{7,15}$/.test(phone);

const VendorContact: React.FC<VendorContactProps> = ({ contacts, index, onAddContact, handleContactChange, handleRemoveContact }) => {
  const contact = contacts[index]; // Get the specific contact

  const handleInputChange = useCallback(
    (field: keyof Contact) => (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.trim();

      if (field === 'email' && value && !validateEmail(value)) return;
      if (field === 'phone' && value && !validatePhone(value)) return;

      handleContactChange(index, { ...contact, [field]: value });
    },
    [contact, handleContactChange, index]
  );

  return (
    <fieldset className="form-section">
      <div>
        <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor={`name-${index}`}>Name</label>
            <input
              id={`name-${index}`}
              type="text"
              name="name"
              value={contact?.name || ''}
              onChange={handleInputChange('name')}
              placeholder="Enter name"
            />
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor={`phone-${index}`}>Phone</label>
            <input
              id={`phone-${index}`}
              type="tel"
              name="phone"
              value={contact?.phone || ''}
              onChange={handleInputChange('phone')}
              placeholder="Enter phone"
            />
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor={`email-${index}`}>Email</label>
            <input
              id={`email-${index}`}
              type="email"
              name="email"
              value={contact?.email || ''}
              onChange={handleInputChange('email')}
              placeholder="Enter email"
            />
          </div>
        </div>

        <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor={`fax-${index}`}>Fax</label>
            <input
              id={`fax-${index}`}
              type="text"
              name="fax"
              value={contact?.fax || ''}
              onChange={handleInputChange('fax')}
              placeholder="Enter fax"
            />
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor={`designation-${index}`}>Designation</label>
            <input
              id={`designation-${index}`}
              type="text"
              name="designation"
              value={contact?.designation || ''}
              onChange={handleInputChange('designation')}
              placeholder="Enter designation"
            />
          </div>
        </div>
      </div>

      <button type="button" onClick={() => handleRemoveContact(index)} className="trash-bottom" style={{ marginTop: '10px', flex: 1 }}>
        <DeleteOutlined />
      </button>
    </fieldset>
  );
};

export default VendorContact;
