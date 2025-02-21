import { useEffect, useRef } from 'react';
import { Carrier } from '../../../types/CarrierTypes';

interface PrimaryAddressProps {
  carrier: Carrier;
  setCarrier: React.Dispatch<React.SetStateAction<Carrier>>;
}

const PrimaryAddress: React.FC<PrimaryAddressProps> = ({ carrier, setCarrier }) => {
  const addressRef = useRef<HTMLInputElement | null>(null);

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

    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = sanitizeInput(`${streetNumber} ${route}`.trim());

    setCarrier((prevCarrier) => ({
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

  const sanitizeInput = (input: string): string => {
    return input.replace(/[^a-zA-Z0-9 ,.-]/g, '').trim();
  };

  const handleInputChange = (field: keyof Carrier, value: string) => {
    setCarrier({
      ...carrier,
      [field]: sanitizeInput(value),
    });
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
            value={carrier.primary_address}
            onChange={(e) => handleInputChange('primary_address', e.target.value)}
            placeholder="Street"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCity">City</label>
          <input type="text" value={carrier.primary_city} onChange={(e) => handleInputChange('primary_city', e.target.value)} placeholder="City" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressState">State</label>
          <input type="text" value={carrier.primary_state} onChange={(e) => handleInputChange('primary_state', e.target.value)} placeholder="State" />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCountry">Country</label>
          <input
            type="text"
            value={carrier.primary_country}
            onChange={(e) => handleInputChange('primary_country', e.target.value)}
            placeholder="Country"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressPostalCode">Postal Code</label>
          <input
            type="text"
            value={carrier.primary_postal}
            onChange={(e) => handleInputChange('primary_postal', e.target.value)}
            placeholder="Postal Code"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressUnitNo">Phone</label>
          <input type="text" value={carrier.primary_phone} onChange={(e) => handleInputChange('primary_phone', e.target.value)} placeholder="Phone" />
        </div>
      </div>
    </fieldset>
  );
};

export default PrimaryAddress;
