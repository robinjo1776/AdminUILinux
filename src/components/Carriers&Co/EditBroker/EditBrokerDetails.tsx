import { useEffect, useRef } from 'react';
import { Broker } from '../../../types/BrokerTypes';
import DOMPurify from 'dompurify';

interface EditBrokerDetailsProps {
  formBroker: Broker;
  setFormBroker: React.Dispatch<React.SetStateAction<Broker>>;
}

function EditBrokerDetails({ formBroker, setFormBroker }: EditBrokerDetailsProps) {
  const addressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onerror = () => console.error('Failed to load Google Maps API');
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
    if (!addressRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place || !place.address_components) {
        console.error('No valid address selected');
        return;
      }
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place: google.maps.places.PlaceResult) => {
    if (!place.address_components) {
      console.error('No valid address selected');
      return;
    }

    const addressComponents = place.address_components as google.maps.GeocoderAddressComponent[];

    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim();

    setFormBroker((prevBroker) => ({
      ...prevBroker,
      broker_address: mainAddress,
      broker_city: getComponent('locality', '', addressComponents),
      broker_state: getComponent('administrative_area_level_1', '', addressComponents),
      broker_country: getComponent('country', '', addressComponents),
      broker_postal: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type: string, fallback: string, components: google.maps.GeocoderAddressComponent[]) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  const handleInputChange = (key: keyof Broker, value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormBroker((prev) => ({ ...prev, [key]: sanitizedValue }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\+?[0-9\s\-().]{7,15}$/.test(phone);

  return (
    <fieldset>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="formBrokerName">Name</label>
          <input type="text" value={formBroker.broker_name} onChange={(e) => handleInputChange('broker_name', e.target.value)} />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressStreet">Street</label>
          <input
            type="text"
            ref={addressRef}
            placeholder="Enter your address"
            value={formBroker.broker_address}
            onChange={(e) => handleInputChange('broker_address', e.target.value)}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCity">City</label>
          <input type="text" value={formBroker.broker_city} onChange={(e) => handleInputChange('broker_city', e.target.value)} />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressState">State</label>
          <input type="text" value={formBroker.broker_state} onChange={(e) => handleInputChange('broker_state', e.target.value)} />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCountry">Country</label>
          <input type="text" value={formBroker.broker_country} onChange={(e) => handleInputChange('broker_country', e.target.value)} />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressPostalCode">Postal Code</label>
          <input type="text" value={formBroker.broker_postal} onChange={(e) => handleInputChange('broker_postal', e.target.value)} />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressEmail">Email</label>
          <input
            type="text"
            value={formBroker.broker_email}
            onChange={(e) => (validateEmail(e.target.value) ? handleInputChange('broker_email', e.target.value) : null)}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressPhone">Phone</label>
          <input
            type="text"
            value={formBroker.broker_phone}
            onChange={(e) => (validatePhone(e.target.value) ? handleInputChange('broker_phone', e.target.value) : null)}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressExtension">Phone Extension</label>
          <input type="text" value={formBroker.broker_ext} onChange={(e) => handleInputChange('broker_ext', e.target.value)} />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressFax">Fax</label>
          <input type="text" value={formBroker.broker_fax} onChange={(e) => handleInputChange('broker_fax', e.target.value)} />
        </div>
      </div>
    </fieldset>
  );
}

export default EditBrokerDetails;
