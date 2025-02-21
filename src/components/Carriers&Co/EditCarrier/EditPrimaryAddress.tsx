import { useEffect, useRef } from 'react';
import { Carrier } from '../../../types/CarrierTypes';

interface EditPrimaryAddressProps {
  formCarrier: Carrier;
  setFormCarrier: React.Dispatch<React.SetStateAction<Carrier>>;
}

function EditPrimaryAddress({ formCarrier, setFormCarrier }: EditPrimaryAddressProps) {
  const addressRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google?.maps) {
        initializeAutocomplete();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google?.maps) {
          initializeAutocomplete();
        }
      };
      script.onerror = () => console.error('Failed to load Google Maps API');
      document.head.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  const initializeAutocomplete = (): void => {
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

  const updateAddressFields = (place: google.maps.places.PlaceResult): void => {
    const addressComponents = place.address_components ?? [];
    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = sanitizeInput(`${streetNumber} ${route}`.trim());

    setFormCarrier((prevCarrier) => ({
      ...prevCarrier,
      primary_address: mainAddress,
      primary_city: sanitizeInput(getComponent('locality', '', addressComponents)),
      primary_state: sanitizeInput(getComponent('administrative_area_level_1', '', addressComponents)),
      primary_country: sanitizeInput(getComponent('country', '', addressComponents)),
      primary_postal: sanitizeInput(getComponent('postal_code', '', addressComponents)),
    }));
  };

  const getComponent = (type: string, fallback: string, components: google.maps.GeocoderAddressComponent[]): string => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  // Sanitization function to prevent XSS attacks
  const sanitizeInput = (value: string): string => {
    return value.replace(/[^a-zA-Z0-9\s,-]/g, ''); // Remove special characters except space, comma, and hyphen
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
            value={formCarrier.primary_address}
            onChange={(e) =>
              setFormCarrier({
                ...formCarrier,
                primary_address: sanitizeInput(e.target.value),
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCity">City</label>
          <input
            type="text"
            value={formCarrier.primary_city}
            onChange={(e) =>
              setFormCarrier({
                ...formCarrier,
                primary_city: sanitizeInput(e.target.value),
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressState">State</label>
          <input
            type="text"
            value={formCarrier.primary_state}
            onChange={(e) =>
              setFormCarrier({
                ...formCarrier,
                primary_state: sanitizeInput(e.target.value),
              })
            }
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCountry">Country</label>
          <input
            type="text"
            value={formCarrier.primary_country}
            onChange={(e) =>
              setFormCarrier({
                ...formCarrier,
                primary_country: sanitizeInput(e.target.value),
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressPostalCode">Postal Code</label>
          <input
            type="text"
            value={formCarrier.primary_postal}
            onChange={(e) =>
              setFormCarrier({
                ...formCarrier,
                primary_postal: sanitizeInput(e.target.value),
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressPhone">Phone</label>
          <input
            type="text"
            value={formCarrier.primary_phone}
            onChange={(e) =>
              setFormCarrier({
                ...formCarrier,
                primary_phone: sanitizeInput(e.target.value),
              })
            }
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditPrimaryAddress;
