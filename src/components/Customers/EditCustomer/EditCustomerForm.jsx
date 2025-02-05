import CustomerInfo from './CustomerInfo';
import PrimaryAddress from './PrimaryAddress';
import MailingAddress from './MailingAddress';
import AccountsPayable from './AccountsPayable';
import CustomBroker from './CustomBroker';
import CustomerCredit from './CustomerCredit';
import CustomerContact from './CustomerContact';
import CustomerEquipment from './CustomerEquipment';
import { PlusOutlined } from '@ant-design/icons';
import useCustomerHandler from './useCustomerHandler';

function EditCustomerForm({ customer, onClose, onUpdate }) {
  const { formCustomer, setformCustomer, updateCustomer } = useCustomerHandler({ customer, onClose, onUpdate });

  const sanitizeInput = (input) => input.replace(/[^\w\s]/g, '');

  const handleContactChange = (index, updatedContact) => {
    const sanitizedContact = {
      ...updatedContact,
      name: sanitizeInput(updatedContact.name),
      phone: updatedContact.phone,
      ext: updatedContact.ext,
      email: updatedContact.email,
      designation: sanitizeInput(updatedContact.designation),
    };
    const updatedContacts = [...formCustomer.cust_contact];
    updatedContacts[index] = sanitizedContact;
    setformCustomer({ ...formCustomer, cust_contact: updatedContacts });
  };

  const handleEquipmentChange = (index, updatedEquipment) => {
    const Equipment = {
      ...updatedEquipment,
      equipment: updatedEquipment.equipment,
    };
    const updatedEquipments = [...formCustomer.cust_equipment];
    updatedEquipments[index] = Equipment;
    setformCustomer({ ...formCustomer, cust_equipment: updatedEquipments });
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = formCustomer.cust_contact.filter((_, i) => i !== index);
    setformCustomer({ ...formCustomer, cust_contact: updatedContacts });
  };

  const handleRemoveEquipment = (index) => {
    const updatedEquipments = formCustomer.cust_equipment.filter((_, i) => i !== index);
    setformCustomer({ ...formCustomer, cust_equipment: updatedEquipments });
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCustomer();
        }}
        className="form-main"
      >
        <CustomerInfo formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <PrimaryAddress formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <MailingAddress formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <AccountsPayable formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <CustomBroker formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <CustomerCredit formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {formCustomer.cust_contact.map((contact, index) => (
              <CustomerContact key={index} contact={contact} index={index} onChange={handleContactChange} onRemove={handleRemoveContact} />
            ))}
            <button
              type="button"
              onClick={() =>
                setformCustomer((prevCustomer) => ({
                  ...prevCustomer,
                  cust_contact: [...prevCustomer.cust_contact, { name: '', phone: '', ext: '', email: '', fax: '', designation: '' }],
                }))
              }
              className="add-button"
            >
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Equipments</legend>
          <div className="form-row">
            {formCustomer.cust_equipment.map((equipment, index) => (
              <CustomerEquipment
                key={index}
                formCustomer={formCustomer}
                setformCustomer={setformCustomer}
                equipment={equipment}
                index={index}
                onChange={handleEquipmentChange}
                onRemove={handleRemoveEquipment}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setformCustomer((prevCustomer) => ({
                  ...prevCustomer,
                  cust_equipment: [
                    ...prevCustomer.cust_equipment,
                    {
                      equipment: '',
                    },
                  ],
                }))
              }
              className="add-button"
            >
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCustomerForm;
