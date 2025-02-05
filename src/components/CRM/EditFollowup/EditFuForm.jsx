import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditFuAddress from './EditFuAddress';
import EditFuLeadType from './EditFuLeadType';
import EditFuDetail from './EditFuDetail';
import EditFuAddInfo from './EditFuAddInfo';
import EditFuInfo from './EditFuInfo';
import { PlusOutlined } from '@ant-design/icons';
import FuContactForm from '../FuContactForm';
import FuProductForm from '../FuProductForm';

const EditFuForm = ({ followUp, onClose, onUpdate }) => {
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

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const addressRef = useRef(null);

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

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && window.google.maps) {
          initializeAutocomplete();
        }
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  const sanitizeInput = (input) => {
    if (typeof input === 'string') {
      return input.replace(/[^\w\s]/g, '');
    }
    return input;
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\+?\(?\d{1,3}\)?[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/.test(phone);
  const isValidPostalCode = (postalCode) => /^[a-zA-Z0-9\s]{3,10}$/.test(postalCode);

  const handleAddContact = () => {
    setFolloupEdit((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { name: '', phone: '', email: '' }],
    }));
  };

  const handleAddProduct = () => {
    setFolloupEdit((prev) => ({
      ...prev,
      products: [...prev.products, { name: '', quantity: '' }],
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const sanitizedContact = {
      ...updatedContact,
      name: sanitizeInput(updatedContact.name),
      phone: updatedContact.phone,
      email: updatedContact.email,
    };
    const updatedContacts = [...followupEdit.contacts];
    updatedContacts[index] = sanitizedContact;
    setFolloupEdit({ ...followupEdit, contacts: updatedContacts });
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = followupEdit.contacts.filter((_, i) => i !== index);
    setFolloupEdit({ ...followupEdit, contacts: updatedContacts });
  };

  const handleProductChange = (index, updatedProduct) => {
    const sanitizedProduct = {
      ...updatedProduct,
      name: sanitizeInput(updatedProduct.name),
      quantity: updatedProduct.quantity,
    };
    const updatedProducts = [...followupEdit.products];
    updatedProducts[index] = sanitizedProduct;
    setFolloupEdit({ ...followupEdit, products: updatedProducts });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = followupEdit.products.filter((_, i) => i !== index);
    setFolloupEdit({ ...followupEdit, products: updatedProducts });
  };

  const initializeAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;
    const formattedAddress = place.formatted_address || '';

    setFolloupEdit((prevLead) => ({
      ...prevLead,
      address: formattedAddress,
      city: getComponent('locality', '', addressComponents),
      state: getComponent('administrative_area_level_1', '', addressComponents),
      country: getComponent('country', '', addressComponents),
      postal_code: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  const validateContacts = () => {
    for (let contact of followupEdit.contacts) {
      if (contact.phone && !isValidPhone(contact.phone)) {
        Swal.fire('Validation Error', `Please enter a valid phone number for ${contact.name}.`, 'error');
        return false;
      }
      if (contact.email && !isValidEmail(contact.email)) {
        Swal.fire('Validation Error', `Please enter a valid email for ${contact.name}.`, 'error');
        return false;
      }
    }
    return true;
  };

  const validateFollowup = () => {
    return followupEdit.lead_no && followupEdit.lead_date && followupEdit.lead_status;
  };

  const updateFollowup = async () => {
    if (!isValidEmail(followupEdit.email)) {
      Swal.fire('Validation Error', 'Please enter a valid email address.', 'error');
      return;
    }

    if (followupEdit.phone && !isValidPhone(followupEdit.phone)) {
      Swal.fire('Validation Error', 'Please enter a valid phone number.', 'error');
      return;
    }

    if (followupEdit.postal_code && !isValidPostalCode(followupEdit.postal_code)) {
      Swal.fire('Validation Error', 'Please enter a valid postal code.', 'error');
      return;
    }

    if (validateContacts() && validateFollowup()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You are not logged in. Please log in again.',
          });
          return;
        }

        const sanitizedLead = {
          ...followupEdit,
          lead_no: sanitizeInput(followupEdit.lead_no),
          lead_date: followupEdit.lead_date,
          customer_name: followupEdit.customer_name,
          phone: followupEdit.phone,
          email: followupEdit.email,
          address: followupEdit.address,
          unit_no: followupEdit.unit_no,
          city: sanitizeInput(followupEdit.city),
          state: sanitizeInput(followupEdit.state),
          country: sanitizeInput(followupEdit.country),
          postal_code: sanitizeInput(followupEdit.postal_code),
          lead_type: followupEdit.lead_type,
          lead_status: followupEdit.lead_status,
          remarks: followupEdit.remarks,
          equipment: sanitizeInput(followupEdit.equipment),
          contact_person: sanitizeInput(followupEdit.contact_person),
          next_follow_up_date: followupEdit.next_follow_up_date,
          notes: followupEdit.notes,
          followup_type: followupEdit.followup_type,
          contacts: followupEdit.contacts.map((contact) => ({
            ...contact,
            name: sanitizeInput(contact.name),
            phone: contact.phone,
            email: contact.email,
          })),
          products: followupEdit.products.map((product) => ({
            ...product,
            name: sanitizeInput(product.name),
            quantity: product.quantity,
          })),
        };

        const response = await axios.put(`${API_URL}/lead-followup/${followupEdit.id}`, sanitizedLead, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Follow-up data has been updated successfully.',
        });

        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error updating follow-up:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update follow-up.',
        });
      }
    }
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateFollowup();
        }}
        className="form-main"
      >
        <EditFuInfo followupEdit={followupEdit} setFolloupEdit={setFolloupEdit} />
        <EditFuAddress followupEdit={followupEdit} setFolloupEdit={setFolloupEdit} />
        <EditFuLeadType followupEdit={followupEdit} setFolloupEdit={setFolloupEdit} />
        <EditFuDetail followupEdit={followupEdit} setFolloupEdit={setFolloupEdit} />
        <EditFuAddInfo followupEdit={followupEdit} setFolloupEdit={setFolloupEdit} />
        <fieldset className="form-section">
          <legend>Contacts</legend>
          {followupEdit.contacts.map((contact, index) => (
            <FuContactForm key={index} index={index} contact={contact} onChange={handleContactChange} onRemove={handleRemoveContact} />
          ))}
          <button type="button" onClick={handleAddContact} className="add-button">
            <PlusOutlined />
          </button>
        </fieldset>

        <fieldset className="form-section">
          <legend>Products</legend>
          {followupEdit.products.map((product, index) => (
            <FuProductForm key={index} index={index} product={product} onChange={handleProductChange} onRemove={handleRemoveProduct} />
          ))}
          <button type="button" onClick={handleAddProduct} className="add-button">
            <PlusOutlined />
          </button>
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
};

export default EditFuForm;
