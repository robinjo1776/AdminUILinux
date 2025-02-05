import { useState, useEffect } from 'react';
import ViewFuInfo from './ViewFuInfo';
import ViewFuAddress from './ViewFuAddress';
import ViewFuLeadType from './ViewFuLeadType';
import ViewFuAddInfo from './ViewFuAddInfo';
import ViewFuDetail from './ViewFuDetail';
import ViewFuContactForm from './ViewFuContactForm';
import ViewFuProductForm from './ViewFuProductForm';

const ViewFuForm = ({ followUp, onClose }) => {
  const [followupEdit, setFolloupEdit] = useState({
    id: '',
    lead_no: '',
    lead_date: '',
    customer_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    unit_no: '',
    lead_type: '',
    contact_person: '',
    notes: '',
    next_follow_up_date: '',
    followup_type: '',
    products: [],
    lead_status: '',
    remarks: '',
    equipment: '',
    contacts: [],
  });

  useEffect(() => {
    if (followUp) {
      const parsedContacts = Array.isArray(followUp.contacts) ? followUp.contacts : JSON.parse(followUp.contacts || '[]');
      const parsedProducts = Array.isArray(followUp.products) ? followUp.products : JSON.parse(followUp.products || '[]');
      setFolloupEdit({
        ...followUp,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
        products: parsedProducts.length > 0 ? parsedProducts : [],
      });
    }
  }, [followUp]);

  return (
    <div className="form-container">
      <form className="form-main">
        <ViewFuInfo followupEdit={followupEdit} />
        <ViewFuAddress followupEdit={followupEdit} />
        <ViewFuLeadType followupEdit={followupEdit} />
        <ViewFuDetail followupEdit={followupEdit} />
        <ViewFuAddInfo followupEdit={followupEdit}/>
        <fieldset className="form-section">
          <legend>Contacts</legend>
          {followupEdit.contacts.map((contact, index) => (
            <ViewFuContactForm key={index} index={index} contact={contact}  />
          ))}
 
        </fieldset>

        <fieldset className="form-section">
          <legend>Products</legend>
          {followupEdit.products.map((product, index) => (
            <ViewFuProductForm key={index} index={index} product={product}  />
          ))}

        </fieldset>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewFuForm;
