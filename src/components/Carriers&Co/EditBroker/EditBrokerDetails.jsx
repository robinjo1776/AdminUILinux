import { useEffect, useRef } from 'react';

function EditBrokerDetails({ formBroker, setFormBroker }) {
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
    setFormBroker((prevBroker) => ({
      ...prevBroker,
      broker_address: mainAddress, // Only store the main address in the state
      broker_city: getComponent('locality', '', addressComponents),
      broker_state: getComponent('administrative_area_level_1', '', addressComponents),
      broker_country: getComponent('country', '', addressComponents),
      broker_postal: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  return (
    <fieldset>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="formBrokerName">Name</label>
          <input
            type="text"
            value={formBroker.broker_name}
            onChange={(e) =>
              setFormBroker({
                ...formBroker,
                broker_name: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressStreet">Street</label>
          <input
            type="text"
            ref={addressRef}
            placeholder="Enter your address"
            value={formBroker.broker_address}
            onChange={(e) =>
              setFormBroker({
                ...formBroker,
                broker_address: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCity">City</label>
          <input
            type="text"
            value={formBroker.broker_city}
            onChange={(e) =>
              setFormBroker({
                ...formBroker,
                broker_city: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressState">State</label>
          <input
            type="text"
            value={formBroker.broker_state}
            onChange={(e) =>
              setFormBroker({
                ...formBroker,
                broker_state: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCountry">Country</label>
          <input
            type="text"
            value={formBroker.broker_country}
            onChange={(e) =>
              setFormBroker({
                ...formBroker,
                broker_country: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressPostalCode">Postal Code</label>
          <input
            type="text"
            value={formBroker.broker_postal}
            onChange={(e) =>
              setFormBroker({
                ...formBroker,
                broker_postal: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressUnitNo">Email</label>
          <input
            type="text"
            value={formBroker.broker_email}
            onChange={(e) =>
              setFormBroker({
                ...formBroker,
                broker_email: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressUnitNo">Phone</label>
          <input
            type="text"
            value={formBroker.broker_phone}
            onChange={(e) =>
              setFormBroker({
                ...formBroker,
                broker_phone: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressUnitNo">Phone Extension</label>
          <input
            type="text"
            value={formBroker.broker_ext}
            onChange={(e) =>
              setFormBroker({
                ...formBroker,
                broker_ext: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressUnitNo">Fax</label>
          <input
            type="text"
            value={formBroker.broker_fax}
            onChange={(e) =>
              setFormBroker({
                ...formBroker,
                broker_fax: e.target.value,
              })
            }
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditBrokerDetails;
