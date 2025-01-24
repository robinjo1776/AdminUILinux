import { useEffect, useRef } from 'react';

function EditMailingAddress({ formCarrier, setformCarrier }) {
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
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
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
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
      sameAsPrimary: checked, // Update the sameAsPrimary state
      // Optionally clear mailing address fields when checked
      mailing_address: checked ? '' : prevCarrier.mailing_address,
      mailing_city: checked ? '' : prevCarrier.mailing_city,
      mailing_state: checked ? '' : prevCarrier.mailing_state,
      mailing_country: checked ? '' : prevCarrier.mailing_country,
      mailing_postal: checked ? '' : prevCarrier.mailing_postal,
      mailing_unit_no: checked ? '' : prevCarrier.mailing_unit_no,
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
            checked={formCarrier.sameAsPrimary}
            onChange={handleCheckboxChange} // Handle checkbox change
          />
        </label>
      </div>

      {/* Only show the mailing address form if sameAsPrimary is false */}
      {!formCarrier.sameAsPrimary && (
        <>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressStreet">Street</label>
              <input
                type="text"
                ref={addressRef}
                value={formCarrier.mailing_address}
                onChange={(e) =>
                  setformCarrier({
                    ...formCarrier,
                    mailing_address: e.target.value,
                  })
                }
                placeholder="Enter your address"
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressCity">City</label>
              <input
                type="text"
                value={formCarrier.mailing_city}
                onChange={(e) =>
                  setformCarrier({
                    ...formCarrier,
                    mailing_city: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressState">State</label>
              <input
                type="text"
                value={formCarrier.mailing_state}
                onChange={(e) =>
                  setformCarrier({
                    ...formCarrier,
                    mailing_state: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressCountry">Country</label>
              <input
                type="text"
                value={formCarrier.mailing_country}
                onChange={(e) =>
                  setformCarrier({
                    ...formCarrier,
                    mailing_country: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressPostalCode">Postal Code</label>
              <input
                type="text"
                value={formCarrier.mailing_postal}
                onChange={(e) =>
                  setformCarrier({
                    ...formCarrier,
                    mailing_postal: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="mailingAddressUnitNo">Phone</label>
              <input
                type="text"
                value={formCarrier.mailing_phone}
                onChange={(e) =>
                  setformCarrier({
                    ...formCarrier,
                    mailing_phone: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </>
      )}
    </fieldset>
  );
}

export default EditMailingAddress;
