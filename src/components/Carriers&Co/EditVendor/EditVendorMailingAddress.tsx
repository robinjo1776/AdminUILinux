import { useEffect, useRef } from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface EditVendorMailingAddressProps {
  formVendor: Vendor;
  setFormVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

const EditVendorMailingAddress: React.FC<EditVendorMailingAddressProps> = ({ formVendor, setFormVendor }) => {
  const addressRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      if (!document.querySelector('#google-maps-script')) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (window.google && window.google.maps) {
            initializeAutocomplete();
          }
        };
        document.head.appendChild(script);
      }
    };

    loadGoogleMapsApi();
  }, []);

  const initializeAutocomplete = () => {
    if (!addressRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, { types: ['address'] });
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
    const mainAddress = `${streetNumber} ${route}`.trim();

    setFormVendor((prevVendor) => ({
      ...prevVendor,
      mailing_address: sanitizeInput(mainAddress),
      mailing_city: sanitizeInput(getComponent('locality', '', addressComponents)),
      mailing_state: sanitizeInput(getComponent('administrative_area_level_1', '', addressComponents)),
      mailing_country: sanitizeInput(getComponent('country', '', addressComponents)),
      mailing_postal: sanitizeInput(getComponent('postal_code', '', addressComponents)),
    }));
  };

  const getComponent = (type: string, fallback: string, components: google.maps.GeocoderAddressComponent[]) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  const sanitizeInput = (input: string) => input.replace(/[<>"'&]/g, '');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormVendor((prevVendor) => ({
      ...prevVendor,
      sameAsPrimary: checked,
      mailing_address: checked ? '' : prevVendor.mailing_address,
      mailing_city: checked ? '' : prevVendor.mailing_city,
      mailing_state: checked ? '' : prevVendor.mailing_state,
      mailing_country: checked ? '' : prevVendor.mailing_country,
      mailing_postal: checked ? '' : prevVendor.mailing_postal,
    }));
  };

  return (
    <fieldset>
      <legend>Mailing Address</legend>
      <div className="form-group">
        <label htmlFor="mailingAddressSame">
          Same as Primary Address
          <input type="checkbox" id="mailingAddressSame" checked={formVendor.sameAsPrimary} onChange={handleCheckboxChange} />
        </label>
      </div>

      {!formVendor.sameAsPrimary && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mailingAddressStreet">Street</label>
              <input
                type="text"
                ref={addressRef}
                value={formVendor.mailing_address}
                onChange={(e) => setFormVendor((prev) => ({ ...prev, mailing_address: sanitizeInput(e.target.value) }))}
                placeholder="Enter your address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mailingAddressCity">City</label>
              <input
                type="text"
                value={formVendor.mailing_city}
                onChange={(e) => setFormVendor((prev) => ({ ...prev, mailing_city: sanitizeInput(e.target.value) }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mailingAddressState">State</label>
              <input
                type="text"
                value={formVendor.mailing_state}
                onChange={(e) => setFormVendor((prev) => ({ ...prev, mailing_state: sanitizeInput(e.target.value) }))}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mailingAddressCountry">Country</label>
              <input
                type="text"
                value={formVendor.mailing_country}
                onChange={(e) => setFormVendor((prev) => ({ ...prev, mailing_country: sanitizeInput(e.target.value) }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mailingAddressPostalCode">Postal Code</label>
              <input
                type="text"
                value={formVendor.mailing_postal}
                onChange={(e) => setFormVendor((prev) => ({ ...prev, mailing_postal: sanitizeInput(e.target.value) }))}
              />
            </div>
          </div>
        </>
      )}
    </fieldset>
  );
};

export default EditVendorMailingAddress;
