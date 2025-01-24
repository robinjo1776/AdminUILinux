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

  const validateFollowup = () => {
    return followupEdit.lead_no && followupEdit.lead_date && followupEdit.lead_status;
  };

  const updateFollowup = async () => {
    if (validateFollowup()) {
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

        // Log the followupEdit payload to check if it's in the correct format
        console.log('Payload to be sent:', followupEdit);

        const response = await axios.put(`${API_URL}/lead-followup/${followupEdit.id}`, followupEdit, {
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

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    setFolloupEdit((prev) => {
      const updatedContacts = [...prev.contacts];
      updatedContacts[index] = { ...updatedContacts[index], [name]: value };
      return { ...prev, contacts: updatedContacts };
    });
  };

  const handleRemoveContact = (index) => {
    setFolloupEdit((prev) => {
      const updatedContacts = prev.contacts.filter((_, i) => i !== index);
      return { ...prev, contacts: updatedContacts };
    });
  };

  const handleAddContact = () => {
    setFolloupEdit((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { name: '', phone: '', email: '' }],
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    setFolloupEdit((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts[index] = { ...updatedProducts[index], [name]: value };
      return { ...prev, products: updatedProducts };
    });
  };

  const handleRemoveProduct = (index) => {
    setFolloupEdit((prev) => {
      const updatedProducts = prev.products.filter((_, i) => i !== index);
      return { ...prev, products: updatedProducts };
    });
  };

  const handleAddProduct = () => {
    setFolloupEdit((prev) => ({
      ...prev,
      products: [...prev.products, { name: '', quantity: '' }],
    }));
  };

  const addressRef = useRef(null);

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
        <fieldset className="form-section">
          <legend>Products</legend>
          <div className="form-row">
            {followupEdit.products.map((product, index) => (
              <FuProductForm
                key={index}
                product={product}
                index={index}
                handleProductChange={handleProductChange}
                handleRemoveProduct={handleRemoveProduct}
              />
            ))}
            <button type="button" onClick={handleAddProduct} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {followupEdit.contacts.map((contact, index) => (
              <FuContactForm
                key={index}
                contact={contact}
                index={index}
                handleContactChange={handleContactChange}
                handleRemoveContact={handleRemoveContact}
              />
            ))}
            <button type="button" onClick={handleAddContact} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <EditFuAddInfo followupEdit={followupEdit} setFolloupEdit={setFolloupEdit} />
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
