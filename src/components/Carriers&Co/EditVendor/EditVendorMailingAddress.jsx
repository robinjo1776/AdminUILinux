import { useEffect, useRef } from 'react';

function EditVendorMailingAddress({ formVendor, setFormVendor }) {
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
      if (!place || !place.address_components) {
        console.error('No valid address selected');
        return;
      }
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;

    // Extract the main address (street_number + route)
    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim(); // Combine street number and route

    // Update the form customer state with the relevant values
    setFormVendor((prevVendor) => ({
      ...prevVendor,
      mailing_address: mainAddress, // Only store the main address in the state
      mailing_city: getComponent('locality', '', addressComponents),
      mailing_state: getComponent('administrative_area_level_1', '', addressComponents),
      mailing_country: getComponent('country', '', addressComponents),
      mailing_postal: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormVendor((prevVendor) => ({
      ...prevVendor,
      sameAsPrimary: checked, // Update the sameAsPrimary state
      // Optionally clear mailing address fields when checked
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
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            width: '100%',
          }}
          htmlFor="mailingAddressSame"
        >
          Same as Primary Address
          <input
            type="checkbox"
            id="mailingAddressSame"
            checked={formVendor.sameAsPrimary}
            onChange={handleCheckboxChange} // Handle checkbox change
          />
        </label>
      </div>

      {/* Only show the mailing address form if sameAsPrimary is false */}
      {!formVendor.sameAsPrimary && (
        <>
          <div className="form-group">
            <label htmlFor="mailingAddressStreet">Street</label>
            <input
              type="text"
              ref={addressRef}
              value={formVendor.mailing_address}
              onChange={(e) =>
                setFormVendor({
                  ...formVendor,
                  mailing_address: e.target.value,
                })
              }
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressCity">City</label>
            <input
              type="text"
              value={formVendor.mailing_city}
              onChange={(e) =>
                setFormVendor({
                  ...formVendor,
                  mailing_city: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressState">State</label>
            <input
              type="text"
              value={formVendor.mailing_state}
              onChange={(e) =>
                setFormVendor({
                  ...formVendor,
                  mailing_state: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressCountry">Country</label>
            <input
              type="text"
              value={formVendor.mailing_country}
              onChange={(e) =>
                setFormVendor({
                  ...formVendor,
                  mailing_country: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressPostalCode">Postal Code</label>
            <input
              type="text"
              value={formVendor.mailing_postal}
              onChange={(e) =>
                setFormVendor({
                  ...formVendor,
                  mailing_postal: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressUnitNo">Phone</label>
            <input
              type="text"
              value={formVendor.mailing_phone}
              onChange={(e) =>
                setFormVendor({
                  ...formVendor,
                  mailing_phone: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressUnitNo">Fax</label>
            <input
              type="text"
              value={formVendor.mailing_fax}
              onChange={(e) =>
                setFormVendor({
                  ...formVendor,
                  mailing_fax: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressUnitNo">Email</label>
            <input
              type="text"
              value={formVendor.mailing_email}
              onChange={(e) =>
                setFormVendor({
                  ...formVendor,
                  mailing_email: e.target.value,
                })
              }
            />
          </div>
        </>
      )}
    </fieldset>
  );
}

export default EditVendorMailingAddress;
