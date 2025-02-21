import { useEffect, useRef } from 'react';
import { Carrier } from '../../../types/CarrierTypes';

interface EditMailingAddressProps {
  formCarrier: Carrier;
  setFormCarrier: React.Dispatch<React.SetStateAction<Carrier>>;
}

function EditMailingAddress({ formCarrier, setFormCarrier }: EditMailingAddressProps) {
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

    // Extract the main address (street_number + route)
    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim();

    setFormCarrier((prevCarrier) => ({
      ...prevCarrier,
      mailing_address: sanitizeInput(mainAddress),
      mailing_city: sanitizeInput(getComponent('locality', '', addressComponents)),
      mailing_state: sanitizeInput(getComponent('administrative_area_level_1', '', addressComponents)),
      mailing_country: sanitizeInput(getComponent('country', '', addressComponents)),
      mailing_postal: sanitizePostalCode(getComponent('postal_code', '', addressComponents)),
    }));
  };

  const getComponent = (type: string, fallback: string, components: google.maps.GeocoderAddressComponent[]): string => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  const sanitizeInput = (input: string): string => {
    return input.replace(/[<>/"'`]/g, '').trim();
  };

  const sanitizePostalCode = (input: string): string => {
    return input.replace(/[^a-zA-Z0-9\s-]/g, '').trim();
  };

  const sanitizePhoneNumber = (input: string): string => {
    return input.replace(/[^0-9+]/g, '').trim();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = e.target;
    setFormCarrier((prevCarrier) => ({
      ...prevCarrier,
      sameAsPrimary: checked,
      mailing_address: checked ? '' : prevCarrier.mailing_address,
      mailing_city: checked ? '' : prevCarrier.mailing_city,
      mailing_state: checked ? '' : prevCarrier.mailing_state,
      mailing_country: checked ? '' : prevCarrier.mailing_country,
      mailing_postal: checked ? '' : prevCarrier.mailing_postal,
      mailing_phone: checked ? '' : prevCarrier.mailing_phone,
    }));
  };

  return (
    <fieldset>
      <legend>Mailing Address</legend>

      <div className="form-group">
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            width: '100%',
          }}
          htmlFor="mailingAddressSame"
        >
          Same as Primary Address
          <input type="checkbox" id="mailingAddressSame" checked={formCarrier.sameAsPrimary} onChange={handleCheckboxChange} />
        </label>
      </div>

      {!formCarrier.sameAsPrimary && (
        <>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressStreet">Street</label>
              <input
                type="text"
                ref={addressRef}
                value={formCarrier.mailing_address || ''}
                onChange={(e) => setFormCarrier({ ...formCarrier, mailing_address: sanitizeInput(e.target.value) })}
                placeholder="Enter your address"
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressCity">City</label>
              <input
                type="text"
                value={formCarrier.mailing_city || ''}
                onChange={(e) => setFormCarrier({ ...formCarrier, mailing_city: sanitizeInput(e.target.value) })}
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressState">State</label>
              <input
                type="text"
                value={formCarrier.mailing_state || ''}
                onChange={(e) => setFormCarrier({ ...formCarrier, mailing_state: sanitizeInput(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressCountry">Country</label>
              <input
                type="text"
                value={formCarrier.mailing_country || ''}
                onChange={(e) => setFormCarrier({ ...formCarrier, mailing_country: sanitizeInput(e.target.value) })}
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressPostalCode">Postal Code</label>
              <input
                type="text"
                value={formCarrier.mailing_postal || ''}
                onChange={(e) => setFormCarrier({ ...formCarrier, mailing_postal: sanitizePostalCode(e.target.value) })}
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressUnitNo">Phone</label>
              <input
                type="text"
                value={formCarrier.mailing_phone || ''}
                onChange={(e) => setFormCarrier({ ...formCarrier, mailing_phone: sanitizePhoneNumber(e.target.value) })}
              />
            </div>
          </div>
        </>
      )}
    </fieldset>
  );
}

export default EditMailingAddress;
