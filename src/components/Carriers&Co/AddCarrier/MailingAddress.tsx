import { useEffect, useRef, useState } from 'react';
import { Carrier } from '../../../types/CarrierTypes';

// Define component props
interface MailingAddressProps {
  carrier: Carrier;
  setCarrier: React.Dispatch<React.SetStateAction<Carrier>>;
}

const MailingAddress: React.FC<MailingAddressProps> = ({ carrier, setCarrier }) => {
  const addressRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
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
    if (!addressRef.current || !window.google?.maps?.places) return;

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
    const addressComponents = place.address_components as google.maps.GeocoderAddressComponent[];

    // Extract address details
    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim();

    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      mailing_address: mainAddress,
      mailing_city: getComponent('locality', '', addressComponents),
      mailing_state: getComponent('administrative_area_level_1', '', addressComponents),
      mailing_country: getComponent('country', '', addressComponents),
      mailing_postal: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type: string, fallback: string, components: google.maps.GeocoderAddressComponent[]): string => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      sameAsPrimary: checked,
      mailing_address: checked ? '' : prevCarrier.mailing_address,
      mailing_city: checked ? '' : prevCarrier.mailing_city,
      mailing_state: checked ? '' : prevCarrier.mailing_state,
      mailing_country: checked ? '' : prevCarrier.mailing_country,
      mailing_postal: checked ? '' : prevCarrier.mailing_postal,
    }));
  };

  // Validation and sanitization function
  const validateAndSetField = (field: keyof Carrier, value: string) => {
    const sanitizedValue = value.trim();
    let error = '';

    if (!sanitizedValue) {
      error = `${field.replace('_', ' ')} is required.`;
    } else if (field === 'mailing_postal' && !/^\d{5,6}$/.test(sanitizedValue)) {
      error = 'Invalid postal code. It should be 5-6 digits.';
    } else if (field === 'mailing_phone' && !/^\d{10,15}$/.test(sanitizedValue)) {
      error = 'Invalid phone number. It should be 10-15 digits.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));

    if (!error) {
      setCarrier((prevCarrier) => ({
        ...prevCarrier,
        [field]: sanitizedValue,
      }));
    }
  };

  return (
    <fieldset>
      <legend>Mailing Address</legend>

      <div className="form-group">
        <label style={{ display: 'inline-flex', alignItems: 'center', width: '100%' }} htmlFor="mailingAddressSame">
          Same as Primary Address
          <input type="checkbox" id="mailingAddressSame" checked={carrier.sameAsPrimary} onChange={handleCheckboxChange} />
        </label>
      </div>

      {!carrier.sameAsPrimary && (
        <>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressStreet">Street</label>
              <input
                type="text"
                ref={addressRef}
                value={carrier.mailing_address}
                onChange={(e) => validateAndSetField('mailing_address', e.target.value)}
                placeholder="Street"
              />
              {errors.mailing_address && <span className="error-text">{errors.mailing_address}</span>}
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressCity">City</label>
              <input
                type="text"
                value={carrier.mailing_city}
                onChange={(e) => validateAndSetField('mailing_city', e.target.value)}
                placeholder="City"
              />
              {errors.mailing_city && <span className="error-text">{errors.mailing_city}</span>}
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressState">State</label>
              <input
                type="text"
                value={carrier.mailing_state}
                onChange={(e) => validateAndSetField('mailing_state', e.target.value)}
                placeholder="State"
              />
              {errors.mailing_state && <span className="error-text">{errors.mailing_state}</span>}
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressCountry">Country</label>
              <input
                type="text"
                value={carrier.mailing_country}
                onChange={(e) => validateAndSetField('mailing_country', e.target.value)}
                placeholder="Country"
              />
              {errors.mailing_country && <span className="error-text">{errors.mailing_country}</span>}
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressPostalCode">Postal Code</label>
              <input
                type="text"
                value={carrier.mailing_postal}
                onChange={(e) => validateAndSetField('mailing_postal', e.target.value)}
                placeholder="Postal Code"
              />
              {errors.mailing_postal && <span className="error-text">{errors.mailing_postal}</span>}
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressPhone">Phone</label>
              <input
                type="text"
                value={carrier.mailing_phone}
                onChange={(e) => validateAndSetField('mailing_phone', e.target.value)}
                placeholder="Phone"
              />
              {errors.mailing_phone && <span className="error-text">{errors.mailing_phone}</span>}
            </div>
          </div>
        </>
      )}
    </fieldset>
  );
};

export default MailingAddress;
