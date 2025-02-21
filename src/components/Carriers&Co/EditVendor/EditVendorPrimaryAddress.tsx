import { useEffect, useRef } from 'react';
import { Vendor } from '../../../types/VendorTypes';

type EditVendorPrimaryAddressProps = {
  formVendor: Vendor;
  setFormVendor: React.Dispatch<React.SetStateAction<Vendor>>;
};

// Utility function to sanitize inputs
const sanitizeInput = (value: string) => {
  return value.replace(/[^a-zA-Z0-9\s,.-]/g, ''); // Removes special characters
};

// Validate email format
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Validate postal codes (alphanumeric, length between 3-10)
const isValidPostalCode = (postal: string) => {
  return /^[a-zA-Z0-9\s-]{3,10}$/.test(postal);
};

// Validate phone/fax (digits, dashes, spaces, parentheses)
const isValidPhoneNumber = (phone: string) => {
  return /^[0-9\s()-]+$/.test(phone);
};

function EditVendorPrimaryAddress({ formVendor, setFormVendor }: EditVendorPrimaryAddressProps) {
  const addressRef = useRef<HTMLInputElement | null>(null);

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
    const addressComponents = place.address_components || [];

    const getComponent = (type: string, fallback: string) => {
      const component = addressComponents.find((c) => c.types.includes(type));
      return sanitizeInput(component ? component.long_name : fallback);
    };

    const streetNumber = getComponent('street_number', '');
    const route = getComponent('route', '');
    const mainAddress = `${streetNumber} ${route}`.trim();

    setFormVendor((prevVendor) => ({
      ...prevVendor,
      primary_address: mainAddress,
      primary_city: getComponent('locality', ''),
      primary_state: getComponent('administrative_area_level_1', ''),
      primary_country: getComponent('country', ''),
      primary_postal: getComponent('postal_code', ''),
    }));
  };

  return (
    <fieldset>
      <legend>Primary Address</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressStreet">Street</label>
          <input
            type="text"
            ref={addressRef}
            placeholder="Enter your address"
            value={formVendor.primary_address}
            onChange={(e) => setFormVendor({ ...formVendor, primary_address: sanitizeInput(e.target.value) })}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCity">City</label>
          <input
            type="text"
            value={formVendor.primary_city}
            onChange={(e) => setFormVendor({ ...formVendor, primary_city: sanitizeInput(e.target.value) })}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressState">State</label>
          <input
            type="text"
            value={formVendor.primary_state}
            onChange={(e) => setFormVendor({ ...formVendor, primary_state: sanitizeInput(e.target.value) })}
          />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCountry">Country</label>
          <input
            type="text"
            value={formVendor.primary_country}
            onChange={(e) => setFormVendor({ ...formVendor, primary_country: sanitizeInput(e.target.value) })}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressPostalCode">Postal Code</label>
          <input
            type="text"
            value={formVendor.primary_postal}
            onChange={(e) => {
              const sanitizedValue = sanitizeInput(e.target.value);
              if (isValidPostalCode(sanitizedValue)) {
                setFormVendor({ ...formVendor, primary_postal: sanitizedValue });
              }
            }}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressEmail">Email</label>
          <input
            type="email"
            value={formVendor.primary_email}
            onChange={(e) => {
              const sanitizedEmail = sanitizeInput(e.target.value);
              if (isValidEmail(sanitizedEmail)) {
                setFormVendor({ ...formVendor, primary_email: sanitizedEmail });
              }
            }}
          />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressPhone">Phone</label>
          <input
            type="text"
            value={formVendor.primary_phone}
            onChange={(e) => {
              const sanitizedPhone = sanitizeInput(e.target.value);
              if (isValidPhoneNumber(sanitizedPhone)) {
                setFormVendor({ ...formVendor, primary_phone: sanitizedPhone });
              }
            }}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressFax">Fax</label>
          <input
            type="text"
            value={formVendor.primary_fax}
            onChange={(e) => {
              const sanitizedFax = sanitizeInput(e.target.value);
              if (isValidPhoneNumber(sanitizedFax)) {
                setFormVendor({ ...formVendor, primary_fax: sanitizedFax });
              }
            }}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditVendorPrimaryAddress;
