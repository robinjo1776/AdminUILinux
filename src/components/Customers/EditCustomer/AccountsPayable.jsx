import { useEffect, useRef } from 'react';

function AccountsPayable({ formCustomer, setformCustomer }) {
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
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_ap_address: mainAddress, // Only store the main address in the state
      cust_ap_city: getComponent('locality', '', addressComponents),
      cust_ap_state: getComponent('administrative_area_level_1', '', addressComponents),
      cust_ap_country: getComponent('country', '', addressComponents),
      cust_ap_postal: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };
  return (
    <fieldset>
      <legend>Accounts Payable</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accountsPayableName">Name</label>
          <input
            type="text"
            id="accountsPayableName"
            value={formCustomer.cust_ap_name}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_name: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            ref={addressRef}
            value={formCustomer.cust_ap_address}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_address: e.target.value,
              })
            }
            placeholder="Enter your address"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={formCustomer.cust_ap_city}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_city: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={formCustomer.cust_ap_state}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_state: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={formCustomer.cust_ap_country}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_country: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            value={formCustomer.cust_ap_postal}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_postal: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="unitNo">Unit No</label>
          <input
            type="text"
            id="unitNo"
            value={formCustomer.cust_ap_unit_no}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_unit_no: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formCustomer.cust_ap_email}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_email: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={formCustomer.cust_ap_phone}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_phone: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="phoneExt">Phone Ext</label>
          <input
            type="text"
            id="phoneExt"
            value={formCustomer.cust_ap_phone_ext}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_phone_ext: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="fax">Fax</label>
          <input
            type="text"
            id="fax"
            value={formCustomer.cust_ap_fax}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_ap_fax: e.target.value,
              })
            }
          />
        </div>
      </div>
    </fieldset>
  );
}

export default AccountsPayable;
